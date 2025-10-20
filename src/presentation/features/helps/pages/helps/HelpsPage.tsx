import { TablePageStandard } from '../../../../components/widgets/table-page-standard/TablePageStandard';
import { Headers } from './constants/configTable';
import { FilterHelpsPage, type IFilterHelpsResult } from './components/filter-help-page/FilterHelpsPage';
import { HELP } from '../../../../router/routes';
import EditHelpModal from './components/edit-help/EditHelpModal';
import { useHelpPage } from '../../hooks/useHelpsPage';
import UpdateHelpProfile from './components/update-help-profile/UpdateHelpProfile';
import { ConfirmDialog } from '../../../../components/ui/confirm-dialog/ConfirmDialog';


export const HelpsPage = () => {
  const {
    params,
    setParams,
    loading,
    openEdit,
    openProfilesModal,
    editHelpId,
    editHelpType,
    currentFilters,
    filterButtons,
    selectedHelpId,
    selectedProfiles,
    openDelete,
    count,
    rows,
    actions,
    doConfirmDelete,
    refresh,
    setOpenDelete,
    setOpenProfilesModal,
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
        onSuccess={() => refresh}
        onClose={() => setOpenEdit(false)}
      />
      <ConfirmDialog
        open={openDelete}
        onOk={doConfirmDelete}
        onCancel={() => setOpenDelete(false)}/>
      <UpdateHelpProfile
        open={openProfilesModal}
        helpId={selectedHelpId}
        selectedProfiles={selectedProfiles}
        onClose={() => setOpenProfilesModal(false)}
        onSaved={() => {
          setOpenProfilesModal(false);
          refresh;
        }}
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