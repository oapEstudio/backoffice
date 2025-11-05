import React, { useState, useRef, useEffect, type ChangeEvent } from 'react';
import {
  Box,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
  InputAdornment,
  IconButton,
  FormHelperText,
  ClickAwayListener,
  InputLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Required from '../../../../../components/ui/required/required.component';
import { styles } from '../../../../../components/ui/inputs/styles';
export interface ICustomSearchSelect {
  value: string | number;
  required: boolean;
  onChange: (value: string | number) => void;
  onSearch?: (searchTerm: string) => void;
  options: any[];
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  helperText?: string;
  label?: string;
}
const CustomSearchSelect: React.FC<ICustomSearchSelect> = ({
  value,
  required,
  onChange,
  onSearch,
  options,
  placeholder = 'Buscar...',
  disabled = false,
  loading = false,
  error = false,
  helperText,
  label,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((option) => option.value === value)?.label || '';

  useEffect(() => {
    if (value && !showResults) {
      setSearchTerm(selectedLabel);
    }
  }, [value, selectedLabel, showResults]);

  useEffect(() => {
    if (!showResults || !onSearch) return;

    const timeoutId = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, showResults, onSearch]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowResults(true);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setShowResults(true);
    onChange('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleSelectOption = (optionValue: string | number, optionLabel: string) => {
    onChange(optionValue);
    setSearchTerm(optionLabel);
    setShowResults(false);
  };

  const handleFocus = () => {
    setShowResults(true);
    if (!value) {
      setSearchTerm('');
    }
    if (onSearch && !searchTerm) {
      onSearch('');
    }
  };

  const handleClickAway = () => {
    setShowResults(false);
    if (value) {
      setSearchTerm(selectedLabel);
    } else {
      setSearchTerm('');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Label superior si existe */}
      {label && (
        <InputLabel sx={styles.label}>
          {label}
          {required && <Required value="*" />}
        </InputLabel>
      )}

      <ClickAwayListener onClickAway={handleClickAway}>
        <Box sx={{ position: 'relative', width: '100%' }}>
          <TextField
            ref={inputRef}
            variant="outlined"
            fullWidth
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={handleFocus}
            placeholder={placeholder}
            disabled={disabled}
            error={error}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: '53px',
                backgroundColor: 'background.paper',
                '&:hover': {
                  '& > fieldset': {
                    borderColor: error ? 'error.main' : 'primary.main',
                  },
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {searchTerm && !loading && (
                    <IconButton
                      size="small"
                      onClick={handleClearSearch}
                      disabled={disabled}
                      edge="end"
                      sx={{ mr: 0.5 }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )}
                  {loading ? (
                    <CircularProgress size={20} sx={{ mr: 0.5 }} />
                  ) : (
                    <SearchIcon fontSize="small" sx={{ color: 'action.active', mr: 0.5 }} />
                  )}
                </InputAdornment>
              ),
            }}
          />

          {/* Resultados de búsqueda */}
          {showResults && !disabled && (
            <Paper
              elevation={8}
              sx={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                left: 0,
                right: 0,
                zIndex: 1300,
                maxHeight: '280px',
                overflow: 'auto',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 4 }}>
                  <CircularProgress size={28} />
                </Box>
              ) : options.length > 0 ? (
                <List disablePadding>
                  {options.map((option) => (
                    <ListItem key={option.value} disablePadding>
                      <ListItemButton
                        onClick={() => handleSelectOption(option.value, option.label)}
                        selected={value === option.value}
                        sx={{
                          py: 1.5,
                          px: 2,
                          '&.Mui-selected': {
                            backgroundColor: 'action.selected',
                            '&:hover': {
                              backgroundColor: 'action.hover',
                            },
                          },
                          '&:hover': {
                            backgroundColor: 'action.hover',
                          },
                        }}
                      >
                        <ListItemText
                          primary={option.label}
                          primaryTypographyProps={{
                            sx: {
                              fontSize: '0.875rem',
                              fontWeight: value === option.value ? 600 : 400,
                              color: 'text.primary',
                            },
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box sx={{ py: 4, px: 2, textAlign: 'center' }}>
                  <ListItemText
                    primary="No se encontraron resultados"
                    primaryTypographyProps={{
                      color: 'text.secondary',
                      fontSize: '0.875rem',
                    }}
                  />
                </Box>
              )}
            </Paper>
          )}
        </Box>
      </ClickAwayListener>

      {/* Helper text / Error message */}
      {helperText && (
        <FormHelperText error={error} sx={{ mx: 1.75, mt: 0.5 }}>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
};

export default CustomSearchSelect;