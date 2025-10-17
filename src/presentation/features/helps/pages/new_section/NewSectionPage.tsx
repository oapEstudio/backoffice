import { ContainerPage } from "../../../../components/containers/container-page/ContainerPage";
import { HELP, NEW_SECTION } from "../../../../router/routes";
import { FormProvider, useForm } from "react-hook-form";
import StepperWrapperBackOfficeDefault from "../../../../components/ui/step/stepper-wrapper-backoffice-default";
import StepNavigationBackOffice from "../../../../components/ui/step/step-navigation-backoffice";
import { CustomBox } from "../../../../components/ui/box/CustomBox";
import Button from "../../../../components/ui/button/button.component";
import StepOneNewAlert from "./components/StepOneNewAlert/StepOneNewAlert";
import { StepTwoNewAlert } from "./components/StepTwoNewAlert/StepTwoNewAlert";
import { eStep } from "./reducers/ActionStepReducer";
import { ActionStep } from "../../shared/components/action-step/ActionStep";
import { useNewSectionPage } from "./hooks/useNewSectionPage";


export const NewSectionPage = () => {

  const {contentStepRef,form,navSteps,state,onSubmit,handleBack,handleNext} = useNewSectionPage();

  return (
    <ContainerPage description="NewSectionPage" title={`${HELP.title} - ${NEW_SECTION.title}`} titleSEO='Gestión de ayuda - Alta sección'>
      <div ref={contentStepRef} />
      <FormProvider {...form}>
        <StepperWrapperBackOfficeDefault width='40%'>
          <StepNavigationBackOffice steps={navSteps} />
        </StepperWrapperBackOfficeDefault>
        <CustomBox sx={{ p: '0 4rem', minHeight: 300, paddingTop: '2rem' }}>
          {state.step == 1 ? <StepOneNewAlert /> : <></>}
          {state.step == 2 ? <StepTwoNewAlert /> : <></>}
        </CustomBox>
        <CustomBox sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          {false ? (
            <Button variant="primary" onClick={() => { }} title='Volver al Inicio' />
          ) : (
            <ActionStep
              labelBack={state.labelPrev}
              labelNext={state.labelNext}
              handleNext={state.step == eStep.STEP_CONFIRMATION ? form.handleSubmit(onSubmit) : handleNext}
              handleBack={handleBack}
              isValid={form.formState.isValid}
              isLast={false}
            />
          )}
        </CustomBox>
      </FormProvider>
    </ContainerPage>
  )
}
