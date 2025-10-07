import * as React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';

import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';

import { DeleteActionIcon, ImageIcon, UploadFileIconn } from '../icons';
import { CustomStack } from '../stack/Stack';
import { CustomBox } from '../box/CustomBox';
import { Button } from '../button';

export interface ImageDropzoneProps {
  /** Si true, permite adjuntar varias imágenes */
  multiple?: boolean;
  /** Callback que recibe los archivos seleccionados/arrastrados */
  onFiles: (files: File[]) => void;
  /** Aceptados por el input (por defecto: solo imágenes) */
  accept?: string;
  /** Límite máximo de archivos cuando multiple=true (opcional) */
  maxFiles?: number;
  /** Alto del área de drop */
  height?: number | string;
  /** Deshabilitar interacción */
  disabled?: boolean;
  /** Valor controlado (para usar desde afuera) */
  value?: File[];
  /** Mostrar vista previa de imágenes (default true) */
  showPreview?: boolean;
  /** Texto auxiliar bajo el área */
  helperText?: React.ReactNode;
  /** URL de preview inicial (útil para edición) */
  initialPreviewUrl?: string;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  multiple = false,
  onFiles,
  accept = 'image/*',
  maxFiles,
  height = 180,
  disabled = false,
  value,
  showPreview = true,
  helperText,
  initialPreviewUrl,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [internalFiles, setInternalFiles] = useState<File[]>([]);

  const files = value ?? internalFiles;

  const setFiles = useCallback((next: File[]) => {
    if (!value) setInternalFiles(next);
    onFiles(next);
  }, [value, onFiles]);

  const pick = useCallback((incoming: File[]) => {
    // 1) solo imágenes
    const imgs = incoming.filter(f => f.type?.startsWith('image/'));
    // 2) si hay máximo
    let next = imgs;
    if (!multiple) next = imgs.slice(0, 1);
    if (multiple && maxFiles) next = imgs.slice(0, maxFiles);
    // 3) merge si multiple (para acumular)
    if (multiple) {
      const existing = files ?? [];
      const key = (f: File) => `${f.name}-${f.size}-${f.lastModified}`;
      const map = new Map(existing.map(f => [key(f), f]));
      for (const f of next) map.set(key(f), f);
      setFiles(Array.from(map.values()));
    } else {
      setFiles(next);
    }
  }, [files, multiple, maxFiles, setFiles]);

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    pick(Array.from(e.target.files ?? []));
    // limpiar valor para permitir re-seleccionar el mismo archivo
    e.target.value = '';
  }, [pick]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    if (disabled) return;
    pick(Array.from(e.dataTransfer.files ?? []));
  }, [disabled, pick]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    setDragOver(true);
  }, [disabled]);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const removeAt = useCallback((idx: number) => {
    const next = files.filter((_, i) => i !== idx);
    setFiles(next);
  }, [files, setFiles]);

  const previews = useMemo(() => {
    if (!showPreview) return [] as Array<{ file?: File; url: string; isInitial?: boolean }>;
    const fromFiles = files.map(f => ({ file: f, url: URL.createObjectURL(f), isInitial: false }));
    if (fromFiles.length === 0 && initialPreviewUrl) {
      return [{ url: initialPreviewUrl, isInitial: true }];
    }
    return fromFiles;
  }, [files, showPreview, initialPreviewUrl]);

  // liberar object URLs cuando cambian
  React.useEffect(() => {
    return () => {
      previews.forEach(p => URL.revokeObjectURL(p.url));
    };
  }, [previews]);

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
              ? 'Arrastrá y soltá imágenes aquí, o hacé click para seleccionar (múltiples)'
              : 'Arrastrá y soltá una imagen aquí, o hacé click para seleccionar'}
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
            icon={<ImageIcon />}
            title= {multiple ? 'Seleccionar imágenes' : 'Seleccionar imagen'}
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
            gap: 1.5,
          }}
        >
          {previews.map((p, idx) => (
            <CustomBox
              key={idx}
              sx={{
                position: 'relative',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                overflow: 'hidden',
                aspectRatio: '1 / 1',
                bgcolor: 'background.default',
              }}
            >
              <img
                src={p.url}
                alt={p.file ? p.file.name : `preview-${idx}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {!p.isInitial && (
                <IconButton
                  size="small"
                  aria-label={`Eliminar ${p.file?.name ?? ''}`}
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
              )}
            </CustomBox>
          ))}
        </CustomBox>
      )}
      </>
    </CustomStack>
  );
};

export default ImageDropzone;
