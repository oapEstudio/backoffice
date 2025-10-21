import { ContainerPage } from "../../../../components/containers/container-page/ContainerPage";
import { HELP, NEW_ARTICLE } from "../../../../router/routes";
import { FormProvider, useForm } from "react-hook-form";
import StepperWrapperBackOfficeDefault from "../../../../components/ui/step/stepper-wrapper-backoffice-default";
import StepNavigationBackOffice from "../../../../components/ui/step/step-navigation-backoffice";
import { CustomBox } from "../../../../components/ui/box/CustomBox";
import Button from "../../../../components/ui/button/button.component";
import { eStep } from "./reducers/ActionStepReducer";
import { ActionStep } from "../../shared/components/action-step/ActionStep";
import { useNewArticlePage } from "./hooks/useNewArticlePage";
import Loading from "../../../../components/ui/loading";
import { StepOneNewAlert } from "./components/StepOneNewAlert/StepOneNewAlert";
import StepTwoNewAlert from "./components/StepTwoNewAlert/StepTwoNewAlert";


export const NewArticlePage = () => {

  const { contentStepRef, form, navSteps, state, onSubmit, handleBack, handleNext, creating, selectItemsStatuses, selectItemsSection } = useNewArticlePage();

  return (
    <ContainerPage description="NewSectionPage" title={`${HELP.title} - ${NEW_ARTICLE.title}`} titleSEO='Gestión de ayuda - Alta sección'>
      <div ref={contentStepRef} />
      <FormProvider {...form}>
        <StepperWrapperBackOfficeDefault width='40%'>
          <StepNavigationBackOffice steps={navSteps} />
        </StepperWrapperBackOfficeDefault>
        
        {creating ? 
           <CustomBox sx={{ p: '0 4rem', minHeight: 300, paddingTop: '10rem' }}>
              <center><Loading /></center> 
          </CustomBox>
        :
          <CustomBox sx={{ p: '0 4rem', minHeight: 300, paddingTop: '2rem' }}>
            {state.step == 1 ? <StepOneNewAlert selectItemsSection={selectItemsSection} selectItemsStatuses={selectItemsStatuses} /> : <></>}
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
              isValid={form.formState.isValid}
              isLast={false}
            />
          )}
        </CustomBox>
      </FormProvider>
    </ContainerPage>
  )
}
