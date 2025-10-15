import type { IFilter } from "../../../../domain/entities/IFilter";
import type { SelectOption } from "../../../components/ui/inputs/multiselect/multiselect.interface";

export const toSelectOption = (filter: IFilter): SelectOption=>{
   
    const SelectItem: SelectOption = {
        id: filter.id,
        name: filter.description
    }

    return SelectItem;
}