import { useState, useCallback, useContext } from 'react'
import { DependencyContext } from '../../../contexts/DependencyContext'
import type { ICreateDynamicPageDto } from '../../../../application/dtos/ICreateDynamicPageDto'

export function useCreateDynamicPages() {
  const { createDynamicPage } = useContext(DependencyContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = useCallback(
    async (dto: ICreateDynamicPageDto) => {
      setLoading(true)
      setError(null)
      try {
        const newId = await createDynamicPage.execute(dto);
        return newId
      } catch (err: any) {
        setError(err.message || 'Error al crear la pagina')
        throw err
      } finally {
        setLoading(false)
      }
    },
    [createDynamicPage]
  )

  return { create, loading, error }
}
