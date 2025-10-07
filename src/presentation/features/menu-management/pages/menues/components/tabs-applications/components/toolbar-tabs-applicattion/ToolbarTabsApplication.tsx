import React from 'react'
import { CustomBox } from '../../../../../../../../components/ui/box/CustomBox'
import ProfileMultiSelect from '../../../../../../../../components/widgets/multiselect-profile/MultiSelectProfile'
import { ToolbarUtil } from '../../../../../../../../components/widgets/toolbar-util/ToolbarUtil'
import type { SelectOption } from '../../../../../../../../components/ui/inputs/multiselect/multiselect.interface';

interface IToolbarTabsApplicationProps{
    count: number;
    profileIds: string[],
    changeProfileMultiselect: (ids: string[],options: SelectOption[])=>void
}
export const ToolbarTabsApplication: React.FC<IToolbarTabsApplicationProps> = ({count = 0,profileIds,changeProfileMultiselect}) => {
  return (

    <ToolbarUtil 
      label={`Aplicaciones destacadas ${count}/4`}
      actions={
                <>          
                  <CustomBox sx={{minWidth: '20%', maxWidth: '70%'}}>
                          <ProfileMultiSelect
                            label='Filtrar por perfil'
                            remountKey={"open-profiles-menu"}
                            valueIds={profileIds}
                            onChange={changeProfileMultiselect}
                          />
                  </CustomBox>
               </>
            }
    />
  )
}
