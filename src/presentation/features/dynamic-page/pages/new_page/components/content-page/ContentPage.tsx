import React from 'react'
import { CustomGrid } from '../../../../../../components/ui/grid/CustomGrid'
import { colors } from '../../../../../../common/colors';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { CustomStack } from '../../../../../../components/ui/stack/Stack';
import { DynamicPage, type IDynamicPageProps } from '../../../../shared/components/dynamic-page/DynamicPage';

interface ContentPageProps{

}


const mockDynamicPageProps: IDynamicPageProps = {
  isMenu: true,
  sections: [
    {
      order: 1,
      elements: [
        { text: "Primer elemento de la sección 1",type: 2 },
        { text: "Segundo elemento de la sección 1",type: 2 }
      ]
    },
    {
      order: 2,
      elements: [
        { text: "Único elemento de la sección 2",type: 1 }
      ]
    }
  ]
};
export const ContentPage = () => {
  return (

      <DynamicPage isMenu={mockDynamicPageProps.isMenu} sections={mockDynamicPageProps.sections} />

  )
}
