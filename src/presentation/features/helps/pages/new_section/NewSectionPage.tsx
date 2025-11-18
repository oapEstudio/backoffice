import { ContainerPage } from "../../../../components/containers/container-page/ContainerPage";
import { HELP, NEW_SECTION } from "../../../../router/routes";
import { FormProvider } from "react-hook-form";
import StepperWrapperBackOfficeDefault from "../../../../components/ui/step/stepper-wrapper-backoffice-default";
import StepNavigationBackOffice from "../../../../components/ui/step/step-navigation-backoffice";
import { CustomBox } from "../../../../components/ui/box/CustomBox";
import Button from "../../../../components/ui/button/button.component";
import { eStep } from "./reducers/ActionStepReducer";
import { useNewSectionPage } from "./hooks/useNewSectionPage";
import Loading from "../../../../components/ui/loading";
import { StepOneNewSection } from "./components/StepOneNewSection/StepOneNewSection";
import StepTwoNewSection from "./components/StepTwoNewSection/StepTwoNewSection";
import { ActionStep } from "../../../../components/ui/step/action-step/ActionStep";


export const NewSectionPage = () => {

  const { contentStepRef, form, navSteps, state, onSubmit, handleBack, handleNext, creating, selectItemsStatuses, isLoadingStatus, isStepValid } = useNewSectionPage();

  return (
    <ContainerPage description="NewSectionPage" title={`${HELP.title} - ${NEW_SECTION.title}`} titleSEO='Gestión de ayuda - Alta sección'>
      <div ref={contentStepRef} />
      <FormProvider {...form}>
        <StepperWrapperBackOfficeDefault width='40%'>
          <StepNavigationBackOffice steps={navSteps} />
        </StepperWrapperBackOfficeDefault>
        
        { creating || isLoadingStatus ? 
           <CustomBox sx={{ p: '0 4rem', minHeight: 300, paddingTop: '10rem' }}>
              <center><Loading /></center> 
          </CustomBox>
        :
          <CustomBox sx={{ p: '0 4rem', minHeight: 300, paddingTop: '2rem' }}>
            {state.step == 1 ? <StepOneNewSection selectItemsStatuses={selectItemsStatuses} /> : <></>}
            {state.step == 2 ? <StepTwoNewSection /> : <></>}
          </CustomBox> }
        <CustomBox sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          {false ? (
            <Button variant="primary" onClick={() => { }} title='Volver al inicio' />
          ) : (
            <ActionStep
              labelBack={state.labelPrev}
              labelNext={state.labelNext}
              handleNext={state.step == eStep.STEP_CONFIRMATION ? form.handleSubmit(onSubmit) : handleNext}
              handleBack={handleBack}
              isValid={isStepValid}
              isLast={false}
            />
          )}
        </CustomBox>
      </FormProvider>
    </ContainerPage>
  )
}
