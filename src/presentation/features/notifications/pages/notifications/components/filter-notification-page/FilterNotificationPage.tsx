import React, { useEffect, useMemo, useRef, useState } from "react"
import { useNotificationFilterOptions } from "../../../../hooks/useNotificationFilterOptions";
import type { SelectOption } from "../../../../../../components/ui/inputs/multiselect/multiselect.interface";
import { toSelectOption } from "../../../../mappers/filterNotificationMapper";
import { arraysEqual } from "../../../../../../utils/arrayToEquals";
import CustomModal from "../../../../../../components/ui/modal/modal.component";
import ProfileMultiSelect from "../../../../../../components/widgets/multiselect-profile/MultiSelectProfile";
import CustomMultiselect from "../../../../../../components/ui/inputs/multiselect/multiselect.component";
import { useProfileFilterOptions } from "../../../../../profiles/hooks/useProfileFilterOptions";
import Loading from "../../../../../../components/ui/loading";


export interface IFilterNotificationResult {
  profileIds: string[]
  status: string[]
  notificationsType: string[];
}

interface FilterNotificationsPageProps {
  open: boolean
  initialFilters: IFilterNotificationResult
  onOk: (filters: IFilterNotificationResult) => void
  onCancel: () => void
}



export const FilterNotificationPage: React.FC<FilterNotificationsPageProps> = ({
  open,
  initialFilters,
  onOk,
  onCancel,
}) => {
  const { resultState, resultType, loading } = useNotificationFilterOptions({
    stateFilters:{ forUpdate: true } 
  })
  const { profiles: profileFilters, loading: loadingProfiles } = useProfileFilterOptions()

  const selectItemsStatuses: SelectOption[] = useMemo(
    () => resultState.map(toSelectOption),
    [resultState]
  )

  const selectItemsTypes: SelectOption[] = useMemo(
    () => resultType.map(toSelectOption),
    [resultType]
  )

  const [profileNames, setProfileNames] = useState<string[]>([])

  const [profileIds, setProfileIds] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<SelectOption[]>([])
  const [selectedTypes, setSelectedTypes] = useState<SelectOption[]>([])

  
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

    const nextTypes = selectItemsTypes.filter(o => initialFilters.notificationsType.includes(String(o.id)))
   
    setSelectedTypes(prev => {
      const prevIds = prev.map(x => String(x.id))
      const nextIds = nextTypes.map(x => String(x.id))
      return arraysEqual(prevIds, nextIds) ? prev : nextTypes
    });
  }, [
    open,
    loading,
    loadingProfiles,
    selectItemsStatuses,
    selectItemsTypes,
    profileFilters,
    initialFilters,      
  ])

  return (
    <CustomModal
      title="Filtrar notificaciones"
      labelOk="Aplicar"
      open={open}
      onClose={onCancel}
      disabled={loading || loadingProfiles}
      onOk={() =>{
        onOk({
          profileIds,
          status: selectedStatuses.map(s => String(s.id)),
          notificationsType: selectedTypes.map(t => String(t.id))
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
      <CustomMultiselect
        key={open ? "open-type-notifications" : "closed-type-notifications"}
        multiple
        loading={loading}
        label="Tipo de notificación"
        options={selectItemsTypes}
        value={selectedTypes}
        onChange={(_e: any, vals: SelectOption[]) => setSelectedTypes(vals)}
      />
    </CustomModal>
  )
}
