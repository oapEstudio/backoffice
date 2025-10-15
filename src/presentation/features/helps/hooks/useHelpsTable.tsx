import { useCallback, useMemo, useState } from 'react';
import type { IAction } from '../../../components/ui/table/table-actions/actions.interface';
import type { IRow } from '../../../components/ui/table/table.interface';
import type { IHelp} from '../../../../domain/entities/IHelp';
import { useGetHelps } from './useGetHelps';
import { INITIAL_PARAMS_TABLE } from '../../shared/constants/initialsParamTable';
import Button from '../../../components/ui/button/button.component';
import TableFilterBar from '../../../components/widgets/table-filter-bar/TableFilterBar';
import { toHelpsRow, type IHelpRow } from '../mappers/helpMapper';
import type { IFilterHelpsResult } from '../pages/components/filter-help-page/FilterHelpsPage';
import { SelectCreateHelp } from '../pages/components/select-create-help-desk/SelectHelpDesk';

export const useHelpTable = () => {
  const { setParams, params, result, loading } = useGetHelps(INITIAL_PARAMS_TABLE);
  const [openFilter, setOpenFilter] = useState(false);
  const [editHelpId, setEditHelpId] = useState<string>('');

  // Computed values
  const hasFilters = useMemo(
    () => params.filters !== undefined && Object.keys(params.filters).length > 0,
    [params.filters]
  );

  const currentFilters: IFilterHelpsResult = {
    profileIds: (params.filters?.ProfileIds as string[]) ?? [],
    status: (params.filters?.StatusIds as string[]) ?? [],
    helpType: (params.filters?.TypeIds as string[]) ?? [],
  }

  const count = result?.count ?? 0;

  // Callbacks
  const openEdit = useCallback((help: any & { id: string }) => {
    // TODO: Implement edit logic here
    setEditHelpId(help.id);
  }, []);

  const setFilters = useCallback(
    (f: IFilterHelpsResult) => {
      setParams(p => ({
        ...p,
        filters: { ProfileIds: (f.profileIds ?? []).map(id => String(id).toLowerCase()), StatusIds: f.status, TypeIds: f.helpType },
        page: 1,
      }))
    },
    [setParams]
  );

  const clearFilters = useCallback(() => {
    setParams(p => ({
      ...p,
      filters: undefined,
      page: 1,
    }));
  }, [setParams]);

  const callbackProfiles = useCallback((n: IHelp) => {
    // TODO: Implement profile callback logic
  }, []);

  const toggleFilter = useCallback(() => {
    setOpenFilter(prev => !prev);
  }, []);

  // Table rows
  const rows: IHelpRow[] = useMemo(
    () => (result?.data ?? []).map(p => toHelpsRow(p, callbackProfiles)),
    [result?.data, callbackProfiles]
  );

  // Table actions
  const actions: IAction[] = useMemo(
    () => [
      {
        icon: <><div><Button variant="secondary" title="Editar" /></div></>,
        onClick: (row: IRow) => {
          const help = row as unknown as IHelp;
          setEditHelpId(help.id);
        },
      }
    ],
    []
  );

  const filterButtons = useMemo(() => {
    return (
      <TableFilterBar
        onClearFilters={clearFilters}
        onOpenFilter={() => setOpenFilter(true)}
        leftActions={<SelectCreateHelp />}
        hasFilters={hasFilters}
      />
    );
  }, [clearFilters, hasFilters, setOpenFilter]);

  return {
    // State
    params,
    loading,
    openFilter,
    editHelpId,
    currentFilters,
    filterButtons,

    // Computed
    count,
    rows,
    actions,

    // Methods
    setParams,
    setOpenFilter,
    setEditHelpId,
    openEdit,
    setFilters,
    clearFilters,
    toggleFilter,
  };
};