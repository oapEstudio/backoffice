import { ContainerPage } from "../../../../components/containers/container-page/ContainerPage";
import { HELP, NEW_DOCUMENT } from "../../../../router/routes";
import { FormProvider } from "react-hook-form";
import StepperWrapperBackOfficeDefault from "../../../../components/ui/step/stepper-wrapper-backoffice-default";
import StepNavigationBackOffice from "../../../../components/ui/step/step-navigation-backoffice";
import { CustomBox } from "../../../../components/ui/box/CustomBox";
import Button from "../../../../components/ui/button/button.component";
import { eStep } from "./reducers/ActionStepReducer";
import { ActionStep } from "../../shared/components/action-step/ActionStep";
import { useNewDocumentPage } from "./hooks/useNewDocumentPage";
import Loading from "../../../../components/ui/loading";
import StepTwoNewAlert from "./components/StepTwoNewDocument/StepTwoNewDocument";
import { StepOneNewDocument } from "./components/StepOneNewDocument/StepOneNewDocument";
import StepTwoNewDocument from "./components/StepTwoNewDocument/StepTwoNewDocument";


export const NewDocumentPage = () => {

  const { contentStepRef, form, navSteps, state, onSubmit, handleBack, handleNext, creating, selectItemsStatuses, selectItemsDocumentType, leftSeedProfiles, isLoadingProfiles, isLoadingStatus, isLoadingDocumentTypes, isStepValid } = useNewDocumentPage();

  return (
    <ContainerPage description="NewSectionPage" title={`${HELP.title} - ${NEW_DOCUMENT.title}`} titleSEO='Gestión de ayuda - Alta documento'>
      <div ref={contentStepRef} />
      <FormProvider {...form}>
        <StepperWrapperBackOfficeDefault width='40%'>
          <StepNavigationBackOffice steps={navSteps} />
        </StepperWrapperBackOfficeDefault>
        
        {creating || isLoadingStatus || isLoadingDocumentTypes ? 
           <CustomBox sx={{ p: '0 4rem', minHeight: 300, paddingTop: '10rem' }}>
              <center><Loading /></center> 
          </CustomBox>
        :
          <CustomBox sx={{ p: '0 4rem', minHeight: 300, paddingTop: '2rem' }}>
            {state.step == 1 ? <StepOneNewDocument selectItemsStatuses={selectItemsStatuses} selectItemsDocumentType={selectItemsDocumentType}  /> : <></>}
            {state.step == 2 ? <StepTwoNewDocument leftSeedProfiles={leftSeedProfiles} isLoadingProfiles={isLoadingProfiles} /> : <></>}
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
