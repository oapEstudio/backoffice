import { useReducer, useRef, useState } from "react";
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
import { HELP_SECTION } from "../../../shared/constants/helps";
import { useCreateHelp } from "../../../hooks/useCreateHelp";


const navStepsInit: StepType[] = [{
  active: true,
  icon: <StepNumber number={1} />,
  show: true,
  title: 'INT'

}, {
  active: false,
  icon: <StepNumber number={2} />,
  show: true,
  title: 'Sección'
},];



export function useNewSectionPage() {
  const contentStepRef = useRef<HTMLDivElement>(null);
  const [navSteps, setNavSteps] = useState(navStepsInit);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(ActionStepReducer, getActionStepInitialState());
  const { create, loading: creating, error: createError } = useCreateHelp();

  const form = useForm<IHelpFormValues>({
    defaultValues: {
      name: '',
      description: '',
      parentId: '',
      profiles: [],
      title: '',
      document: [],
      state: '',
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

      if (false || state.step == eStep.SUCCESS) return;

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
        parentId: '',
        link: '',
        helpTypeId: HELP_SECTION,
        helpDocumentTypeId: '',
        documents: []
      });

      Toast({
        message: 'Sección creada correctamente',
        type: eToast.Success
      });

      navigate(HELP.name);

    } catch (e) {
      Toast({
        message: 'Error al crear la sección',
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
    contentStepRef,
    form,
    navSteps,
    state,
    handleBack,
    onSubmit,
    handleNext
  }
}