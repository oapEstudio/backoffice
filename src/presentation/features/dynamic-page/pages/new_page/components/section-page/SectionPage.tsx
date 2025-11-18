import React, { useMemo } from 'react';
import { CustomBox } from '../../../../../../components/ui/box/CustomBox';
import { CustomGrid } from '../../../../../../components/ui/grid/CustomGrid';
import BlankCard from '../../../../../../components/ui/card/blank';
import { EmptySection } from '../empty-section/EmptySection';
import { ToolbarSection } from '../toolbar-section/ToolbarSection';
import { ElementDynamicPage, eTypeElement, type IElementDynamicPage } from '../element-dynamic-page/ElementDynamicPage';
import { colors } from '../../../../../../common/colors';
import { BackgroundColor } from '@tiptap/extension-text-style';


const ROW_MAX_SIZE: number = 12;

export interface ISectionPage{
  order: number;
  elements: IElementDynamicPage[];
  id: string;
  backgroundColor: string;
}

export interface ISectionPageProps{
  section: ISectionPage;
  isEdit: boolean;
  handleDeleteSections?: (id: string) => void;
  handleAddElement?: (id: string) => void;
  handleDeleteElement?: (id: string) => void;
}


const isFullWidth = (el: IElementDynamicPage) =>
  el.type === eTypeElement.TITLE || 
  el.type === eTypeElement.BACKGROUND_IMAGE ||
  el.type === eTypeElement.ACCORDEON;


const buildRows = (elements: IElementDynamicPage[]) => {
  const rows: IElementDynamicPage[][] = [];
  let auxRows: IElementDynamicPage[] = [];

  for (const element of elements) {
    if (isFullWidth(element)) {
      if (auxRows.length) {
        rows.push(auxRows);
        auxRows = [];
      }
      rows.push([element]); 
    } else {
      auxRows.push(element);
    }
  }
  if (auxRows.length) rows.push(auxRows);

  return rows;
};


const sizeForItemInRow = (row: IElementDynamicPage[], index: number) => {

  if (row.length === 1 && isFullWidth(row[0])) return ROW_MAX_SIZE; 

  const nonFull = row.filter(e => !isFullWidth(e));
  const n = nonFull.length || 1; 
  const base = Math.floor(ROW_MAX_SIZE / n);
  const remainder = ROW_MAX_SIZE - base * n;
  
  return base + (index < remainder ? 1 : 0);
};

export const SectionPage: React.FC<ISectionPageProps> = ({
  section, handleAddElement, handleDeleteSections, handleDeleteElement, isEdit
}) => {
  if (section.elements.length === 0) {
    return (
      <CustomBox sx={{ px: 2, position: 'relative' }}>
        <ToolbarSection
          id={section.id}
          isEdit={isEdit}
          handleDeleteSections={handleDeleteSections}
          handleAddElements={handleAddElement}
        />
        <EmptySection />
      </CustomBox>
    );
  }

  const rows = useMemo(() => buildRows(section.elements), [section.elements]);

  return (
    <CustomBox sx={{backgroundColor: section.backgroundColor, border: isEdit? '0.3rem dashed '+ colors.palette.primary.main : 'none', px: 2, position: 'relative' }}>
      <ToolbarSection
        id={section.id}
        isEdit={isEdit}
        handleDeleteSections={handleDeleteSections}
        handleAddElements={handleAddElement}
      />
      <BlankCard color={section.backgroundColor?'transparent': ''}>    
        {rows.map((row, rIdx) => (
          <CustomGrid container spacing={1} key={`row_${section.id}_${rIdx}`}>
            {
              row                          
              .map((element, i) => (
                    <ElementDynamicPage
                      isEdit={isEdit}
                      key={`el_${section.id}_${element.id}_${i}`}
                      sectionId={section.id}
                      element={element}
                      size={sizeForItemInRow(row, i)}
                      handleDeleteElement={handleDeleteElement}
                    />
                  ))
            }
          </CustomGrid>
        ))}
      </BlankCard>
    </CustomBox>
  );
};
