import StepTwoGeneric from "../../../../shared/components/StepTwoGeneric";

interface StepTwoNewDocumentProps {
  leftSeedProfiles: Array<{ id: string; name: string }>;
  isLoadingProfiles: boolean
}

const StepTwoNewDocument : React.FC<StepTwoNewDocumentProps> = ({
  leftSeedProfiles = [],
  isLoadingProfiles = true
}) => {
  return (
    <StepTwoGeneric nameLabel="Nombre del documento" profilesLabel="Seleccione los perfiles que podrán ver este documento" remountKey="open" leftSeedProfiles={leftSeedProfiles} isLoadingProfiles={isLoadingProfiles} />
  )
}

export default StepTwoNewDocument;