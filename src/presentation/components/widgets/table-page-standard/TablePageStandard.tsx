import React, { useCallback } from 'react'
import type { CustomTableProps } from '../../ui/table/table.interface'
import CustomTable from '../../ui/table/table.component'
import { ContainerPageGrid } from '../../containers/container-page-grid/ContainerPageGrid';
import type {IContainerPageProp} from '../../containers/container-page-grid/ContainerPageGrid';
import type { IPageParameters } from '../../../../application/common/IPaginatedResponse';

export interface ITablePageProps<T>

  extends Omit<IContainerPageProp, 'children'>,
    Pick<
      CustomTableProps,
      | 'columns'
      | 'data'
      | 'totalCount'
      | 'actions'
      | 'contextType'
    > {
       /** Parámetros de tabla controlados por el padre (paginación/orden/filters) */
      params: IPageParameters
      /** setState del padre para actualizar params */
      setParams: React.Dispatch<React.SetStateAction<IPageParameters>>
      /** Si el backend usa página 1-based. MUI es 0-based. Por defecto true. */
      pageIsOneBased?: boolean,
      messageEmpty?: string
    }

export function TablePageStandard<T>(props: ITablePageProps<T>) {
  const {
    // Props de ContainerPageGrid
    description,
    title,
    count,
    loading,
    filter,
    // Props de CustomTable
    columns,
    data,
    totalCount,
    actions,
    messageEmpty,
    contextType,
    params,
    setParams,
    pageIsOneBased = true,
  } = props;


  const handleChangePage = useCallback(
    (_: unknown, newPage: number) =>
      setParams(p => ({
        ...p,
        page: pageIsOneBased ? newPage + 1 : newPage,
      })),
    [setParams, pageIsOneBased]
  )

  const handleChangeRowsPerPage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setParams(p => ({
        ...p,
        pageSize: parseInt(e.target.value, 10),
        page: pageIsOneBased ? 1 : 0, 
      })),
    [setParams, pageIsOneBased]
  )

  const handleSort = useCallback(
    (colId: string, desc: boolean) =>
      setParams(p => ({
        ...p,
        sortBy: colId,
        sortDescending: desc,
        page: pageIsOneBased ? 1 : 0, 
      })),
    [setParams, pageIsOneBased]
  )


  const muiPage = pageIsOneBased ? (params.page ?? 1) - 1 : (params.page ?? 0)
  return (
    <ContainerPageGrid
      description={description}
      title={title}
      titleSEO={title}
      count={count}
      loading={loading}
      filter={filter}
    >
      <CustomTable
        columns={columns}
        data={data}
        page={muiPage}
        pageSize={params.pageSize}
        messageEmpty={messageEmpty}
        totalCount={totalCount}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        sortBy={params.sortBy ?? undefined}
        sortDescending={!!params.sortDescending}
        onRequestSort={handleSort}
        actions={actions}
        contextType={contextType}
      />
    </ContainerPageGrid>
  )
}

export default TablePageStandard
