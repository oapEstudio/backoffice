import React, { type FC, useMemo, useRef, useState } from 'react'
import CustomModal from '../../../../../../components/ui/modal/modal.component'

import { eToast, Toast } from '../../../../../../components/ui/toast/CustomToastService'
import { MenuForm, type IMenuFormValues, type MenuFormHandle } from '../menu-form/MenuForm'
import { useUpdateMenu } from '../../../../hooks/useUpdateMenu'

interface EditMenuItemModalProps {
  open: boolean
  onClose: () => void
  onSaved: () => void
  // Datos actuales del ítem a editar:
  initialMenu: {
    id: string
    name: string
    hasLink: boolean
    link: string
    index: number,
    parendId: string | null,
    ordenIndex: number
  }

  parentLabel?: string
}

export const EditMenuItemModal: FC<EditMenuItemModalProps> = ({
  open, onClose, onSaved,
initialMenu,  parentLabel
}) => {
  const { update, loading: updating } = useUpdateMenu()
  const [serverError, setServerError] = useState<string | null>(null)
  const [formValid, setFormValid] = useState(false)

  const formRef = useRef<MenuFormHandle>(null)

  const initialValues = useMemo<IMenuFormValues>(() => ({
    name: initialMenu.name,
    hasLink: initialMenu.hasLink,
    link: initialMenu.link,
    index: initialMenu.index
  }), [initialMenu])

  const handleCancel = () => {
    formRef.current?.reset()
    onClose()
  }

  const handleSubmit = async (data: IMenuFormValues) => {
    try {
      setServerError(null)

      await update(initialMenu.id, {
        name: data.name,
        description: '',
        hierarchyIndex: data.index,
        link: data.hasLink ?data.link : '' ,
        hasLink: data.hasLink,
        orderIndex: initialMenu.ordenIndex,
        itemStatusId: 0,
        parentId: initialMenu.parendId,
      })

      Toast({ message: 'Menú actualizado correctamente', type: eToast.Success })
      onSaved()
      onClose()
    } catch {
      setServerError('Error al actualizar el menú')
      Toast({ message: 'Error al actualizar el menú', type: eToast.Error })
    }
  }

  return (
    <CustomModal
      title="Editar ítem de Menú"
      open={open}
      onClose={onClose}
      onCancel={handleCancel}
      onOk={() => formRef.current?.submit()}
      maxWidth="sm"
      disabled={!formValid || updating}
    >
      <MenuForm
        ref={formRef}
        open={open}
        initialValues={initialValues}
        parentId={initialMenu.parendId ?? undefined}
        parentLabel={parentLabel}
        submitting={updating}
        serverError={serverError}
        onSubmit={handleSubmit}
        onValidityChange={setFormValid}
      />
    </CustomModal>
  )
}
