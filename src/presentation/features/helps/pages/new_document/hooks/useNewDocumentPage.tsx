import { useEffect, useReducer, useRef, useState } from "react";
import type { StepType } from "../../../../../components/ui/step/step-navigation-backoffice";
import { StepNumber } from "../../../shared/components/step-number/StepNumber";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { eToast, Toast } from "../../../../../components/ui/toast/CustomToastService";
import { HELP } from "../../../../../router/routes";
import { useScrollToTopOnStep } from "../../../../../utils/useScrollToTopOnStep";
import type { IHelpFormValues } from "../../../shared/interface/IHelpFormValues";
import { HELP_DOCUMENT, HELP_DOCUMENT_DOWNLOAD, HELP_DOCUMENT_LINK, HELP_DOCUMENT_PDF } from "../../../shared/constants/helps";
import { useCreateHelp } from "../../../hooks/useCreateHelp";
import { ActionStepReducer, eStep, getActionStepInitialState } from "../reducers/ActionStepReducer";
import { useHelpFilters } from "../../../shared/hooks/useHelpFilters";
import { useStepperNavigation } from "../../../shared/hooks/useStepperNavigation";


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

  const {
    selectItemsStatuses,
    selectItemsDocumentType,
    leftSeedProfiles,
    isLoadingProfiles,
    isLoadingStatus,
    isLoadingDocumentTypes,
    setParentIdForProfiles,
  } = useHelpFilters();
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
      name: "",
      parentId: "",
      profiles: [],
      title: "",
      document: [],
      state: "1",
      helpTypeId: "",
      helpDocumentTypeId: "",
      link: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useScrollToTopOnStep(state.step, {
    targetRef: contentStepRef,
    behavior: "smooth",
    offset: 72,
  });

  useEffect(() => {
    const validateCurrentStep = async () => {
      const currentDocType = Number(form.getValues("helpDocumentTypeId"));
      const isLink    = currentDocType === HELP_DOCUMENT_LINK;
      const needsFile = currentDocType === HELP_DOCUMENT_DOWNLOAD || currentDocType === HELP_DOCUMENT_PDF;

      const base = new Set<keyof IHelpFormValues>(state.field as Array<keyof IHelpFormValues>);
      if (isLink) {
        base.add("link");
        base.delete("document");
      } else if (needsFile) {
        base.add("document");
        base.delete("link");
      } else {
        base.delete("link");
        base.delete("document");
      }

      const valid = await form.trigger(Array.from(base));
      setIsStepValid(valid);
    };

  validateCurrentStep();

  const sub = form.watch((_, { name }) => {
    if (!name) return;
    const watched = new Set<keyof IHelpFormValues>([
      "helpDocumentTypeId", "document", "link", ...state.field as Array<keyof IHelpFormValues>
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
        description: data.title,
        name: data.name,
        title: data.title || "",
        profiles: data.profiles.map((x) => x.id),
        statusId: Number(data.state),
        parentId: data.parentId ?? "",
        link: data.link ?? "",
        helpTypeId: HELP_DOCUMENT,
        helpDocumentTypeId: data.helpDocumentTypeId?.toString(),
        documents: data.document ?? null,
      });

      Toast({ message: "Documento creado correctamente", type: eToast.Success });
      navigate(HELP.name);
    } catch (err: any) {
      const message = err?.error?.message;
      Toast({ message: message || "Error al crear documento", type: eToast.Error });
      dispatch({ type: "STEP_CONFIRMATION", payload: "" });
    }
  };

  return {
    selectItemsStatuses,
    selectItemsDocumentType,
    leftSeedProfiles,
    isLoadingProfiles,
    isLoadingStatus,
    isLoadingDocumentTypes,
    creating,
    contentStepRef,
    form,
    navSteps,
    state,
    handleBack,
    onSubmit,
    handleNext,
    isStepValid,
  };
}