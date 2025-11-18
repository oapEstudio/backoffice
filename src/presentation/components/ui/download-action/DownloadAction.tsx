import { Tooltip, IconButton, Typography } from '@mui/material';
import React from 'react'
import { DownloaddIcon } from '../icons';
import { CustomBox } from '../box/CustomBox';
import { colors } from '../../../common/colors';


interface IDownloadActionProps {
    label: string;
    url: string;
}

export const DownloadAction: React.FC<IDownloadActionProps> = ({
    url,
    label,
}) => {

    const onAction = () => {
        const link = document.createElement('a');
        link.href = url;
        link.download = link.title || 'archivo';
        link.click();
    };

    return (
        <CustomBox sx={{ py: 2, display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${colors.divider}`, width: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{
                fontSize: '0.95rem',
                color: colors.palette.primary.main,
                padding: 0,
                margin: 0,
            }}>{label}
            </Typography>
            <Tooltip title='Descargar archivo' placement="top" arrow>
                <IconButton
                    color="primary"
                    size="small"
                    onClick={onAction}
                    aria-label="descargar">
                    <DownloaddIcon />
                </IconButton>
            </Tooltip>
        </CustomBox>
    )
}
