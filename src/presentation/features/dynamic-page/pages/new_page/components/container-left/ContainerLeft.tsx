import type React from "react"
import { CustomBox } from "../../../../../../components/ui/box/CustomBox"
import { Button } from "../../../../../../components/ui/button"

export const ContainerLeft: React.FC<any> = ({handleAddStack})=>{

    return <>
         <CustomBox
                  width="200px"
                  p={2}
                  borderRight="1px solid rgba(0,0,0,0.12)"
                >
                  <Button
                    title="Agregar Stack"
                    variant="primary"
                    onClick={handleAddStack}
                  />
                </CustomBox>
    </>
}