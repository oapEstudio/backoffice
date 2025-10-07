import { FatherItem, type ItemTree } from "../components/ui/tree-view/class/TreeItems";


type Dir = "up" | "down";


export function swapSibling(node: ItemTree, dir: Dir): boolean {

  const parent = node.getParent();

  if (!parent || !(parent instanceof FatherItem)) return false;

  const siblings = parent.getChildren(); 
  const idx = siblings.indexOf(node);

  if (idx === -1) return false;

  if (dir === "up") {

    if (idx === 0) return false;

    const prev = siblings[idx - 1];
    const aux = node.orden;
    node.orden = prev.orden;
    prev.orden = aux;

    return true;

} else {

    if (idx === siblings.length - 1) return false;

    const next = siblings[idx + 1];
    const aux = node.orden;

    node.orden = next.orden;
    next.orden = aux;

    return true;
  }
}
export function swapRoot(node: ItemTree, dir: Dir, roots: ItemTree[]): boolean {
  
  const idx = roots.indexOf(node)
  if (idx === -1) return false

  if (dir === "up") {
    if (idx === 0) return false
    const prev = roots[idx - 1]
    const aux = node.orden
    node.orden = prev.orden
    prev.orden = aux
    return true
  } else {
    if (idx === roots.length - 1) return false
    const next = roots[idx + 1]
    const aux = node.orden
    node.orden = next.orden
    next.orden = aux
    return true
  }
}
export function normalizeAndGetOrderPayload(node: ItemTree): {
  parentId: string;
  children: { id: string; orden: number }[];
} {

  const parent = node.getParent();

  if (!parent || !(parent instanceof FatherItem)) {
    throw new Error("Se esperaba un padre FatherItem");
  }

  const children = parent.getChildren(); 

  children.forEach((c, i) => { c.orden = i + 1; });

  return {
    parentId: String(parent.id),
    children: children.map(c => ({ id: String(c.id), orden: c.orden })),
  };
}

export function normalizeAndGetRootPayload(roots: ItemTree[]): { id: string; orden: number }[] {

  const sorted = [...roots].sort((a, b) => a.orden - b.orden)
  sorted.forEach((n, i) => { n.orden = i + 1 })
  return sorted.map(n => ({ id: String(n.id), orden: n.orden }))
}
