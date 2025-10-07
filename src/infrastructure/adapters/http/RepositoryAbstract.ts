import type { IPageParameters } from "../../../application/common/IPaginatedResponse";

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
}