import { Box, Stack, InputLabel, Typography } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import Required from "../required/required.component";
import { colors } from "../../../common/colors";
import { PALETTE_COLORS_ELEMENTS } from "../../../common/palette-colors-elements";

interface CustomColorPickerProps {
    label?: string;
    required?: boolean;
    value: string;
    onChange: (color: string) => void;
    palette?: string[];
    allowCustom?: boolean;
}

export const CustomColorPicker: React.FC<CustomColorPickerProps> = ({
    label,
    required,
    value,
    onChange,
    palette = PALETTE_COLORS_ELEMENTS,
    allowCustom = true,
}) => {
    return (
        <Stack direction="column" spacing={1}>

            {label && (
                <InputLabel>
                    {label}
                    {required && <Required value="*" />}
                </InputLabel>
            )}

            <Stack direction="row" spacing={1} flexWrap="wrap">
                {palette.map((color) => (
                    <Box
                        key={color}
                        onClick={() => onChange(color)}
                        sx={{
                            width: 28,
                            height: 28,
                            borderRadius: "6px",
                            cursor: "pointer",
                            background: color,
                            border: value === color ? "2px solid #000" : "1px solid #ccc",
                            transition: "0.2s",
                            marginBottom: '30px',
                            "&:hover": {
                                opacity: 0.8,
                            },
                        }}
                    />
                ))}
            </Stack>

            {allowCustom && (
                <>
                <Typography color={colors.grey500} sx={{ paddinTop: '30px' }}>    

                Color personalizado (opcional)
                </Typography>
                <MuiColorInput
                    format="hex"
                    value={value}
                    onChange={onChange}
                    sx={{ mt: 1, maxWidth: 140 }}
                /></>
            )}
        </Stack>
    );
};
