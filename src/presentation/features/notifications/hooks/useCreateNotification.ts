import { useState, useCallback, useContext } from 'react'
import { DependencyContext } from '../../../contexts/DependencyContext'
import type { IProfileCreateDto } from '../../../../application/dtos/IProfileCreateDto'
import type { INotificationCreateDto } from '../../../../application/dtos/INotificationCreateDto'

export function useCreateNotification() {
  const { createNotification } = useContext(DependencyContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = useCallback(
    async (dto: INotificationCreateDto) => {
      setLoading(true)
      setError(null)
      try {
        const newId = await createNotification.execute(dto);
        return newId
      } catch (err: any) {
        setError(err.message || 'Error al crear la notificación')
        throw err
      } finally {
        setLoading(false)
      }
    },
    [createNotification]
  )

  return { create, loading, error }
}
