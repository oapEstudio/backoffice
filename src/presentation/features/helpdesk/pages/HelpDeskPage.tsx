import { TablePageStandard } from '../../../components/widgets/table-page-standard/TablePageStandard';
import { HELPDESK_PAGE } from '../../../router/routes';
import { useCallback, useMemo, useState } from 'react';
import TableFilterBar from '../../../components/widgets/table-filter-bar/TableFilterBar';
import { Headers } from './constants/configTable';
import { SelectCreateHelpDesk } from './components/select-create-help-desk/SelectHelpDesk';
import { useHelpDeskTable } from '../hooks/useHelpDeskTable';
import { FilterHelpDeskPagePage, type IFilteHelpDeskResult } from './components/filter-help-desk-page/FilterHelpDeskPage';


export const HelpDeskPage = () => {
  const {
    params,
    setParams,
    loading,
    currentFilters,
    filterButtons,
    count,
    rows,
    actions,
    openFilter,
    setOpenFilter,
    setFilters
  } = useHelpDeskTable();
  

  
  return (
    <>
      <FilterHelpDeskPagePage
        open={openFilter}
        initialFilters={currentFilters}
        onOk={(filters: IFilteHelpDeskResult) => {
          setFilters(filters);
          setOpenFilter(false);
        }}
        onCancel={() => setOpenFilter(false)}
      />
      <TablePageStandard
        params={params}
        setParams={setParams}
        loading={loading}
        description={'HelpDeskPage'}
        messageEmpty={'No se encontraron documentos disponibles'}
        title={HELPDESK_PAGE.title}
        count={count}
        filter={filterButtons}
        data={rows}
        actions={actions}
        columns={Headers}
        totalCount={count}
      />
    </>
  );
};