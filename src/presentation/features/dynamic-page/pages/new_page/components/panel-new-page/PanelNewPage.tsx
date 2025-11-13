import React from 'react'
import { CustomStack } from '../../../../../../components/ui/stack/Stack'
import { CustomBox } from '../../../../../../components/ui/box/CustomBox'
import { CustomFab } from '../../../../../../components/ui/fab/CustomFab'
import { AddActionIcon, EyeIcon, GroupActionIcon } from '../../../../../../components/ui/icons'
import { CustomToggle } from '../../../../../../components/ui/toggle/CustomToggle'
import { colors } from '../../../../../../common/colors'


export interface IPanelNewPageProps{
    setOpenAddSection: (value: boolean)=>void;
    handlePreview: React.MouseEventHandler<HTMLButtonElement> | undefined;
    hasMenu: boolean;
    setHasMenu: (value: boolean)=>void

}
export const PanelNewPage: React.FC<IPanelNewPageProps> = ({setOpenAddSection, handlePreview, hasMenu,setHasMenu}) => {
  return (
     <CustomStack spacing={5} direction='column'  sx={{ marginTop: 10, position: 'fixed'}}>
            <CustomBox>
                <CustomFab style={{color: 'white', backgroundColor: colors.palette.primary.main}} variant='extended' onClick={()=>setOpenAddSection(true)}>
                    <AddActionIcon style={{marginRight: '0.5rem', color: 'white'}} />
                        Añadir sección
                </CustomFab>
            </CustomBox>                             
            <CustomBox >
                <CustomFab  style={{color: 'white', backgroundColor: colors.palette.primary.main}} variant='extended' onClick={handlePreview}>
                    <GroupActionIcon  style={{marginRight: '0.5rem', color: 'white'}} />
                       Agregar perfiles
                </CustomFab>
            </CustomBox>
            <CustomBox >
                <CustomFab style={{color: 'white', backgroundColor: colors.palette.primary.main}} variant='extended' onClick={handlePreview}>
                    <EyeIcon  style={{marginRight: '0.5rem', color: 'white'}} />
                       Previsualización
                </CustomFab>
            </CustomBox>
            <CustomToggle sx={{justifyContent: 'center'}}  label='Pagina con menu?' options={[{label: 'SI',value: true},{label: 'NO',value: false}]} state={hasMenu} setState={setHasMenu} />
    </CustomStack> 
  )
}
