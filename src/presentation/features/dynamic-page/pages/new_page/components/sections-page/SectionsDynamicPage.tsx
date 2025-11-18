import React from 'react'
import { SectionPage, type ISectionPage } from '../section-page/SectionPage';
import { ID_SECTION_ITEM_MENU } from '../../../../shared/constants/constants';


interface ISectionsDynamicPageProps{
    sections: ISectionPage[];
    isEdit: boolean;
    handleDeleteSections?: (id: string) => void;
    handleAddElement?: (id: string) => void;
    handleDeleteElement?: (id: string) => void;
}
export const SectionsDynamicPage: React.FC<ISectionsDynamicPageProps> = ({sections, isEdit, handleAddElement,handleDeleteSections, handleDeleteElement}) => {


     return sections
            .filter(section=>section.id!==ID_SECTION_ITEM_MENU.toString())
            .map(section=><SectionPage 
                                        section={section} 
                                        isEdit={isEdit} 
                                        handleDeleteSections={handleDeleteSections} 
                                        handleAddElement={handleAddElement} 
                                        handleDeleteElement={handleDeleteElement} />);

}
