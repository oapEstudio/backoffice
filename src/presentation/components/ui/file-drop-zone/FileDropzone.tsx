import * as React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { DeleteActionIcon, UploadFileIconn } from '../icons';
import { CustomStack } from '../stack/Stack';
import { CustomBox } from '../box/CustomBox';
import { Button } from '../button';

export interface FileDropzoneProps {
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  accept?: string;
  maxFiles?: number;
  height?: number | string;
  disabled?: boolean;
  value?: File[];
  showPreview?: boolean;
  helperText?: React.ReactNode;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  multiple = false,
  onFiles,
  accept = '*/*',
  maxFiles,
  height = 180,
  disabled = false,
  value,
  showPreview = true,
  helperText,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [internalFiles, setInternalFiles] = useState<File[]>([]);

  const files = value ?? internalFiles;

  const setFiles = useCallback(
    (next: File[]) => {
      if (!value) setInternalFiles(next);
      onFiles(next);
    },
    [value, onFiles]
  );

  const pick = useCallback(
    (incoming: File[]) => {
      
      let next = incoming;
      if (!multiple) next = incoming.slice(0, 1);
      if (multiple && maxFiles) next = incoming.slice(0, maxFiles);

      
      if (multiple) {
        const existing = files ?? [];
        const key = (f: File) => `${f.name}-${f.size}-${f.lastModified}`;
        const map = new Map(existing.map(f => [key(f), f]));
        for (const f of next) map.set(key(f), f);
        setFiles(Array.from(map.values()));
      } else {
        setFiles(next);
      }
    },
    [files, multiple, maxFiles, setFiles]
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      pick(Array.from(e.target.files ?? []));
      e.target.value = '';
    },
    [pick]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOver(false);
      if (disabled) return;
      pick(Array.from(e.dataTransfer.files ?? []));
    },
    [disabled, pick]
  );

  const onDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (disabled) return;
      setDragOver(true);
    },
    [disabled]
  );

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const removeAt = useCallback(
    (idx: number) => {
      const next = files.filter((_, i) => i !== idx);
      setFiles(next);
    },
    [files, setFiles]
  );

  
  const previews = useMemo(() => {
    if (!showPreview) return [] as Array<{ file: File }>;
    return files.map(f => ({ file: f }));
  }, [files, showPreview]);

  const getExt = (name: string) => {
    const dot = name.lastIndexOf('.');
    if (dot === -1 || dot === name.length - 1) return '';
    return name.slice(dot + 1).toUpperCase().slice(0, 5); // corta extensiones raras
  };

  return (
    <CustomStack spacing={1.25}>
      <Paper
        variant="outlined"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        sx={{
          position: 'relative',
          height,
          borderStyle: 'dashed',
          borderColor: dragOver ? 'primary.main' : 'divider',
          bgcolor: disabled ? 'action.disabledBackground' : dragOver ? 'action.hover' : 'background.paper',
          outline: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          transition: 'background-color 150ms, border-color 150ms',
          pointerEvents: disabled ? 'none' : 'auto',
        }}
        role="button"
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        <CustomStack spacing={1} alignItems="center">
          <UploadFileIconn />
          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            {multiple
              ? 'Arrastrá y soltá archivos aquí, o hacé click para seleccionar (múltiples)'
              : 'Arrastrá y soltá un archivo aquí, o hacé click para seleccionar'}
          </Typography>

          <>
          {helperText ? (
            <Typography variant="caption" color="text.secondary">
              {helperText}
            </Typography>
          ) : null}
          </>

          <Button
            variant="secondary"
            onClick={() => inputRef.current?.click()}
            icon={<UploadFileIconn />}
            title={multiple ? 'Seleccionar archivos' : 'Seleccionar archivo'}
          />
        </CustomStack>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          hidden
          onChange={onInputChange}
        />
      </Paper>

      <>
        {showPreview && previews.length > 0 && (
            <CustomBox
            sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: 1.5,
            }}
            >
            {previews.map((p, idx) => {
                const name = p.file.name;
                const ext = getExt(name);
                return (
                <CustomBox
                    key={idx}
                    title={name}
                    sx={{
                    position: 'relative',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    overflow: 'hidden',
                    aspectRatio: '1 / 1',
                    bgcolor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 1,
                    }}
                >
                   
                    <CustomBox
                    sx={{
                        width: 48,
                        height: 64,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: '6px',
                        position: 'relative',
                        mb: 1,
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        bgcolor: 'background.paper',
                    }}
                    >
                    {ext || 'FILE'}
                  
                    <CustomBox
                        sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 12,
                        height: 12,
                        bgcolor: 'action.hover',
                        borderBottomLeftRadius: '4px',
                        }}
                    />
                    </CustomBox>

                    <Typography
                    variant="caption"
                    noWrap
                    sx={{ width: '100%', textAlign: 'center', px: 0.5 }}
                    >
                    {name}
                    </Typography>

                    <IconButton
                    size="small"
                    aria-label={`Eliminar ${name}`}
                    onClick={() => removeAt(idx)}
                    sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        bgcolor: 'rgba(0,0,0,0.45)',
                        color: '#fff',
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.65)' },
                    }}
                    >
                    <DeleteActionIcon />
                    </IconButton>
                </CustomBox>
                );
            })}
            </CustomBox>
        )}
      </>
    </CustomStack>
  );
};

export default FileDropzone;
