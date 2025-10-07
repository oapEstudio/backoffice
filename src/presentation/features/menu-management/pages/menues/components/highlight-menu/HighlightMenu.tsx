import { type FC, useRef, useState } from 'react'
import CustomModal from '../../../../../../components/ui/modal/modal.component'

import { eToast, Toast } from '../../../../../../components/ui/toast/CustomToastService'
import { HighlightForm, type HighlightFormHandle } from '../highlight-form/HighlightForm'
import { useHighlightMenu } from '../../../../hooks/useHighlightMenu'
import type { IHighlightMenuDto } from '../../../../../../../application/dtos/IHighlightMenuDto'

interface HighlightModalProps {
  open: boolean
  onClose: () => void
  onSaved: () => void
  id: string,
  profiles: string[];
}

export const HighlightMenuItemModal: FC<HighlightModalProps> = ({id, open, onClose, onSaved, profiles }) => {

  const { update, loading: creating,error } = useHighlightMenu()
  const [serverError, setServerError] = useState<string | null>(null)
  const [formValid, setFormValid] = useState(false)

  const formRef = useRef<HighlightFormHandle>(null)
 
  const handleCancel = () => {
    formRef.current?.reset()
    onClose()
  }

  const handleSubmit = async (data: IHighlightMenuDto) => {
    try {
      setServerError(null)

      await update(id,{
        title: data.title,
        description: data.description,
        isHighlighted: true,
        profilesIds: profiles
      })

      Toast({ message: 'Menú destacado correctamente', type: eToast.Success })
      onSaved()
      formRef.current?.reset()
      onClose()
    } catch {
      setServerError(error);
      Toast({ message: 'Error al destacar el menú', type: eToast.Error })
    }
  }


 
  return (
    <CustomModal
      title={'Item destacado'}
      open={open}
      onClose={onClose}
      labelOk='Aceptar'
      onCancel={handleCancel}
      onOk={() => formRef.current?.submit()}
      maxWidth="sm"
      disabled={!formValid || creating}
    >
      <HighlightForm
        ref={formRef}
        open={open}            
        serverError={serverError}
        onSubmit={handleSubmit}
        onValidityChange={setFormValid}
      />
    </CustomModal>
  )
}
