import React, { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import CustomModal from '../../../../../../components/ui/modal/modal.component'
import type { IProfileFormValues } from '../../../shared/components/profile-form-values/IProfileFormValues'
import { useContext } from 'react'
import { DependencyContext } from '../../../../../../contexts/DependencyContext'
import { GroupAssignmentForm } from '../../../shared/components/group-assignment-form/GroupAssignmentForm'
import { useUpdateGroupProfile } from '../../../../hooks/useUpdateGroupProfile';
import { eToast, Toast } from '../../../../../../components/ui/toast/CustomToastService'
import type { IProfile } from '../../../../../../../domain/entities/IProfile'

interface EditGroupsModalProps {
  open: boolean
  onClose: () => void
  initialGroups: IProfileFormValues['groups']
  profile?: IProfile
  onSaved: () => void
}

export const EditGroups: React.FC<EditGroupsModalProps> = ({
  open,
  onClose,
  initialGroups,
  profile,
  onSaved
}) => {

  const form = useForm<IProfileFormValues>({
    defaultValues: { groups: initialGroups }
  });

  useEffect(() => {
    if (open) {
      form.reset({ groups: initialGroups })
    }
  }, [open, initialGroups, form])

  const { updateProfileGroup } = useContext(DependencyContext)
  const {update, loading: saving, error: saveError} = useUpdateGroupProfile(updateProfileGroup);

  const handleSave = form.handleSubmit(async data => {
    
    if(!profile) return;

    await update(profile.id, {
      id: profile.id,
      groups: data.groups.map(x=>x.id)
    });

     if(!saving && saveError){

          Toast({
            message: saveError ?? 'Error al editar el perfil',
            type: eToast.Error
          });
    
          return;
      }
    onSaved()
    onClose()
  })
  const onCancel = ()=>{
    form.reset();
    onClose()
  }
  return (
    <CustomModal
      title={`Grupos de ${profile?.name}`}
      labelOk="Aplicar"
      open={open}
      onClose={onClose}
      onOk={handleSave}
      disabled={!form.formState.isValid}
      onCancel={onCancel} 
      maxWidth={'md'}>
      <>
      <FormProvider {...form}>
        <GroupAssignmentForm />
      </FormProvider>
      
      </>
    </CustomModal>
  )
}
