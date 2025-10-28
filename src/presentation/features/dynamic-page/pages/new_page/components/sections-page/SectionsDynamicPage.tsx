import React from 'react'
import { SectionPage, type ISectionPage } from '../section-page/SectionPage';


interface ISectionsDynamicPageProps{
    sections: ISectionPage[];
    isEdit: boolean;
    handleDeleteSections: (id: number) => void;
    handleAddElement: (id: number) => void;
    handleDeleteElement: (id: number) => void;
}
export const SectionsDynamicPage: React.FC<ISectionsDynamicPageProps> = ({sections, isEdit, handleAddElement,handleDeleteSections, handleDeleteElement}) => {


     return sections.map(section=><SectionPage 
                                        section={section} 
                                        isEdit={isEdit} 
                                        handleDeleteSections={handleDeleteSections} 
                                        handleAddElement={handleAddElement} 
                                        handleDeleteElement={handleDeleteElement} />);

}
