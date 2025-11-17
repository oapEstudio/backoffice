import { render, screen, within, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import UpdateHelpProfile from './UpdateHelpProfile'

vi.mock('react-hook-form', () => ({
  FormProvider: ({ children }: any) => <>{children}</>,
  Controller: ({ render }: any) =>
    render({
      field: { value: [], onChange: vi.fn() },
      fieldState: { error: undefined },
    }),
}))

const onCancelSpy = vi.fn()
const handleSaveSpy = vi.fn()
const profileValidatorSpy = vi.fn(() => true)

vi.mock('../../../../hooks/useUpdateHelpProfileForm', () => ({
  useUpdateHelpProfileForm: () => ({
    form: {},                 
    control: {},              
    isValid: true,
    loading: false,
    onCancel: onCancelSpy,
    handleSave: handleSaveSpy,
    profileValidator: profileValidatorSpy,
  }),
}))

vi.mock('../../../../../../components/ui/modal/modal.component', () => ({
  __esModule: true,
  default: (props: any) => (
    <div role="dialog">
      <div>{props.title}</div>
      <div>{props.children}</div>
      <div>
        <button onClick={props.onCancel}>Cancelar</button>
        <button onClick={props.onOk} disabled={props.disabled}>
          Aceptar
        </button>
      </div>
    </div>
  ),
}))

vi.mock(
  '../../../../../../components/widgets/dual-profile-add-fetch/DualProfileAddFetch',
  () => ({
    __esModule: true,
    default: (props: any) => (
      <select
        data-testid="dual-profile"
        multiple
        onChange={(e: any) => {
          const ids = Array.from(e.target.selectedOptions).map((o: any) => o.value)
          props.onChange?.(ids)
        }}
      >
        {(props.initialLeftProfiles ?? []).map((p: any) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    ),
  })
)

vi.mock('../../../../../../components/ui/loading', () => ({
  __esModule: true,
  default: () => <span role="progressbar">loading</span>,
}))
vi.mock('../../../../../../components/ui/box/CustomBox', () => ({
  CustomBox: ({ children }: any) => <div>{children}</div>,
}))


const selectedHelpId = 'help-123'
const leftSeedProfiles = [
  { id: 'p1', name: 'Estacion' },
  { id: 'p2', name: 'Estacion II' },
]
const selectedProfiles = [{ id: 'p3', name: 'Estacion III' }]
const isLoadingProfiles = false

const onClose = vi.fn()
const onSaved = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()
})

describe('UpdateHelpProfile', () => {
  it('renderiza el modal cuando open=true', () => {
    render(
      <UpdateHelpProfile
        open
        isLoadingProfiles={isLoadingProfiles}
        helpId={selectedHelpId}
        leftSeedProfiles={leftSeedProfiles}
        selectedProfiles={selectedProfiles}
        onClose={onClose}
        onSaved={onSaved}
      />
    )

    expect(screen.getByRole('dialog')).toBeTruthy()
    expect(screen.getByText(/selección de perfil/i)).toBeTruthy()
  })

  it('muestra loader cuando isLoadingProfiles=true', () => {
    render(
      <UpdateHelpProfile
        open
        isLoadingProfiles={true}
        helpId={selectedHelpId}
        leftSeedProfiles={leftSeedProfiles}
        selectedProfiles={selectedProfiles}
        onClose={onClose}
        onSaved={onSaved}
      />
    )

    expect(screen.getByRole('progressbar')).toBeTruthy()
  })

  it('click en "Cancelar" llama a onCancel (hook) y NO a handleSave', () => {
    render(
      <UpdateHelpProfile
        open
        isLoadingProfiles={false}
        helpId={selectedHelpId}
        leftSeedProfiles={leftSeedProfiles}
        selectedProfiles={selectedProfiles}
        onClose={onClose}
        onSaved={onSaved}
      />
    )

    const dialog = screen.getByRole('dialog')
    const cancelBtn = within(dialog).getByRole('button', { name: /cancelar/i })
    fireEvent.click(cancelBtn)

    expect(onCancelSpy).toHaveBeenCalledTimes(1)
    expect(handleSaveSpy).not.toHaveBeenCalled()
  })

  it('click en "Aceptar" llama a handleSave del hook', () => {
    render(
      <UpdateHelpProfile
        open
        isLoadingProfiles={false}
        helpId={selectedHelpId}
        leftSeedProfiles={leftSeedProfiles}
        selectedProfiles={selectedProfiles}
        onClose={onClose}
        onSaved={onSaved}
      />
    )

    const dialog = screen.getByRole('dialog')
    const okBtn = within(dialog).getByRole('button', { name: /aceptar/i })
    fireEvent.click(okBtn)

    expect(handleSaveSpy).toHaveBeenCalledTimes(1)
  })

  it('DualProfileFetch recibe opciones y dispara onChange', () => {
    render(
      <UpdateHelpProfile
        open
        isLoadingProfiles={false}
        helpId={selectedHelpId}
        leftSeedProfiles={leftSeedProfiles}
        selectedProfiles={selectedProfiles}
        onClose={onClose}
        onSaved={onSaved}
      />
    )

    const dual = screen.getByTestId('dual-profile') as HTMLSelectElement

    const opt1 = within(dual).getByText('Estacion') as HTMLOptionElement
    const opt2 = within(dual).getByText('Estacion II') as HTMLOptionElement
    opt1.selected = true
    opt2.selected = true
    fireEvent.change(dual)

    expect(opt1.selected && opt2.selected).toBe(true)
  })
})
