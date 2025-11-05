import { useState, useCallback, useContext } from 'react'
import { DependencyContext } from '../../../contexts/DependencyContext'
import type { IHelpCreateDto } from '../../../../application/dtos/IHelpCreateDto'

export function useCreateHelp() {
  const { createHelp } = useContext(DependencyContext)
  const [loading, setLoading] = useState(false)

  const create = useCallback(
    async (dto: IHelpCreateDto) => {
      setLoading(true)
      try {
        const newId = await createHelp.execute(dto);
        return newId
      } catch (err: any) {
        if (err instanceof Error) {
          throw new Error(`${err.message}`)
        }
        throw err;
      } finally {
        setLoading(false)
      }
    },
    [createHelp]
  )

  return { create, loading }
}
