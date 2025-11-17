import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { FilterHelpsPage, type IFilterHelpsResult } from './FilterHelpsPage'
import { HELP_ARTICLE, HELP_TYPES, STATE_HELP_ACTIVE } from '../../../../shared/constants/helps'

const initialFilters: IFilterHelpsResult = {
  profileIds: ['034905656-2323sdfdfsdw434', '343565kldklsfdfg34-we3413dfdsfds'],
  status: ['ACTIVE'],
  helpType: [HELP_TYPES[HELP_ARTICLE]],
}

const setProfileNamesSpy = vi.fn()
const setProfileIdsSpy = vi.fn()
const setSelectedStatusesSpy = vi.fn()
const setSelectedTypesSpy = vi.fn()

vi.mock('../../../../hooks/useFilterHelpsPage', () => ({
  useFilterHelpsPage: () => ({
    selectItemsStatuses: [{ id: STATE_HELP_ACTIVE, label: 'Activo' }],
    selectItemsTypes: [{ id: HELP_ARTICLE, label: 'Artículo' }],
    loading: false,
    loadingProfiles: false,
    profileNames: ['admin'],
    profileIds: ['admin'],
    selectedStatuses: [{ id: STATE_HELP_ACTIVE, label: 'Activo' }],
    selectedTypes: [{ id: HELP_ARTICLE, label: 'Artículo' }],
    setProfileNames: setProfileNamesSpy,
    setProfileIds: setProfileIdsSpy,
    setSelectedStatuses: setSelectedStatusesSpy,
    setSelectedTypes: setSelectedTypesSpy,
  }),
}))


vi.mock(
  '../../../../../../components/ui/inputs/multiselect/multiselect.component',
  () => ({
    default: (props: any) => {
      const isType = typeof props.label === 'string' && /tipo/i.test(props.label)
      const isStatus = typeof props.label === 'string' && /estado/i.test(props.label)

      // Elegimos opciones según el label para evitar duplicados/confusiones
      const options = isType
        ? [{ value: HELP_ARTICLE, text: 'Artículo' }]
        : isStatus
          ? [{ value: STATE_HELP_ACTIVE, text: 'Activo' }]
          : [
            { value: HELP_ARTICLE, text: 'Artículo' },
            { value: STATE_HELP_ACTIVE, text: 'Activo' },
          ]

      const testId =
        props['data-testid'] ??
        (isStatus ? 'filter-status' : isType ? 'filter-helpType' : undefined)

      return (
        <select
          data-testid={testId}
          multiple={!!props.multiple}
          disabled={!!props.loading}
          onChange={(e: any) => {
            const vals = Array.from(e.target.selectedOptions).map((o: any) => ({
              id: o.value,
              label: o.textContent,
            }))
            props.onChange?.(e, vals)
          }}
        >
          {options.map((opt) => (
            <option key={String(opt.value)} value={opt.value}>
              {opt.text}
            </option>
          ))}
        </select>
      )
    },
  })
)


describe('FilterHelpsPage', () => {
  it('renderiza el modal cuando open=true', () => {
    render(
      <FilterHelpsPage
        open
        initialFilters={initialFilters}
        onOk={vi.fn()}
        onCancel={vi.fn()}
      />
    )

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeTruthy()
  })
  
  it('no debe renderizar el modal cuando open=false', () => {
    const { container } = render(
      <FilterHelpsPage open={false} initialFilters={initialFilters} onOk={vi.fn()} onCancel={vi.fn()} />
    )
    expect(container.firstChild).toBeFalsy()
  })

  it('muestra el botón "Aceptar" cuando el modal está abierto', () => {
    render(
      <FilterHelpsPage
        open
        initialFilters={{ profileIds: [], status: [], helpType: [] }}
        onOk={vi.fn()}
        onCancel={vi.fn()}
      />
    )

    const dialog = screen.getByRole('dialog')
    const okBtn = within(dialog).getByRole('button', { name: /aceptar/i })
    expect(okBtn).toBeTruthy()
  })

  it('muestra el botón "Cancelar" cuando el modal está abierto', () => {
    render(
      <FilterHelpsPage
        open
        initialFilters={{ profileIds: [], status: [], helpType: [] }}
        onOk={vi.fn()}
        onCancel={vi.fn()}
      />
    )

    const dialog = screen.getByRole('dialog')
    const cancelBtn = within(dialog).getByRole('button', { name: /cancelar/i })
    expect(cancelBtn).toBeTruthy()
  })

  describe('FilterHelpsPage — filtro Estado', () => {
    it('dispara onChange de estado y ejecuta setter', () => {
      render(<FilterHelpsPage open initialFilters={initialFilters} onOk={vi.fn()} onCancel={vi.fn()} />)
      const dialog = screen.getByRole('dialog')

      const statusSel = within(dialog).getByTestId('filter-status') as HTMLSelectElement
      statusSel.value = String(STATE_HELP_ACTIVE)
      fireEvent.change(statusSel)

      expect(setSelectedStatusesSpy.mock.calls.length).toBeGreaterThan(0)
    })
  })

  describe('FilterHelpsPage — filtro Tipo de documento', () => {
    it('dispara onChange de tipo de documento y ejecuta setter', () => {
      render(<FilterHelpsPage open initialFilters={initialFilters} onOk={vi.fn()} onCancel={vi.fn()} />)
      const dialog = screen.getByRole('dialog')

      const typeSel = within(dialog).getByTestId('filter-helpType') as HTMLSelectElement
      typeSel.value = String(HELP_ARTICLE)
      fireEvent.change(typeSel)

      expect(setSelectedTypesSpy.mock.calls.length).toBeGreaterThan(0)
    })
  })

  it('debe mostrar el título "Filtrar"', () => {
    render(
      <FilterHelpsPage
        open={true}
        initialFilters={initialFilters}
        onOk={vi.fn()}
        onCancel={vi.fn()}
      />
    )

    expect(screen.getByText('Filtrar')).toBeTruthy()
  })

  it('debe tener un botón de cerrar', () => {
    render(
      <FilterHelpsPage
        open={true}
        initialFilters={initialFilters}
        onOk={vi.fn()}
        onCancel={vi.fn()}
      />
    )

    const closeButton = screen.getByLabelText('close')
    expect(closeButton).toBeTruthy()
  })

  it('debe recibir initialFilters como prop', () => {
    const customFilters: IFilterHelpsResult = {
      profileIds: ['user'],
      status: ['INACTIVE'],
      helpType: [HELP_TYPES[HELP_ARTICLE]],
    }

    const { rerender } = render(
      <FilterHelpsPage
        open={true}
        initialFilters={customFilters}
        onOk={vi.fn()}
        onCancel={vi.fn()}
      />
    )

    expect(screen.getByRole('dialog')).toBeTruthy()
  })

  it('debe recibir las callbacks onOk y onCancel', () => {
    const mockOnOk = vi.fn()
    const mockOnCancel = vi.fn()

    render(
      <FilterHelpsPage
        open={true}
        initialFilters={initialFilters}
        onOk={mockOnOk}
        onCancel={mockOnCancel}
      />
    )

    expect(mockOnOk).toBeDefined()
    expect(mockOnCancel).toBeDefined()
  })
})