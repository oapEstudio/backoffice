import { useState, useCallback, useContext } from 'react'
import { DependencyContext } from '../../../contexts/DependencyContext'
import type { IHelpCreateDto } from '../../../../application/dtos/IHelpCreateDto'

export function useCreateHelp() {
  const { createHelp } = useContext(DependencyContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = useCallback(
    async (dto: IHelpCreateDto) => {
      setLoading(true)
      setError(null)
      try {
        const newId = await createHelp.execute(dto);
        return newId
      } catch (err: any) {
        setError(err.message || 'Error al crear')
        throw err
      } finally {
        setLoading(false)
      }
    },
    [createHelp]
  )

  return { create, loading, error }
}
