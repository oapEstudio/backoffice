import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import type { IModalAddElementFormValues } from '../../modal-add-element/ModalAddElement';
import Typography from '@mui/material/Typography';
import CustomTextInput from '../../../../../../../components/ui/inputs/text-input/text-input.component';
import FileDropzone from '../../../../../../../components/ui/file-drop-zone/FileDropzone';




type Props = {
  file: File | Blob;     
  height?: number;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
};

export function VideoPlayer({
  file,
  height,
  controls = true,
  autoPlay = true,
  muted = true,
}: Props) {

    const videoRef = useRef<HTMLVideoElement | null>(null);

  
    const mime = useMemo(() => {

        const t = (file as File)?.type?.trim();

        if (t) return t; 

        
        const name = (file as File)?.name || "";
        const ext = name.split(".").pop()?.toLowerCase();

        if (ext === "mp4") return "video/mp4";
        if (ext === "webm") return "video/webm";
        if (ext === "ogv" || ext === "ogg") return "video/ogg";
        
        return "video/mp4";

    }, [file]);

  const src = useMemo(() => URL.createObjectURL(file), [file]);

  useEffect(() => {

    const v = videoRef.current;
    if (!v) return;

    
    v.src = src;
    v.load();

    
    const tryPlay = async () => {
      try {
        await v.play();
      } catch {
        console.log("No se pudo reproducir el video!!")        
      }
    };
    if (autoPlay) tryPlay();

    return () => {
      v.pause();
      v.removeAttribute("src");
      v.load();
      URL.revokeObjectURL(src);
    };
  }, [src, autoPlay]);

  const [err, setErr] = useState<string | null>(null);

  return (
    <div>
      <video
        ref={videoRef}
        width="100%"
        height={height && height > 0 ? height : 50}
        controls={controls}
        muted={muted}       
        playsInline         
        preload="metadata"
        onCanPlay={() => setErr(null)}
        onError={() => {
          const v = videoRef.current;
          const mediaErr = v?.error;
          
          let msg = "Error reproduciendo el video.";

          if (mediaErr) {
            
            msg += ` Código: ${mediaErr.code}`;
          }
          setErr(msg + ` MIME: ${mime}`);
        }}
        
      >
        <source src={src} type={mime} />
        Tu navegador no soporta la reproducción de video.
      </video>
      {err && (
        <small style={{ color: "crimson", display: "block", marginTop: 6 }}>
          {err}
        </small>
      )}
    </div>
  );
}

export const VideoFields = () => {
 const { control, formState: { errors } } = useFormContext<IModalAddElementFormValues>();

  return (
    <>
      <Controller
        name="file"
        control={control}
       rules={{
          validate: (v: File | undefined) => {
            if (!v) return 'Debes adjuntar un archivo';
            if (!v.type?.startsWith('video/')) return 'El archivo debe ser un video (mp4/webm/ogg)';
            return true;
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <>
             <FileDropzone
                multiple={false}
                accept="video/*"
                value={field.value ? [field.value] : []}
                onFiles={(files) => field.onChange(files[0])}
                helperText="Formatos típicos: MP4, WebM, Ogg. Máx 50MB"
             />
            {error && <Typography color="error" variant="caption">{error.message}</Typography>}
          </>
        )}
      />
      <Controller
        name="height"
        control={control}
        rules={{ required: 'El height es obligatorio' }}
        render={({ field }) => (
          <CustomTextInput
            {...field}
            label="HEIGHT"
            type="number"
            error={!!errors.height}
            helperText={errors.height?.message}
          />
        )}
      />
    </>
  );
}
