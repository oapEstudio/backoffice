import { TablePageStandard } from '../../../components/widgets/table-page-standard/TablePageStandard';
import { HELPDESK_PAGE } from '../../../router/routes';
import { Headers } from './constants/configTable';
import { useHelpTable } from '../hooks/useHelpsTable';
import { FilterHelpsPage, type IFilterHelpsResult  } from './components/filter-help-page/FilterHelpsPage';


export const HelpsPage = () => {
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
  } = useHelpTable();
  

  
  return (
    <>
      <FilterHelpsPage
        open={openFilter}
        initialFilters={currentFilters}
        onOk={(filters: IFilterHelpsResult) => {
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