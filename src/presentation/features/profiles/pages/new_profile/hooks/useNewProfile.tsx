import { useState } from "react";
import type { IProfileFormValues } from "../../shared/components/profile-form-values/IProfileFormValues";
import { DEFAULT_PROFILE } from "../../shared/constants/InitFormProfile";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateProfile } from "../../../hooks/useCreateProfile";
import type { StepType } from "../../../../../components/ui/step/step-navigation-backoffice";
import { CheckListIcon, UserIcon } from "../../../../../components/ui/icons";
import { eToast, Toast } from "../../../../../components/ui/toast/CustomToastService";
import { FATHER_PROFILE } from "../../../../../router/routes";

export const STEPS: StepType[] = [
  { show: true, active: false, icon: <UserIcon />, title: 'Nombre' },
  { show: true, active: false, icon: <CheckListIcon />, title: 'Asignación' }
]

export function useNewProfile(){
  const [activeStep, setActiveStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [created, setCreated] = useState<(IProfileFormValues & { id: string }) | null>(null);
  
  const form = useForm<IProfileFormValues>({
    defaultValues: DEFAULT_PROFILE,
    mode: 'onChange',          
    reValidateMode: 'onChange' 
  });
  const { create, loading: creating, error: createError } = useCreateProfile();
  const navigate = useNavigate()

  const navSteps = STEPS.map((st, i) => ({
    ...st,
   active: isSuccess ? isSuccess : i === activeStep
  }))

   const resetFlow = () => {
      form.reset(DEFAULT_PROFILE)
      setActiveStep(0)
      setIsSuccess(false)
      navigate('/profiles')
  }

  const nextStep = async () => {

    const fields = activeStep === 0
      ? ['name', 'description', 'statusId']
      : ['groups']

  
    const ok = await form.trigger(fields as any)
    if (ok) setActiveStep((s) => s + 1)
  }

  const prevStep = () => {
    if (activeStep === 0) {
      navigate(FATHER_PROFILE.name); 
      return;
    }
    setActiveStep(s => Math.max(0, s - 1));
  };

  const onSubmit = async (data: IProfileFormValues) => {
    try {
            
      const newId = await create({
       ...data, groups: data.groups.map(x=>x.id)
      });
      setCreated({ ...data, id: newId });

      Toast({
        message: 'Perfil creado correctamente',
        type: eToast.Success
      });
      setIsSuccess(true);    
    } catch(e) {
      Toast({
        message: 'Error al crear el perfil',
        type: eToast.Error
      });
    }
  }

  return {
    onSubmit,
    prevStep,
    nextStep,
    resetFlow,
    created,
    navSteps,
    form,
    isSuccess,
    activeStep,
    createError,
    creating
  }
}