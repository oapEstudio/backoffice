import { useMemo, useReducer, useRef, useState } from "react";
import type { StepType } from "../../../../../components/ui/step/step-navigation-backoffice";
import { StepNumber } from "../../../shared/components/step-number/StepNumber";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { eToast, Toast } from "../../../../../components/ui/toast/CustomToastService";
import { HELP } from "../../../../../router/routes";
import { navStepSelected } from "../../../../../utils/navStepSelected";
import { useScrollToTopOnStep } from "../../../../../utils/useScrollToTopOnStep";
import type { IHelpFormValues } from "../../../shared/interface/IHelpFormValues";
import { ActionStepReducer, getActionStepInitialState, eStep } from "../reducers/ActionStepReducer";
import { HELP_ARTICLE, HELP_SECTION } from "../../../shared/constants/helps";
import { useCreateHelp } from "../../../hooks/useCreateHelp";
import { useGetHelpStatus } from "../../../hooks/useGetHelpsState";
import { toHelpSelect } from "../../../mappers/helpCreateMapper";


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
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(ActionStepReducer, getActionStepInitialState());
  const { create, loading: creating, error: createError } = useCreateHelp(); 
  const { result: statuses } = useGetHelpStatus({
    stateFilters: { forCreate: true }
  });

  const selectItemsStatuses = useMemo(
    () => statuses.map(toHelpSelect),
    [statuses]
  );

  const { result: sectionItems } = useGetHelpStatus({
    stateFilters: { forCreate: true }
  });

  const selectItemsSection = useMemo(
    () => sectionItems.map(toHelpSelect),
    [sectionItems]
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
        parentId: 'a6d0e767-30c0-4b44-843c-445b09444787',
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

    } catch (e) {
      Toast({
        message: 'Error al crear el artículo',
        type: eToast.Error
      });

      dispatch({
        type: 'STEP_CONFIRMATION',
        payload: ''
      });
    }
  }

  const handleNext = async () => {

    switch (state.step) {

      case eStep.STEP_ONE: {

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
    selectItemsSection,
    contentStepRef,
    form,
    navSteps,
    state,
    handleBack,
    onSubmit,
    handleNext
  }
}