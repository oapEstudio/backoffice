import React, { useEffect, useMemo, useRef, useState } from "react"

import { toSelectOption } from "../../../../mappers/filterProfileMapper"

import { useProfileFilterOptions } from "../../../../hooks/useProfileFilterOptions"
import ProfileMultiSelect from "../../../../../../components/widgets/multiselect-profile/MultiSelectProfile"
import CustomMultiselect from "../../../../../../components/ui/inputs/multiselect/multiselect.component"
import CustomModal from "../../../../../../components/ui/modal/modal.component"
import type { SelectOption } from "../../../../../../components/ui/inputs/multiselect/multiselect.interface"
import { arraysEqual } from "../../../../../../utils/arrayToEquals"

export interface IFilterProfileResult {
  profileIds: string[]
  status: string[]
}

interface FilterProfilePageProps {
  open: boolean
  initialFilters: IFilterProfileResult
  onOk: (filters: IFilterProfileResult) => void
  onCancel: () => void
}



export const FilterProfilePage: React.FC<FilterProfilePageProps> = ({
  open,
  initialFilters,
  onOk,
  onCancel,
}) => {
  const { statuses, loading } = useProfileFilterOptions()

  
  const selectItemsStatuses: SelectOption[] = useMemo(
    () => statuses.map(toSelectOption),
    [statuses]
  )

  const [profileIds, setProfileIds] = useState<string[]>([])
  const [selectedStatuses, setSelectedStatuses] = useState<SelectOption[]>([])

  
  const wasOpen = useRef(false)
  useEffect(() => {
    const justOpened = open && !wasOpen.current;

    wasOpen.current = open

    if (!open || loading) return;
    
    if (!justOpened) return;

    const nextProfileIds = initialFilters.profileIds.map(String);

    setProfileIds(prev => (arraysEqual(prev, nextProfileIds) ? prev : nextProfileIds));

    const nextStatuses = selectItemsStatuses.filter(o =>
      initialFilters.status.includes(String(o.id))
    )
    setSelectedStatuses(prev => {
      
      const prevIds = prev.map(x => String(x.id))
      const nextIds = nextStatuses.map(x => String(x.id))
      return arraysEqual(prevIds, nextIds) ? prev : nextStatuses
    });
  }, [
    open,
    loading,
    selectItemsStatuses, 
    initialFilters,      
  ])

  return (
    <CustomModal
      title="Filtrar Perfiles"
      labelOk="Aplicar"
      open={open}
      onClose={onCancel}
      disabled={false}
      onOk={() =>
        onOk({
          profileIds: profileIds,
          status: selectedStatuses.map(o => String(o.id)),
        })
      }
      onCancel={onCancel}
      maxWidth="xs"
    >
      <ProfileMultiSelect
        remountKey={open ? "open-profiles" : "closed-profiles"}
        valueIds={profileIds}
        onChange={(ids) => {
          
          setProfileIds(prev => (arraysEqual(prev, ids) ? prev : ids))
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
