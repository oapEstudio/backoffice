import { useContext, useEffect, useState } from "react";
import { DependencyContext } from "../../../contexts/DependencyContext";
import type { IFilter } from "../../../../domain/entities/IFilter";


interface IUseHelpDeskFilterOptionsProps {
  stateFilters?: Record<string, any>
}
export function useHelpDeskFilterOptions(filters?: IUseHelpDeskFilterOptionsProps) {


  const { getHelpDeskTypes } = useContext(DependencyContext);

  const { getHelpDeskTStatuses } = useContext(DependencyContext);

  const [resultState, setResultState] = useState<IFilter[]>([]);
  const [resultType, setResultType] = useState<IFilter[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null)

  // TODO Limpiar mocks
  const MOCK_TYPE_HELP_DESK: IFilter[] = [
    {
      id: 'article',
      description: 'Artículo',
      meta: { category: 'contenido', editable: true }
    },
    {
      id: 'instruction',
      description: 'Documento',
      meta: { category: 'guía', editable: false }
    },
    {
      id: 'instruction',
      description: 'Sección',
      meta: { category: 'guía', editable: false }
    }
  ];

  const MOCK_STATUS_HELP_DESK: IFilter[] = [
    {
      id: 'active',
      description: 'Activo',
      meta: { color: 'success', visible: true }
    },
    {
      id: 'inactive',
      description: 'Inactivo',
      meta: { color: 'secondary', visible: true }
    },
    {
      id: 'new',
      description: 'Nuevo',
      meta: { color: 'info', visible: true }
    },
    {
      id: 'hidden',
      description: 'Invisible',
      meta: { color: 'muted', visible: false }
    }
  ];

  useEffect(() => {
    setLoading(true);
    /* TODO REMOVER COMENTARIO E IMPLENTAR LLAMADO DEL BACKEND [getHelpDeskTStatuses.execute(filters?.stateFilters? {filters: filters.stateFilters}: undefined),getHelpDeskTStatuses.execute({filters: {forUpdate: true}})])*/
    Promise.all([MOCK_STATUS_HELP_DESK, MOCK_TYPE_HELP_DESK])
      .then(([statuses, types]) => {
        setResultState(statuses);
        setResultType(types);
      })
      .catch(err => setError(err instanceof Error ? err : new Error(String(err))))
      .finally(() => setLoading(false));
  }, [getHelpDeskTStatuses]);

  return { resultState, resultType, loading, error };
}