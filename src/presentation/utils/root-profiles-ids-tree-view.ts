import type { IMenu } from "../../domain/entities/IMenu"
import type { ItemTree } from "../components/ui/tree-view/class/TreeItems"

export function getRoot(node?: ItemTree | null): ItemTree | null {
  if (!node) return null
  let cur: ItemTree | null = node
  while (cur?.getParent()) cur = cur.getParent()
  return cur
}

export function isRoot(node?: ItemTree | null): boolean {
  return !!node && !node.getParent();
}

export function getRootProfileIds(node?: ItemTree | null): string[] {
  const root = getRoot(node)
  const rootMenu = root?.obj as IMenu | undefined
  return rootMenu?.profiles?.map(p => p.id) ?? []
}