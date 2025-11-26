import type { IPageParameters } from "../../../application/common/IPaginatedResponse";
import type { IStorageRepository } from "../../../application/interfaces/IStorageRepository";
import type { IStorageSas, StorageTemplate } from "../../../domain/entities/IStorageSas";

export abstract class RepositoryAbstract{

    protected toQueryStringPagination(params: Record<string, any>): string {
        return Object.entries(params)
          .flatMap(([key, val]) =>
            Array.isArray(val)
              ? val.map(v => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
              : `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
          )
          .join("&");
    }
    protected paramsMap(params: IPageParameters): Record<string, any> {
    
        const mapped: Record<string, any> = {
        sortBy: params.sortBy??'',
        page: params.page,
        pageSize: params.pageSize,
        sortDescending: params.sortDescending,
        };

        if (params.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {        
            mapped[key] = value;
        });
        }

        return mapped;
    }

    protected resolveURL(url: string, version: string){
      return `${version}/${url}`;
    }

    protected appendFormDataIfDefined(form: FormData, key: string, value: unknown) {
      if (value === undefined || value === null) return;

      if (value instanceof File) {
        form.append(key, value, value.name);
      } else {
        form.append(key, String(value));
      }
    }

    // ----------  Para storate ----------

  /* Un nombre seguro para carpetas/nombres */
  protected slug(s: string, maxLen = 64): string {
    return (s ?? "")
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, maxLen);
  }

  /** Obtenemos la extension desde nombre o mime */
  protected getExt(nameOrMime: string, fallback = "bin"): string {
    if (!nameOrMime) return fallback;
    // si viene nombre con punto
    const m = /\.([a-z0-9]+)$/i.exec(nameOrMime);
    if (m?.[1]) return m[1].toLowerCase();

    // si vino un mime
    const mm = /^(?:[^/]+)\/([a-z0-9.+-]+)$/i.exec(nameOrMime);
    if (mm?.[1]) return mm[1].toLowerCase().replace(/[^a-z0-9]+/g, "");
    return fallback;
  }

  /* Construye path final a partir del template ({folder}/{filename}") */
  protected resolvePathFromTemplate(pathTemplate: string, folder: string, filename: string): string {
    return pathTemplate
      .replace("{name}", this.slug(folder))
      .replace("{filename}", filename);
  }

  /** Url del file con SAS */
  protected buildBlobUrlWithSas(containerPath: string, resolvedPath: string, sasToken: string): string {
    const base = containerPath.replace(/\/+$/, "");
    const rel = resolvedPath.replace(/^\/+/, "");
    return `${base}/${encodeURI(rel)}?${sasToken}`;
  }

  /** PUT a blob con SAS */
  protected async putBlobWithSas(
    url: string,
    file: File,
    retryOnUnauthorized: boolean,
    refresh: () => Promise<IStorageSas>
  ): Promise<void> {

    
    const doPut = async (u: string) => {
      return fetch(u, {
        method: "PUT",
        headers: {
          "x-ms-blob-type": "BlockBlob",
          "Content-Type": file.type || "application/octet-stream",
        },
        body: file,
      });
    };

    let res = await doPut(url);
    if ((res.status === 401 || res.status === 403) && retryOnUnauthorized) {
      const sas = await refresh();
      const refreshedUrl = this.buildBlobUrlWithSas(sas.sas.containerPath, sas.pathTemplate, sas.sas.sasToken);
      res = await doPut(refreshedUrl);
    }

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`Storage PUT failed (${res.status}): ${txt}`);
    }
  }

  /**
   * Sube un File a storage usando SAS y devuelve el path resuelto (string).   
   */
  protected async uploadFileToStorage(
    file: File,
    storageRepo: IStorageRepository,
    template: StorageTemplate,
    folder: string,
    preferredName?: string,
  ): Promise<string> {
  
    
    let sas = await storageRepo.getStorageSas(template);

    const baseName = (preferredName || file.name || `file.${this.getExt(file.type)}`).replace(/\.[^.]+$/, "");
    const ext = this.getExt(file.name || file.type || "", "bin");
    const safeBase = this.slug(baseName) || `file-${Date.now()}`;
    const filename = `${safeBase}.${ext}`;

    // path resuelto
    const resolvedPath = this.resolvePathFromTemplate(sas.pathTemplate, folder, filename);
    const url = this.buildBlobUrlWithSas(sas.sas.containerPath, resolvedPath, sas.sas.sasToken);

    // reintento de put
    await this.putBlobWithSas(
      url,
      file,
      true,
      async () => storageRepo.getStorageSas(template, true)
    );

    return resolvedPath;
  }

 

}