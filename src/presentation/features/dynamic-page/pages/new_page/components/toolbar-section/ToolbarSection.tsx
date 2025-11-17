import React from 'react'
import { CustomStack } from '../../../../../../components/ui/stack/Stack'
import { CustomFab } from '../../../../../../components/ui/fab/CustomFab'
import { AddActionIcon, DeleteActionIcon } from '../../../../../../components/ui/icons'
import { colors } from '../../../../../../common/colors';

export interface IToolbarSectionProps{
    id: string;
    isEdit: boolean;
    handleDeleteSections?: (id: string) => void;
    handleAddElements?: (id: string) => void;
} 

export const ToolbarSection: React.FC<IToolbarSectionProps> = ({isEdit,id, handleDeleteSections, handleAddElements}) => {

  if(!isEdit) return <></>;


  return <CustomStack spacing={1} direction='column' sx={{position: 'absolute',right: '-0.1rem'}}>                                                    
                            <> {handleDeleteSections &&  <CustomFab style={{backgroundColor: colors.palette.primary.main ,width: '30px' , height: '30px'}} onClick={()=>{handleDeleteSections(id)}}>
                                                            <DeleteActionIcon style={{color: 'white'}} />
                                                        </CustomFab>
                                }
                            </>
                           <>{handleAddElements &&  <CustomFab style={{backgroundColor: colors.palette.primary.main, width: '30px' , height: '30px'}} onClick={()=>{handleAddElements(id)}}>
                                                            <AddActionIcon style={{color: 'white'}} />
                                                    </CustomFab> 
                             }                           
                           </>
            </CustomStack>;
}
