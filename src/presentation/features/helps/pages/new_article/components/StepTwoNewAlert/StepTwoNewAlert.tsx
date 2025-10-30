import StepTwoGeneric from "../../../../shared/components/StepTwoGeneric";

interface StepTwoNewAlertProps {
  leftSeedProfiles: Array<{ id: string; name: string }>;
  isLoadingProfiles: boolean
}

const StepTwoNewAlert : React.FC<StepTwoNewAlertProps> = ({
  leftSeedProfiles = [],
  isLoadingProfiles = true
}) => {
  return (
    <StepTwoGeneric nameLabel="Nombre del artículo" profilesLabel="Seleccione los perfiles que podrán ver este artículo" remountKey="open" leftSeedProfiles={leftSeedProfiles} isLoadingProfiles={isLoadingProfiles} />
  )
}

export default StepTwoNewAlert;