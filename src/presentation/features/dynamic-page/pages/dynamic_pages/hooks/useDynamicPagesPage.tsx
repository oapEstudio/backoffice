
import { useGetDynamicPages } from '../../../hooks/useGetDynamicPages';
import { toDynamicPageRow } from '../../../mappers/dynamicPagesMapper';
import type { IDynamicPage } from '../../../../../../domain/entities/IDynamicPage';

import { Headers } from '../constants/configTable';

import { useTableStandard } from '../../../../../components/widgets/table-page-standard/hooks/useTablePageStandard';
import { Button } from '../../../../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { NEW_DYNAMIC_PAGE } from '../../../../../router/routes';

export function useDynamicPagesPage(){

    const navigate = useNavigate();
    
    const { params,
            setParams,
            loading,
            result,
            filterButtons,
            rows,
            actions } = useTableStandard<IDynamicPage>({
            useCase: useGetDynamicPages,
            toMapper: toDynamicPageRow,
            actionsButton:  <Button
                            variant="primary"
                            title="Crear nueva pagina"
                            onClick={() => navigate(NEW_DYNAMIC_PAGE.name)}
      />
    });

        
    return {
        params,
        setParams,
        loading,
        result,
        filterButtons,
        rows,
        actions,
        Headers,
    }
}
