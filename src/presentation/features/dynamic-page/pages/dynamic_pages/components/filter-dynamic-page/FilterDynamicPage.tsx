import React, { useEffect, useMemo, useRef, useState } from "react"
import type { SelectOption } from "../../../../../../components/ui/inputs/multiselect/multiselect.interface";
import { arraysEqual } from "../../../../../../utils/arrayToEquals";
import CustomModal from "../../../../../../components/ui/modal/modal.component";
import ProfileMultiSelect from "../../../../../../components/widgets/multiselect-profile/MultiSelectProfile";
import CustomMultiselect from "../../../../../../components/ui/inputs/multiselect/multiselect.component";
import { useProfileFilterOptions } from "../../../../../profiles/hooks/useProfileFilterOptions";
import Loading from "../../../../../../components/ui/loading";
import { useDynamicPageFilterOptions } from "../../../../hooks/useDynamicPageFilterOptions";
import { toSelectOption } from "../../../../mappers/filterDynamicPageMapper";


export interface IFilterDynamicPageResult {
  profileIds: string[]
  status: string[]
}

interface FilterDynamicPagesPageProps {
  open: boolean
  initialFilters: IFilterDynamicPageResult
  onOk: (filters: IFilterDynamicPageResult) => void
  onCancel: () => void
}



export const FilterDynamicPagePage: React.FC<FilterDynamicPagesPageProps> = ({
  open,
  initialFilters,
  onOk,
  onCancel,
}) => {
  const { resultState, loading } = useDynamicPageFilterOptions({
    stateFilters:{ forUpdate: true } 
  })
  const { profiles: profileFilters, loading: loadingProfiles } = useProfileFilterOptions()

  const selectItemsStatuses: SelectOption[] = useMemo(
    () => resultState.map(toSelectOption),
    [resultState]
  )

  const [profileNames, setProfileNames] = useState<string[]>([])

  const [profileIds, setProfileIds] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<SelectOption[]>([])
 
  
  const wasOpen = useRef(false);
  
  useEffect(() => {
    const justOpened = open && !wasOpen.current;

    wasOpen.current = open

    if (!open || loading || loadingProfiles) return;
    
    if (!justOpened) return;

    const nextIds = (initialFilters.profileIds ?? []).map(s => String(s).toLowerCase());
    setProfileIds(prev => (arraysEqual(prev, nextIds) ? prev : nextIds));

    const idSet = new Set(nextIds);
    const derivedNames = profileFilters.map(p => ({ id: p.id, name: p.description }))
      .filter(o => idSet.has(String(o.id).toLowerCase()))
      .map(o => String(o.name));

    if (derivedNames.length > 0) {
      setProfileNames(prev => (arraysEqual(prev, derivedNames) ? prev : derivedNames));
    } else {
      setProfileNames([]);
    }

    const nextStatuses = selectItemsStatuses.filter(o => initialFilters.status.includes(String(o.id)))
   
    setSelectedStatuses(prev => {
      
      const prevIds = prev.map(x => String(x.id))
      const nextIds = nextStatuses.map(x => String(x.id))
      return arraysEqual(prevIds, nextIds) ? prev : nextStatuses
    });

    
  }, [
    open,
    loading,
    loadingProfiles,
    selectItemsStatuses,    
    profileFilters,
    initialFilters,      
  ])

  return (
    <CustomModal
      title="Filtrar paginas"
      labelOk="Aplicar"
      open={open}
      onClose={onCancel}
      disabled={loading || loadingProfiles}
      onOk={() =>{
        onOk({
          profileIds,
          status: selectedStatuses.map(s => String(s.id))
        })
      }}
      onCancel={onCancel}
      maxWidth="xs"
    >
      {loadingProfiles ? (
        <center><Loading /></center>
      ) : null}
      <ProfileMultiSelect
        remountKey={open ? "open-profiles" : "closed-profiles"}
        disabled={loadingProfiles}
        valueIds={profileNames}
        onChange={(ids, options) => {
       
          setProfileNames(prev => (arraysEqual(prev, ids) ? prev : ids))

          const nextIds = options.map(o => String(o.id).toLowerCase())

          setProfileIds(prev => (arraysEqual(prev, nextIds) ? prev : nextIds))
        }}
      />

      <CustomMultiselect
        key={open ? "open-status" : "closed-status"}
        multiple
        loading={loading}
        label="Estado"
        options={selectItemsStatuses}
        value={selectedStatuses}
        onChange={(_e: any, vals: SelectOption[]) => setSelectedStatuses(vals)}
      />      
    </CustomModal>
  )
}
