import React from 'react'
import { colors } from '../../../../../common/colors';
import { CustomBox } from '../../../../../components/ui/box/CustomBox';
import { CustomStack } from '../../../../../components/ui/stack/Stack';
import Typography from '@mui/material/Typography';
import CustomDivider from '../../../../../components/ui/divider';

interface IPreview{
    title: string;
    value: string;
}
interface IPreviewInfoProps{
    preview: IPreview[]
}
export const PreviewInfo: React.FC<IPreviewInfoProps> = ({preview}) => {
  return (
      <CustomBox sx={{width: '60%', backgroundColor: colors.whiteSmoke, borderRadius: '2%', paddingTop: '2%',paddingBottom: '2%'}}>
            {preview.length > 0  && preview.map((p: IPreview)=>{

                return <>
                    <CustomStack direction='row' sx={{justifyContent: 'space-between',paddingLeft: '5%',paddingRight:'5%'}}>
                        <Typography sx={{marginRight: '50%'}}>{p.title}</Typography>
                        <Typography fontWeight={700} sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            
                            wordBreak: 'break-word',
                            overflowWrap: 'anywhere',
                            whiteSpace: 'normal'
                                        }} 
                        color='#2A3547'>{p.value}</Typography>
                    </CustomStack>
                    <CustomDivider />
                
                </>
            })}         
     </CustomBox>
  )
}
