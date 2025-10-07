import type { IFilter } from "../../../../domain/entities/IFilter";
import type { SelectOption } from "../../../components/ui/inputs/select/select.interface";

export function toNotificationSelect(f: IFilter): SelectOption {
  return {
    label: f.description,
    value: f.id
  }
}