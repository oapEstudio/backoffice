import { useCallback, useContext, useState } from "react"
import { DependencyContext } from "../../../contexts/DependencyContext"

export function useDeleteMenu(){
    const { deleteMenu } = useContext(DependencyContext)
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState<string | null>(null)
    
      const deleteAsync = useCallback(
        async (id: string) => {
          setLoading(true)
          setError(null)
          try {
            
            const deleted = await deleteMenu.execute(id);

            return deleted;

          } catch (err: any) {
            setError(err.message || 'Error al eliminar el menu')
            throw err
          } finally {
            setLoading(false)
          }
        },
        [deleteMenu]
      )
    
      return { deleteAsync, loading, error }
}