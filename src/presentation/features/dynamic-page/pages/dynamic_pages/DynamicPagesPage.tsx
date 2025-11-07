import TablePageStandard from '../../../../components/widgets/table-page-standard/TablePageStandard';
import { useDynamicPagesPage } from './hooks/useDynamicPagesPage';
import { DYNAMIC_PAGE } from '../../../../router/routes';

export const DynamicPagesPage = () => {

   const { params,
        setParams,
        loading,
        result,
        filterButtons,
        rows,
        actions,
        Headers} = useDynamicPagesPage();

  return (
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
  )
}
