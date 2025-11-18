import type { IFilter } from "../../../../domain/entities/IFilter";
import type { SelectOption } from "../../../components/ui/inputs/select/select.interface";

export const toSelectOption = (filter: IFilter): SelectOption=>{
   
    const SelectItem: SelectOption = {
        value: filter.id,
        label: filter.description
    }

    return SelectItem;
}



