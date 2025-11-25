import React from 'react'
import { CustomStack } from '../../../../../../components/ui/stack/Stack'
import { CustomBox } from '../../../../../../components/ui/box/CustomBox'
import { AddActionIcon, DangerIcon, EyeIcon, GroupActionIcon, SaveeIcon } from '../../../../../../components/ui/icons'
import { CustomToggle } from '../../../../../../components/ui/toggle/CustomToggle'
import { Button } from '../../../../../../components/ui/button'
import { useNavigate } from 'react-router-dom'
import { DYNAMIC_PAGE } from '../../../../../../router/routes'


export interface IPanelNewPageProps{
    setOpenAddSection: (value: boolean)=>void;
    handlePreview:  (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    handleSave:  (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    hasMenu: boolean;
    setHasMenu: (value: boolean)=>void

}
export const PanelNewPage: React.FC<IPanelNewPageProps> = ({setOpenAddSection, handlePreview, hasMenu,setHasMenu,handleSave}) => {

  const navigate = useNavigate();

  return (
     <CustomStack spacing={5} direction='column'  sx={{backgroundColor: '#f5f5f5',padding: '1rem', marginTop: 3, position: 'fixed'}}>
        <CustomToggle sx={{justifyContent: 'left'}}  label='Página con menú?' options={[{label: 'SI',value: true},{label: 'NO',value: false}]} state={hasMenu} setState={setHasMenu} />
            <CustomBox>              
                <Button variant='primary' title='Añadir sección' style={{display:'flex',justifyContent: 'left',width: '100%'}} icon={ <AddActionIcon style={{marginRight: '0.5rem', color: 'white'}} />} onClick={()=>setOpenAddSection(true)}/>
            </CustomBox>                                                    
            <CustomBox >               
                 <Button variant='primary' title='Previsualización' style={{display:'flex',justifyContent: 'left',width: '100%'}}icon={<EyeIcon  style={{marginRight: '0.5rem', color: 'white'}} />} onClick={handlePreview}/>
            </CustomBox>
             <CustomBox >             
                <Button variant='primary' title='Guardar'  style={{display:'flex',justifyContent: 'left',width: '100%'}} icon={<SaveeIcon  style={{marginRight: '0.5rem', color: 'white'}} />} onClick={handleSave}/>
            </CustomBox>

             <CustomBox >             
                <Button variant='primary' title='Cancelar'  style={{display:'flex',justifyContent: 'left', width: '100%'}} icon={<DangerIcon  style={{marginRight: '0.5rem', color: 'white'}} />} onClick={()=>{
                   navigate(DYNAMIC_PAGE.name);
                }}/>
            </CustomBox>
            
    </CustomStack> 
  )
}
