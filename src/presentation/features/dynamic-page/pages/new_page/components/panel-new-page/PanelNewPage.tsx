import React from 'react'
import { CustomStack } from '../../../../../../components/ui/stack/Stack'
import { CustomBox } from '../../../../../../components/ui/box/CustomBox'
import { CustomFab } from '../../../../../../components/ui/fab/CustomFab'
import { AddActionIcon, EyeIcon, GroupActionIcon, SaveeIcon } from '../../../../../../components/ui/icons'
import { CustomToggle } from '../../../../../../components/ui/toggle/CustomToggle'
import { colors } from '../../../../../../common/colors'
import { Button } from '../../../../../../components/ui/button'


export interface IPanelNewPageProps{
    setOpenAddSection: (value: boolean)=>void;
    handlePreview:  (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    handleSave:  (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    hasMenu: boolean;
    setHasMenu: (value: boolean)=>void

}
export const PanelNewPage: React.FC<IPanelNewPageProps> = ({setOpenAddSection, handlePreview, hasMenu,setHasMenu,handleSave}) => {
  return (
     <CustomStack spacing={5} direction='column'  sx={{backgroundColor: '#f5f5f5',padding: '1rem', marginTop: 10, position: 'fixed'}}>
        <CustomToggle sx={{justifyContent: 'left'}}  label='Página con menú?' options={[{label: 'SI',value: true},{label: 'NO',value: false}]} state={hasMenu} setState={setHasMenu} />
            <CustomBox>              
                <Button variant='primary' title='Añadir sección' style={{width: '100%'}} icon={ <AddActionIcon style={{marginRight: '0.5rem', color: 'white'}} />} onClick={()=>setOpenAddSection(true)}/>
            </CustomBox>                                                    
            <CustomBox >               
                 <Button variant='primary' title='Previsualización' style={{width: '100%'}}icon={<EyeIcon  style={{marginRight: '0.5rem', color: 'white'}} />} onClick={handlePreview}/>
            </CustomBox>
             <CustomBox >             
                <Button variant='primary' title='Guardar'  style={{width: '100%'}} icon={<SaveeIcon  style={{marginRight: '0.5rem', color: 'white'}} />} onClick={handleSave}/>
            </CustomBox>
            
    </CustomStack> 
  )
}
