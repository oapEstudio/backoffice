
import { colors } from '../../../../../common/colors';
import { useMemo, useState, type ChangeEvent } from 'react';
import { CustomBox } from '../../../../../components/ui/box/CustomBox';
import CustomSelect from '../../../../../components/ui/inputs/select/select.component';
import type { SelectOption } from '../../../../../components/ui/inputs/select/select.interface';
import { toHelpSelect } from '../../../mappers/helpCreateMapper';
import { useNavigate } from 'react-router-dom';
import { HELP_SECTION } from '../../../shared/constants/helps';
import { NEW_SECTION } from '../../../../../router/routes';
import { useGetHelpType } from '../../../hooks/useGetHelpsType';

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


  const { result, loading } = useGetHelpType();
  const [selectedHelpDeskType, setSelectedHelpDeskType] = useState('');
  const navigate = useNavigate();

  const rows: SelectOption[] = useMemo(
    () => (result ?? []).map(p => toHelpSelect(p)),
    [result]
  )

  const handlerHelpDesks = (event: ChangeEvent<HTMLInputElement> | (Event & { target: { value: unknown; name: string; } })) => {
    setSelectedHelpDeskType(String(event.target.value));
    if(event.target.value == HELP_SECTION) navigate(NEW_SECTION.name);
    // if(event.target.value == NOTIFICATION_ALERT) navigate(NEW_ALERT.name);    
  };

  return (
    <CustomBox sx={{ width: '200px' }}>
      <CustomSelect
        displayEmpty
        placeholder={'Crear item de ayuda'}
        size='small'
        sx={styleCustomSelect}
        value={selectedHelpDeskType}
        onChange={handlerHelpDesks}
        options={rows} />
    </CustomBox>
  )
}
