import { TablePageStandard } from '../../../../components/widgets/table-page-standard/TablePageStandard';
import { Headers } from './constants/configTable';
import { FilterHelpsPage, type IFilterHelpsResult } from './components/filter-help-page/FilterHelpsPage';
import { HELP } from '../../../../router/routes';
import EditHelpModal from './components/edit-help/EditHelpModal';
import { useHelpPage } from '../../hooks/useHelpsPage';


export const HelpsPage = () => {
  const {
    params,
    setParams,
    loading,
    openEdit,
    editHelpId,
    editHelpType,
    currentFilters,
    filterButtons,
    count,
    rows,
    actions,
    refresh,
    setOpenEdit,
    openFilter,
    setOpenFilter,
    setFilters
  } = useHelpPage();


  return (
    <>
      <EditHelpModal
        open={openEdit}
        helpId={editHelpId}
        helpType={editHelpType}
        onClose={() => setOpenEdit(false)}
        />
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
        description={'HelpPage'}
        messageEmpty={'No se encontraron documentos disponibles'}
        title={HELP.title}
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