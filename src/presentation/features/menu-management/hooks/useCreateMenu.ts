import { useCallback, useContext, useState } from "react"
import { DependencyContext } from "../../../contexts/DependencyContext"
import type { IMenuCreateDto } from "../../../../application/dtos/IMenuCreateDto"

export function useCreateMenu(){
    const { createMenu } = useContext(DependencyContext)
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState<string | null>(null)
    
      const create = useCallback(
        async (dto: IMenuCreateDto) => {
          setLoading(true)
          setError(null)
          try {
            const newId = await createMenu.execute(dto);
            return newId
          } catch (err: any) {
            setError(err.message || 'Error al crear perfil')
            throw err
          } finally {
            setLoading(false)
          }
        },
        [createMenu]
      )
    
      return { create, loading, error }
}