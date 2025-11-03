import { ContainerPage } from "../../../../components/containers/container-page/ContainerPage";
import { HELP, NEW_ARTICLE, NEW_DOCUMENT_INVISIBLE } from "../../../../router/routes";
import { FormProvider, useForm } from "react-hook-form";
import StepperWrapperBackOfficeDefault from "../../../../components/ui/step/stepper-wrapper-backoffice-default";
import StepNavigationBackOffice from "../../../../components/ui/step/step-navigation-backoffice";
import { CustomBox } from "../../../../components/ui/box/CustomBox";
import Button from "../../../../components/ui/button/button.component";
import { eStep } from "./reducers/ActionStepReducer";
import { ActionStep } from "../../shared/components/action-step/ActionStep";
import Loading from "../../../../components/ui/loading";
import { StepOneNewAlert } from "./components/StepOneNewAlert/StepOneNewAlert";
import StepTwoNewAlert from "./components/StepTwoNewAlert/StepTwoNewAlert";
import { useNewInvisibleDocumentPage } from "./hooks/useNewInvisibleDocumentPage";


export const NewInvisibleDocumentPage = () => {

  const { contentStepRef, form, navSteps, state, onSubmit, handleBack, handleNext, creating, selectItemsStatuses, isLoadingStatus, isStepValid } = useNewInvisibleDocumentPage();

  return (
    <ContainerPage description="NewInvisibleDocumentPage" title={`${HELP.title} - ${NEW_DOCUMENT_INVISIBLE.title}`} titleSEO='Gestión de ayuda - Alta sección'>
      <div ref={contentStepRef} />
      <FormProvider {...form}>
        <StepperWrapperBackOfficeDefault width='40%'>
          <StepNavigationBackOffice steps={navSteps} />
        </StepperWrapperBackOfficeDefault>
        
        {creating || isLoadingStatus  ? 
           <CustomBox sx={{ p: '0 4rem', minHeight: 300, paddingTop: '10rem' }}>
              <center><Loading /></center> 
          </CustomBox>
        :
          <CustomBox sx={{ p: '0 4rem', minHeight: 300, paddingTop: '2rem' }}>
            {state.step == 1 ? <StepOneNewAlert selectItemsStatuses={selectItemsStatuses} /> : <></>}
            {state.step == 2 ? <StepTwoNewAlert /> : <></>}
          </CustomBox> }
        <CustomBox sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          {false ? (
            <Button variant="primary" onClick={() => { }} title='Volver al Inicio' />
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
