import React, { type FC, useMemo, useRef, useState } from 'react'
import CustomModal from '../../../../../../components/ui/modal/modal.component'

import { eToast, Toast } from '../../../../../../components/ui/toast/CustomToastService'
import { useHighlightMenu } from '../../../../hooks/useHighlightMenu'
import { HighlightForm, type HighlightFormHandle } from '../highlight-form/HighlightForm'
import type { IHighlightMenuDto } from '../../../../../../../application/dtos/IHighlightMenuDto'

interface HighlightMenuEditModalProps {
  open: boolean
  onClose: () => void
  onSaved: () => void
  initialMenu: {
    id: string;
    title: string;
    description: string;
    profiles: string[]    
  }
}

export const HighlightMenuEditModal: FC<HighlightMenuEditModalProps> = ({
  open, onClose, onSaved, initialMenu
}) => {
  const { update, loading: updating } = useHighlightMenu()
  const [serverError, setServerError] = useState<string | null>(null)
  const [formValid, setFormValid] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);

  const formRef = useRef<HighlightFormHandle>(null);
  const nextHighlightRef = useRef<boolean>(false);

  const initialValues = useMemo<IHighlightMenuDto>(() => ({
    title: initialMenu.title,
    description: initialMenu.description,
    isHighlighted: true,
    profilesIds: initialMenu.profiles
  }), [initialMenu])


  const handleSubmit = async (data: IHighlightMenuDto) => {
    try {
      setServerError(null)

      await update(initialMenu.id, {
        title: data.title,
        description: data.description,
        isHighlighted: nextHighlightRef.current,
        profilesIds: initialMenu.profiles
      })

      Toast({ message: 'Destacado actualizado correctamente', type: eToast.Success })
      onSaved()
      onClose()
    } catch {
      setServerError('Error al actualizar el destacado')
      Toast({ message: 'Error al actualizar el destacado', type: eToast.Error })
    }
  }

  return (
    <CustomModal
      title="Editar Item destacado"
      labelCancel='Dejar de destacar'
      open={open}
      onClose={()=>{        
        onClose()
      }}
      onCancel={()=>{        
        nextHighlightRef.current = false;
        setIsHighlighted(false);
        formRef.current?.submit();
      }}
      onOk={() =>{
        nextHighlightRef.current = true;
        setIsHighlighted(true);
        formRef.current?.submit();
      } }
      maxWidth="sm"
      disabled={!formValid || updating}
    >
      <HighlightForm
        ref={formRef}
        open={open}
        initialValues={initialValues}           
        serverError={serverError}
        onSubmit={handleSubmit}
        onValidityChange={setFormValid}
      />
    </CustomModal>
  )
}
