import React, { useState } from 'react'
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Stack
} from '@mui/material'
import CustomModal from '../../../../components/ui/modal/modal.component'
import { ContainerPage } from '../../../../components/containers/container-page/ContainerPage'
import { CustomBox } from '../../../../components/ui/box/CustomBox'
import { Button } from '../../../../components/ui/button'
import { CustomStack } from '../../../../components/ui/stack/Stack'
import { ContainerLeft } from './components/container-left/ContainerLeft'
import { ContainerRight } from './components/container-right/ContainerRight'

type ComponentType = 'Button' | 'Slider' | 'Accordion'

interface ComponentInstance {
  type: ComponentType
  props: Record<string, any>
}

export const NewDynamicPagePage: React.FC = () => {
  // stacks: cada fila es un array de instancias configuradas
  const [stacks, setStacks] = useState<ComponentInstance[][]>([])
 
  // Modal control y fase
  const [openModal, setOpenModal] = useState(false)
  const [phase, setPhase] = useState<'select' | 'config'>('select')
 
  // Para saber a qué stack añadimos
  const [currentStackIdx, setCurrentStackIdx] = useState<number | null>(null)
 
  // Datos temporales en modal
  const [pendingType, setPendingType] = useState<ComponentType>('Button')
  const [pendingProps, setPendingProps] = useState<Record<string, any>>({})

  // 1) Añadir un nuevo stack vacío
  const handleAddStack = () => {
    setStacks(prev => [...prev, []])
  }

  // 2) Abrir modal en fase de selección
  const handleOpenModal = (stackIdx: number) => {
    setCurrentStackIdx(stackIdx)
    setPhase('select')
    setPendingType('Button')
    setPendingProps({})
    setOpenModal(true)
  }

  // 3) Confirmar selección de tipo → pasar a fase de configuración
  const handleSelectType = () => {
    setPhase('config')
    // Inicializar props por defecto según tipo
    switch (pendingType) {
      case 'Button':
        setPendingProps({ label: 'Botón', valueClick: 'https://paginamock.ypf.com' })
        break
      case 'Slider':
        setPendingProps({ min: 0, max: 100, defaultValue: 50 })
        break
      case 'Accordion':
        setPendingProps({ title: 'Título', content: 'Contenido...' })
        break
    }
  }

  // 4) Confirmar configuración → añadir al stack
  const handleConfirmAdd = () => {
    if (currentStackIdx === null) return
    const instance: ComponentInstance = {
      type: pendingType,
      props: pendingProps
    }
    setStacks(prev => {
      const copy = [...prev]
      copy[currentStackIdx] = [...copy[currentStackIdx], instance]
      return copy
    })
    setOpenModal(false)
  }

  return (
    <ContainerPage
      description="NewDynamicPage"
      title="Construcción de página dinámica"
    >
      <CustomBox display="flex" height="100vh">
        {/* IZQUIERDA */}
       <ContainerLeft handleAddStack={handleAddStack} />

        {/* DERECHA */}
       <ContainerRight stacks={stacks} handleOpenModal={handleOpenModal} />

        {/* Modal de selección y configuración */}
        <CustomModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          title={phase === 'select'
            ? 'Seleccionar tipo de componente'
            : `Configurar ${pendingType}`}
          maxWidth="sm"
          onCancel={() => setOpenModal(false)}
          onOk={phase === 'select' ? handleSelectType : handleConfirmAdd} disabled={false}        >
          {phase === 'select' ? (
            // Fase 1: elegir tipo
            <FormControl fullWidth>
              <InputLabel id="comp-select-label">Componente</InputLabel>
              <Select
                labelId="comp-select-label"
                value={pendingType}
                label="Componente"
                onChange={e =>
                  setPendingType(e.target.value as ComponentType)
                }
              >
                <MenuItem value="Button">Button</MenuItem>
                <MenuItem value="Slider">Slider</MenuItem>
                <MenuItem value="Accordion">Accordion</MenuItem>
              </Select>
            </FormControl>
          ) : (
            // Fase 2: formularios según el tipo elegido
            <>
              {pendingType === 'Button' && (
                <>
                    <TextField
                        fullWidth
                        label="Label"
                        value={pendingProps.label}
                        onChange={e =>
                            setPendingProps({ ...pendingProps, label: e.target.value })
                        }
                    />
                    <TextField
                        fullWidth
                        label="Link redireccion"
                        value={pendingProps.valueClick}
                        onChange={e =>
                            setPendingProps({ ...pendingProps, valueClick: e.target.value })
                        }
                    />

                </>
              )}
              {pendingType === 'Slider' && (
                <CustomStack spacing={2}>
                  <TextField
                    type="number"
                    label="Mínimo"
                    value={pendingProps.min}
                    onChange={e =>
                      setPendingProps({
                        ...pendingProps,
                        min: Number(e.target.value)
                      })
                    }
                  />
                  <TextField
                    type="number"
                    label="Máximo"
                    value={pendingProps.max}
                    onChange={e =>
                      setPendingProps({
                        ...pendingProps,
                        max: Number(e.target.value)
                      })
                    }
                  />
                  <TextField
                    type="number"
                    label="Valor por defecto"
                    value={pendingProps.defaultValue}
                    onChange={e =>
                      setPendingProps({
                        ...pendingProps,
                        defaultValue: Number(e.target.value)
                      })
                    }
                  />
                </CustomStack>
              )}
              {pendingType === 'Accordion' && (
                <CustomStack spacing={2}>
                  <TextField
                    fullWidth
                    label="Título"
                    value={pendingProps.title}
                    onChange={e =>
                      setPendingProps({
                        ...pendingProps,
                        title: e.target.value
                      })
                    }
                  />
                  <TextField
                    fullWidth
                    multiline
                    label="Contenido"
                    value={pendingProps.content}
                    onChange={e =>
                      setPendingProps({
                        ...pendingProps,
                        content: e.target.value
                      })
                    }
                  />
                </CustomStack>
              )}
            </>
          )}
        </CustomModal>
      </CustomBox>
    </ContainerPage>
  )
}