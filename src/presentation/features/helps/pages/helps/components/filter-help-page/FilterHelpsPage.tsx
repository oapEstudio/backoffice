import React, { useEffect } from "react"
import { CustomModal } from "../../../../../../components/ui/modal/modal.component";
import { arraysEqual } from "../../../../../../utils/arrayToEquals";
import type { SelectOption } from "../../../../../../components/ui/inputs/multiselect/multiselect.interface";
import CustomMultiselect from "../../../../../../components/ui/inputs/multiselect/multiselect.component";
import ProfileMultiSelect from "../../../../../../components/widgets/multiselect-profile/MultiSelectProfile";
import Loading from "../../../../../../components/ui/loading";
import { useFilterHelpsPage } from "../../../../hooks/useFilterHelpsPage";

export interface IFilterHelpsResult {
  profileIds: string[]
  status: string[]
  helpType: string[];
}

interface FilterHelpPageProps {
  open: boolean
  initialFilters: IFilterHelpsResult
  onOk: (filters: IFilterHelpsResult) => void
  onCancel: () => void
}

export const FilterHelpsPage: React.FC<FilterHelpPageProps> = ({
  open,
  initialFilters,
  onOk,
  onCancel,
}) => {

const {
  selectItemsStatuses,
  selectItemsTypes,
  loading,
  loadingProfiles,
  profileNames,
  profileIds,
  selectedStatuses,
  selectedTypes,
  setProfileNames,
  setProfileIds,
  setSelectedStatuses,
  setSelectedTypes,
} = useFilterHelpsPage({ 
  open, 
  initialFilters 
});

  return (
    <CustomModal
      title="Filtrar"
      labelOk="Aceptar"
      open={open}
      onClose={onCancel}
      disabled={loading || loadingProfiles}
      onOk={() => {
        onOk({
          profileIds,
          status: selectedStatuses.map(s => String(s.id)),
          helpType: selectedTypes.map(t => String(t.id))
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
        key={open ? "open-type-helps" : "closed-type-help"}
        multiple
        loading={loading}
        label="Tipo de documento"
        options={selectItemsTypes}
        value={selectedTypes}
        onChange={(_e: any, vals: SelectOption[]) => setSelectedTypes(vals)}
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
