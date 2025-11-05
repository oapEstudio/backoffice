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
import { HELP_ARTICLE, HELP_DOCUMENT, HELP_DOCUMENT_LINK } from "../../../shared/constants/helps";
import { useCreateHelp } from "../../../hooks/useCreateHelp";
import { useGetHelpStatus } from "../../../shared/components/hooks/useGetHelpsState";
import { toHelpDocumentTypeSelectCommon, toHelpSelect } from "../../../mappers/helpCreateMapper";
import { ActionStepReducer, eStep, getActionStepInitialState } from "../reducers/ActionStepReducer";
import { useGetHelpsProfiles } from "../../../shared/components/hooks/useGetHelpsProfiles";
import { useGetHelpDocumentType } from "../../../shared/components/hooks/useGetHelpsDocumentType";


const navStepsInit: StepType[] = [{
  active: true,
  icon: <StepNumber number={1} />,
  show: true,
  title: 'Documento'

}, {
  active: false,
  icon: <StepNumber number={2} />,
  show: true,
  title: 'INT'
},];


export function useNewDocumentPage() {
  const contentStepRef = useRef<HTMLDivElement>(null);
  const [navSteps, setNavSteps] = useState(navStepsInit);
  const [isStepValid, setIsStepValid] = useState(false);
  const [leftSeedProfiles, setLeftSeedProfiles] = useState<Array<{ id: string; name: string }>>([]);
  const [parentIdForProfiles, setParentIdForProfiles] = useState<string | null>(null);

  const navigate = useNavigate();
  const [state, dispatch] = useReducer(ActionStepReducer, getActionStepInitialState());
  const { create, loading: creating } = useCreateHelp();
  const { result: statuses, loading: isLoadingStatus } = useGetHelpStatus({
    stateFilters: { forCreate: true }
  });

  const selectItemsStatuses = useMemo(
    () => statuses.map(toHelpSelect),
    [statuses]
  );

  const { result: documentTypes, loading: isLoadingDocumentTypes } = useGetHelpDocumentType();

  const selectItemsDocumentType = useMemo(
    () => documentTypes.map(toHelpDocumentTypeSelectCommon),
    [documentTypes]
  );

  const { result: profiles, loading: isLoadingProfiles, error: errorCreate } = useGetHelpsProfiles(
    parentIdForProfiles ? { parentFilter: { parentId: parentIdForProfiles } } : undefined
  );

  useEffect(() => {
    if (profiles && Array.isArray(profiles)) {
      setLeftSeedProfiles(profiles);
    }
  }, [profiles]);


  const form = useForm<IHelpFormValues>({
    defaultValues: {
      name: '',
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

      dispatch({
        type: 'SUCCESS',
        payload: ''
      });

      await create({
        description: data.title,
        name: data.name,
        title: data.title ? data.title : '',
        profiles: data.profiles.map(x => x.id),
        statusId: Number(data.state),
        parentId: data.parentId ?? '',
        link: data.link ?? '',
        helpTypeId: HELP_DOCUMENT,
        helpDocumentTypeId: data.helpDocumentTypeId?.toString(),
        documents: data.document ?? null
      });

      Toast({
        message: 'Documento creado correctamente',
        type: eToast.Success
      });

      navigate(HELP.name);
    } catch (err: any) {
      const message = err?.error?.message;
      Toast({ message: message ? message : 'Error al crear documento', type: eToast.Error });

      dispatch({
        type: 'STEP_CONFIRMATION',
        payload: ''
      });
    }
  }

  const handleNext = async () => {

    switch (state.step) {

      case eStep.STEP_ONE: {
        const parentId = form.getValues('parentId');

        if (parentId && typeof parentId === 'string' && parentId.trim() !== '') {
          setParentIdForProfiles(parentId);
        } else {
          setParentIdForProfiles(null);
          setLeftSeedProfiles([]);
        }
        setNavSteps(navStepSelected(navSteps, state.step + 1));

        dispatch({
          type: 'STEP_CONFIRMATION',
          payload: ''
        });

        break;

      }
      case eStep.STEP_CONFIRMATION: {
        setNavSteps(navStepSelected(navSteps, state.step + 1));
        dispatch({
          type: 'SUCCESS',
          payload: ''
        });
        break;
      }
    }
  }


  const handleBack = () => {

    switch (state.step) {

      case eStep.STEP_ONE: {

        navigate(HELP.name)
        break;

      }
      case eStep.STEP_CONFIRMATION: {

        setNavSteps(navStepSelected(navSteps, state.step - 1));

        dispatch({
          type: 'STEP_ONE',
          payload: ''
        });

        break;

      }
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
    isLoadingProfiles,
    isLoadingStatus,
    isLoadingDocumentTypes,
    onSubmit,
    handleNext,
    isStepValid,
    leftSeedProfiles
  }
}