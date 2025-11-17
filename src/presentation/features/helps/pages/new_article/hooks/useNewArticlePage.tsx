import { useEffect, useReducer, useRef, useState } from "react";
import type { StepType } from "../../../../../components/ui/step/step-navigation-backoffice";
import { StepNumber } from "../../../shared/components/step-number/StepNumber";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { eToast, Toast } from "../../../../../components/ui/toast/CustomToastService";
import { HELP } from "../../../../../router/routes";
import { useScrollToTopOnStep } from "../../../../../utils/useScrollToTopOnStep";
import type { IHelpFormValues } from "../../../shared/interface/IHelpFormValues";
import { HELP_ARTICLE } from "../../../shared/constants/helps";
import { useCreateHelp } from "../../../hooks/useCreateHelp";
import { ActionStepReducer, eStep, getActionStepInitialState } from "../reducers/ActionStepReducer";
import { useHelpFilters } from "../../../shared/hooks/useHelpFilters";
import { useStepperNavigation } from "../../../shared/hooks/useStepperNavigation";



const navStepsInit: StepType[] = [{
  active: true,
  icon: <StepNumber number={1} />,
  show: true,
  title: 'Artículo'

}, {
  active: false,
  icon: <StepNumber number={2} />,
  show: true,
  title: 'INT'
},];


export function useNewArticlePage() {
  const contentStepRef = useRef<HTMLDivElement>(null);
  const [navSteps, setNavSteps] = useState(navStepsInit);

  const {
    selectItemsStatuses,
    leftSeedProfiles,
    isLoadingProfiles,
    isLoadingStatus,
    setParentIdForProfiles,
  } = useHelpFilters();

  const [isStepValid, setIsStepValid] = useState(false);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(ActionStepReducer, getActionStepInitialState());
  const { create, loading: creating } = useCreateHelp();

  const { handleNext, handleBack } = useStepperNavigation({
    state,
    navSteps,
    setNavSteps,
    dispatch,
    stepEnum: eStep,
    onStepCallbacks: {
      [eStep.STEP_ONE]: async () => {
        const parentId = form.getValues("parentId");
        const cleanParent =
          parentId && typeof parentId === "string" && parentId.trim() !== ""
            ? parentId
            : null;
        setParentIdForProfiles(cleanParent);
      },
    },
    backRoutes: {
      [eStep.STEP_ONE]: HELP.name,
    },
  });

  const form = useForm<IHelpFormValues>({
    defaultValues: {
      name: '',
      description: '',
      parentId: '',
      profiles: [],
      title: '',
      document: [],
      state: '1',
      helpTypeId: '',
      helpDocumentTypeId: '',
      link: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  useScrollToTopOnStep(state.step, {
    targetRef: contentStepRef,
    behavior: 'smooth',
    offset: 72,
  });

  useEffect(() => {
    const validateCurrentStep = async () => {

      const base = new Set<keyof IHelpFormValues>(state.field as Array<keyof IHelpFormValues>);
      const valid = await form.trigger(Array.from(base));
      setIsStepValid(valid);
    };

  validateCurrentStep();

  const sub = form.watch((_, { name }) => {
    if (!name) return;
    const watched = new Set<keyof IHelpFormValues>([...state.field as Array<keyof IHelpFormValues>
    ]);
    if (watched.has(name as keyof IHelpFormValues)) {
      void validateCurrentStep();
    }
  });

  return () => sub.unsubscribe();
  }, [form, state.field, state.step]);

  const onSubmit = async (data: IHelpFormValues) => {
    try {
      if (state.step === eStep.SUCCESS || !data.state) return;

      dispatch({ type: "SUCCESS", payload: "" });

      await create({
        description: data.description,
        name: data.name,
        title: data.title ? data.title : '',
        profiles: data.profiles.map(x => x.id),
        statusId: Number(data.state),
        parentId: data.parentId ?? '',
        link: '',
        helpTypeId: HELP_ARTICLE,
        helpDocumentTypeId: '',
        documents: []
      });

      Toast({
        message: 'Artículo creado correctamente',
        type: eToast.Success
      });

      navigate(HELP.name);

    } catch (err: any) {
      const message = err?.error?.message;
      Toast({ message: message ? message : 'Error al crear artículo', type: eToast.Error });
      dispatch({ type: 'STEP_CONFIRMATION', payload: '' });
    }
  }


  return {
    creating,
    selectItemsStatuses,
    contentStepRef,
    form,
    navSteps,
    state,
    handleBack,
    isLoadingProfiles,
    isLoadingStatus,
    onSubmit,
    handleNext,
    isStepValid,
    leftSeedProfiles
  }
}