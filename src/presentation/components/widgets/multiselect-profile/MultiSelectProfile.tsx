import React, { useMemo } from "react"
import CustomMultiselect from "../../ui/inputs/multiselect/multiselect.component"
import type { SelectOption } from "../../ui/inputs/multiselect/multiselect.interface"
import type { IFilter } from "../../../../domain/entities/IFilter"
import { useProfileFilterOptions } from "../../../features/profiles/hooks/useProfileFilterOptions"

interface ProfileMultiSelectProps {

  valueIds: string[]
  onChange: (ids: string[], options: SelectOption[]) => void
  label?: string
  remountKey?: string
  disabled?: boolean
}

export const toSelectOption = (filter: IFilter): SelectOption=>{
   
    const SelectItem: SelectOption = {
        id: filter.id,
        name: filter.description
    }

    return SelectItem;
}

const ProfileMultiSelect: React.FC<ProfileMultiSelectProps> = ({
   valueIds,
  onChange,
  label = "Perfil",
  remountKey,
  disabled
}) => {
  const { profiles, loading } = useProfileFilterOptions()

  const options: SelectOption[] = useMemo(
    () => profiles.map(toSelectOption),
    [profiles]
  )

  const selectedOptions = useMemo(
    () => options.filter(o => valueIds.includes(String(o.name))),
    [options, valueIds]
  )

  return (
    <CustomMultiselect
      key={remountKey}
      multiple
      loading={loading}
      disabled={disabled}
      label={label}
      options={options}
      value={selectedOptions}
      onChange={(_e: any, vals: SelectOption[]) => {
        const ids = vals.map(v => String(v.name))
        onChange(ids, vals)
      }}
    />
  )
}

export default ProfileMultiSelect
