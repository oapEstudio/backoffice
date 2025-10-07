import Typography from "@mui/material/Typography"
import { CustomBox } from "../../../../../../components/ui/box/CustomBox"
import { CustomStack } from "../../../../../../components/ui/stack/Stack"
import type React from "react"
import { Button } from "../../../../../../components/ui/button"
import { CustomAccordion } from "../../../../../../components/ui/accordion/Accordion"

export const ContainerRight: React.FC<any> = ({stacks,handleOpenModal})=>{
    return <>
         <CustomBox flexGrow={1} display="flex" p={2} overflow="hidden">
                  {/* Sidebar fijo */}
                  <CustomBox
                    width="240px"
                    flexShrink={0}
                    pr={2}
                    borderRight="1px solid rgba(0,0,0,0.12)"
                    sx={{ position: 'sticky', top: 0, alignSelf: 'flex-start' }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Sidebar Preview
                    </Typography>
                    <Typography>Opción A</Typography>
                    <Typography>Opción B</Typography>
                    <Typography>Opción C</Typography>
                  </CustomBox>
        
                  {/* Preview de stacks */}
                  <CustomBox flexGrow={1} pl={2} overflow="auto">
                    {stacks.map((components: any, idx: number) => (
                      <CustomStack
                        key={idx}
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        mb={2}
                      >
                        <Button
                          title="+"
                          variant="primary"
                          onClick={() => handleOpenModal(idx)}
                        />
                        {components.map((inst: any, i: number) => (
                          <CustomBox
                            key={i}
                            p={1}
                            border="1px dashed rgba(0,0,0,0.4)"
                            borderRadius={1}
                          >
                            {inst.type === 'Button' && (
                              <Button title={inst.props.label} variant="primary" onClick={()=>{
                                alert(inst.props.valueClick);
                              }}/>
                            )}
                            {inst.type === 'Imagen' && (
                              <Typography>
                                🔘 Slider ({inst.props.defaultValue})
                              </Typography>
                            )}
                            {inst.type === 'Accordion' && (
                              <>
                                <CustomAccordion title={inst.props.title} content={inst.props.content} />                                
                              </>
                            )}
                          </CustomBox>
                        ))}
                      </CustomStack>
                    ))}
                  </CustomBox>
                </CustomBox>
    </>
}