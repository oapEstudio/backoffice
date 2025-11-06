import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import type { StepType } from "../../../../../components/ui/step/step-navigation-backoffice";
import { StepNumber } from "../../../shared/components/step-number/StepNumber";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { eToast, Toast } from "../../../../../components/ui/toast/CustomToastService";
import { HELP } from "../../../../../router/routes";
import { navStepSelected } from "../../../../../utils/navStepSelected";
import { useScrollToTopOnStep } from "../../../../../utils/useScrollToTopOnStep";
import type { IHelpFormValues } from "../../../shared/interface/IHelpFormValues";
import { HELP_DOCUMENT_LINK, HELP_INVISIBLE } from "../../../shared/constants/helps";
import { useCreateHelp } from "../../../hooks/useCreateHelp";
import { toHelpDocumentTypeSelectCommon } from "../../../mappers/helpCreateMapper";
import { ActionStepReducer, eStep, getActionStepInitialState } from "../reducers/ActionStepReducer";
import { useGetHelpDocumentType } from "../../../shared/hooks/useGetHelpsDocumentType";
import { useHelpFilters } from "../../../shared/hooks/useHelpFilters";
import { useStepperNavigation } from "../../../shared/hooks/useStepperNavigation";



const navStepsInit: StepType[] = [{
  active: true,
  icon: <StepNumber number={1} />,
  show: true,
  title: 'Invisible'

}, {
  active: false,
  icon: <StepNumber number={2} />,
  show: true,
  title: 'INT'
},];


export function useNewInvisibleDocumentPage() {
  const contentStepRef = useRef<HTMLDivElement>(null);
  const [navSteps, setNavSteps] = useState(navStepsInit);
  const [isStepValid, setIsStepValid] = useState(false);
  const {selectItemsStatuses, isLoadingStatus} = useHelpFilters();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(ActionStepReducer, getActionStepInitialState());
  const { create, loading: creating } = useCreateHelp();
  const { handleNext, handleBack } = useStepperNavigation({
    state,
    navSteps,
    setNavSteps,
    dispatch,
    stepEnum: eStep,  
    backRoutes: {
      [eStep.STEP_ONE]: HELP.name,
    },
  });
  
  const { result: documentTypes, loading: isLoadingDocumentTypes } = useGetHelpDocumentType();

  const selectItemsDocumentType = useMemo(
    () => documentTypes.map(toHelpDocumentTypeSelectCommon),
    [documentTypes]
  );

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
      const currentDocType = Number(form.getValues('helpDocumentTypeId'));

      const allFields = state.field as Array<keyof IHelpFormValues>;

      const fieldsToCheck = allFields.filter(field => {
        if (field === 'document' && currentDocType === HELP_DOCUMENT_LINK) {
          return false;
        }
        if (field === 'link' && currentDocType !== HELP_DOCUMENT_LINK) {
          return false;
        }
        return true;
      });

      const isValid = fieldsToCheck.every(field => {
        const fieldValue = form.getValues(field);

        if (Array.isArray(fieldValue)) {
          return fieldValue.length > 0;
        }

        if (typeof fieldValue === 'string') {
          return fieldValue.trim() !== '';
        }

        return fieldValue !== null && fieldValue !== undefined;
      });

      setIsStepValid(isValid);
    };

    validateCurrentStep();

    const subscription = form.watch((values, { name }) => {
      const allFields = state.field as Array<keyof IHelpFormValues>;
      if (name && (allFields.includes(name as keyof IHelpFormValues) || name === 'helpDocumentTypeId')) {
        validateCurrentStep();
      }
    });

    return () => subscription.unsubscribe();
  }, [form, state.field, state.step]);

  const onSubmit = async (data: IHelpFormValues) => {
    try {

      if (false || state.step == eStep.SUCCESS || !data.state) return;

      dispatch({ type: 'SUCCESS', payload: ''});

      await create({
        description: data.title,
        name: data.name,
        title: data.title ? data.title : '',
        profiles: data.profiles.map(x => x.id),
        statusId: Number(data.state),
        parentId: data.parentId ?? '',
        link: data.link ?? '',
        helpTypeId: HELP_INVISIBLE,
        helpDocumentTypeId: data.helpDocumentTypeId?.toString(),
        documents: data.document ?? null
      });

      Toast({ message: 'Artículo creado correctamente', type: eToast.Success});
      navigate(HELP.name);

    } catch (err: any) {
      const message = err?.error?.message;
      Toast({ message: message ? message : 'Error al crear documento invisible', type: eToast.Error });
      dispatch({ type: 'STEP_CONFIRMATION', payload: '' });
    }
  }

  return {
    creating,
    selectItemsStatuses,
    selectItemsDocumentType,
    contentStepRef,
    form,
    navSteps,
    state,
    handleBack,
    isLoadingStatus,
    isLoadingDocumentTypes,
    onSubmit,
    handleNext,
    isStepValid,
  }
}