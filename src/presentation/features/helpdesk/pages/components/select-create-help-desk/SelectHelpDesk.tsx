
import { colors } from '../../../../../common/colors';
import { useMemo, useState, type ChangeEvent } from 'react';
import { CustomBox } from '../../../../../components/ui/box/CustomBox';
import CustomSelect from '../../../../../components/ui/inputs/select/select.component';
import type { SelectOption } from '../../../../../components/ui/inputs/select/select.interface';
import { toHelpDeskSelect } from '../../../mappers/helpDeskCreateMapper';
import type { IFilter } from '../../../../../../domain/entities/IFilter';

const styleCustomSelect = {
  '& .MuiOutlinedInput-root': { height: 36 },
  '& .MuiSelect-select, & .MuiOutlinedInput-input': {
    paddingTop: '8px',
    paddingBottom: '8px',
    color: 'white',
    border: 0,
    backgroundColor: colors.palette.primary.main,
    boxShadow: ' 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)'
  },
};

export const SelectCreateHelpDesk = () => {

  const result : IFilter[] = [
          { id: "section", description: "Nueva sección" , meta: {}},
          { id: "article", description: "Nuevo artículo" , meta: {}},
          { id: "document", description: "Nuevo documento" , meta: {}},
          { id: "hidden", description: "Cargar documento invisible", meta: {}},
  ];

  const [selectedHelpDeskType, setSelectedHelpDeskType] = useState('');

  const rows: SelectOption[] = useMemo(
    () => (result ?? []).map(p => toHelpDeskSelect(p)),
    [result]
  )

  return (
    <CustomBox sx={{ width: '200px' }}>
      <CustomSelect
        displayEmpty
        placeholder={'Crear item de ayuda'}
        size='small'
        sx={styleCustomSelect}
        value={selectedHelpDeskType}
        options={rows} />
    </CustomBox>
  )
}
