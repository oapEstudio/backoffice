import type { IMenu } from "../../../../domain/entities/IMenu";
import { ChildItem, FatherItem, ItemTree } from "../../../components/ui/tree-view/class/TreeItems";



export const toMenuItem = (data: IMenu): ItemTree => {
  const hasChildren = Array.isArray(data.children) && data.children.length > 0;

  if (hasChildren) {
    const parent = new FatherItem(data.id, data.name,data.orderIndex, data); 
    for (const child of data.children) {
      parent.add(toMenuItem(child));
    }
    return parent;
  }

  return new ChildItem(data.id, data.name,data.orderIndex, data);
};
