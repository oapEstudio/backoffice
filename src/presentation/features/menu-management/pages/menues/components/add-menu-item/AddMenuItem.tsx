import React, { type FC, useRef, useState } from 'react'
import CustomModal from '../../../../../../components/ui/modal/modal.component'

import { useCreateMenu } from '../../../../hooks/useCreateMenu'
import { eToast, Toast } from '../../../../../../components/ui/toast/CustomToastService'
import { MenuForm, type IMenuFormValues, type MenuFormHandle } from '../menu-form/MenuForm'

interface AddMenuItemModalProps {
  open: boolean
  onClose: () => void
  onSaved: () => void
  parentId?: string,
  order: number,
  parentLabel?: string
}

export const AddMenuItemModal: FC<AddMenuItemModalProps> = ({ open, onClose, onSaved, parentId, parentLabel, order }) => {
  const { create, loading: creating,error } = useCreateMenu()
  const [serverError, setServerError] = useState<string | null>(null)
  const [formValid, setFormValid] = useState(false)

  const formRef = useRef<MenuFormHandle>(null)
 
  const handleCancel = () => {
    formRef.current?.reset()
    onClose()
  }

  const handleSubmit = async (data: IMenuFormValues) => {
    try {
      setServerError(null)

      await create({
        name: data.name,
        description: '',
        hasLink: data.hasLink,
        orderIndex: order,
        hierarchyIndex: data.index,
        itemStatusId: 1,
        link: data.hasLink ? data.link : '' ,
        parentId: parentId ?? null,
      })

      Toast({ message: 'Menú creado correctamente', type: eToast.Success })
      onSaved()
      formRef.current?.reset()
      onClose()
    } catch {
      setServerError(error);
      Toast({ message: 'Error al crear el menú', type: eToast.Error })
    }
  }


  const title = parentId ? 'Agregar ítem de Menú (hijo)' : 'Agregar ítem de Menú'

  return (
    <CustomModal
      title={title}
      open={open}
      onClose={onClose}
      labelOk='Aceptar'
      onCancel={handleCancel}
      onOk={() => formRef.current?.submit()}
      maxWidth="sm"
      disabled={!formValid || creating}
    >
      <MenuForm
        ref={formRef}
        open={open}
        parentId={parentId}
        parentLabel={parentLabel}
        submitting={creating}
        serverError={serverError}
        onSubmit={handleSubmit}
        onValidityChange={setFormValid}
      />
    </CustomModal>
  )
}
