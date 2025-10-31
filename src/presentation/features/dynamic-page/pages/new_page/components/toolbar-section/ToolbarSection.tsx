import React from 'react'
import { CustomStack } from '../../../../../../components/ui/stack/Stack'
import { CustomFab } from '../../../../../../components/ui/fab/CustomFab'
import { AddActionIcon, DeleteActionIcon } from '../../../../../../components/ui/icons'

export interface IToolbarSectionProps{
    id: number;
    isEdit: boolean;
    handleDeleteSections: (id: number) => void;
    handleAddElements: (id: number) => void;
} 

export const ToolbarSection: React.FC<IToolbarSectionProps> = ({isEdit,id, handleDeleteSections, handleAddElements}) => {

  if(!isEdit) return <></>;


  return <CustomStack spacing={1} direction='column' sx={{position: 'absolute',right: 0}}>                                                    
                            <CustomFab style={{width: '30px' , height: '30px'}} onClick={()=>{handleDeleteSections(id)}}>
                                <DeleteActionIcon />
                            </CustomFab>
                            <CustomFab style={{width: '30px' , height: '30px'}} onClick={()=>{handleAddElements(id)}}>
                                    <AddActionIcon />
                            </CustomFab> 
            </CustomStack>;
}
