import { useState, useCallback, useContext } from 'react'
import { DependencyContext } from '../../../contexts/DependencyContext'
import type { IProfileCreateDto } from '../../../../application/dtos/IProfileCreateDto'

export function useCreateProfile() {
  const { createProfile } = useContext(DependencyContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = useCallback(
    async (dto: IProfileCreateDto) => {
      setLoading(true)
      setError(null)
      try {
        const newId = await createProfile.execute(dto);
        return newId
      } catch (err: any) {
        setError(err.message || 'Error al crear perfil')
        throw err
      } finally {
        setLoading(false)
      }
    },
    [createProfile]
  )

  return { create, loading, error }
}
