import { useEffect, useMemo, useState } from "react";
import { toHelpDocumentTypeSelectCommon, toHelpSelect } from "../../mappers/helpCreateMapper";
import { useGetHelpsProfiles } from "./useGetHelpsProfiles";
import { useGetHelpDocumentType } from "./useGetHelpsDocumentType";
import { useGetHelpStatus } from "./useGetHelpsState";


type Profile = { id: string; name: string };

export function useHelpFilters() {
  const [parentIdForProfiles, setParentIdForProfiles] = useState<string | null>(null);
  const [leftSeedProfiles, setLeftSeedProfiles] = useState<Profile[]>([]);

  const { result: statuses, loading: isLoadingStatus } = useGetHelpStatus({
    stateFilters: { forCreate: true }
  });

  const { result: documentTypes, loading: isLoadingDocumentTypes } = useGetHelpDocumentType();

  const {
    result: profiles,
    loading: isLoadingProfiles,
    error: errorProfiles
  } = useGetHelpsProfiles(
    parentIdForProfiles ? { parentFilter: { parentId: parentIdForProfiles } } : undefined
  );

  const selectItemsStatuses = useMemo(
    () => statuses.map(toHelpSelect),
    [statuses]
  );

  const selectItemsDocumentType = useMemo(
    () => documentTypes.map(toHelpDocumentTypeSelectCommon),
    [documentTypes]
  );

  useEffect(() => {
    if (profiles && Array.isArray(profiles)) {
      setLeftSeedProfiles(profiles);
    } else if (!parentIdForProfiles) {
      setLeftSeedProfiles([]);
    }
  }, [profiles, parentIdForProfiles]);

  return {
    selectItemsStatuses,
    selectItemsDocumentType,
    leftSeedProfiles,
    isLoadingProfiles,
    errorProfiles,
    parentIdForProfiles,
    setParentIdForProfiles,
    isLoadingStatus,
    isLoadingDocumentTypes,
  };
}
