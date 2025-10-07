// presentation/components/widgets/table-filter-bar/TableFilterBar.tsx
import * as React from "react"
import { CustomStack } from "../../ui/stack/Stack"
import Button from "../../ui/button/button.component"
import { FilterIcon, QuitIconFiltes } from "../../ui/icons"

export interface TableFilterBarProps {
  onOpenFilter: () => void
  onClearFilters: () => void
  hasFilters: boolean
  leftActions?: React.ReactNode   // ej: botón "Crear"
  rightActions?: React.ReactNode  // opcional
}

export const TableFilterBar: React.FC<TableFilterBarProps> = ({
  onOpenFilter,
  onClearFilters,
  hasFilters,
  leftActions,
  rightActions
}) => (
  <CustomStack direction="row" spacing={2} alignItems="end" >
    <>
        {leftActions}
    </>
    <Button variant="secondary" title="Filtrar" onClick={onOpenFilter} icon={<FilterIcon />} />
    <>
        {hasFilters ? (
        <Button variant="secondary" title="Quitar filtros" onClick={onClearFilters} icon={<QuitIconFiltes />} />
        ) : null}
    </>
    <>
        {rightActions}
    </>
  </CustomStack>
)

export default TableFilterBar
