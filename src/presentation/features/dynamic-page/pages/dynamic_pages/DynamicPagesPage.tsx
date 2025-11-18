import TablePageStandard from '../../../../components/widgets/table-page-standard/TablePageStandard';
import { useDynamicPagesPage } from './hooks/useDynamicPagesPage';
import { DYNAMIC_PAGE } from '../../../../router/routes';
import { FilterDynamicPagePage, type IFilterDynamicPageResult } from './components/filter-dynamic-page/FilterDynamicPage';
import { ConfirmDialog } from '../../../../components/ui/confirm-dialog/ConfirmDialog';
import UpdateDynamicPageProfile from './components/update-dynamic-page-profile/UpdateDynamicPageProfile';

export const DynamicPagesPage = () => {

   const { params,
        setParams,
        loading,
        result,
        filterButtons,
        rows,
        openFilter,
        setOpenEdit,
        currentFilters,
        openProfilesModal,
        setOpenProfilesModal,
        setFilters,
        openDelete,
        rowId,
        selectedProfiles,
        setOpenDelete,
        doConfirmDelete,
        setOpenFilter,
        actions,
        Headers} = useDynamicPagesPage();

  return <>
   <FilterDynamicPagePage 
                open={openFilter} 
                initialFilters={currentFilters} 
                onOk={(filters: IFilterDynamicPageResult)=>{
                  setFilters(filters);
                  setOpenFilter(false);
                }} 
                onCancel={()=>setOpenFilter(false)} 
              />
   <ConfirmDialog 
                   open={openDelete} 
                   onOk={doConfirmDelete} 
                   onCancel={()=>setOpenDelete(false)}  />

   <UpdateDynamicPageProfile 
                open={openProfilesModal}
                dynamicPageId={rowId}
                selectedProfiles={selectedProfiles}
                onClose={() => setOpenProfilesModal(false)}
                onSaved={() => {
                  setOpenProfilesModal(false);
                  setParams(p => ({ ...p }));
                }}
              />
   <TablePageStandard 
                        params={params} 
                        setParams={setParams}  
                        loading={loading} 
                        description={'DynamicPage'} 
                        messageEmpty={'No hay paginas disponibles'}
                        title={DYNAMIC_PAGE.title} 
                        count={result?.count??0} 
                        filter={filterButtons}
                        data={rows} 
                        actions={actions}
                        columns={Headers} 
                        totalCount={result?.count ?? 0}        />
  
  </>

}
