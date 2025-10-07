import React from 'react';
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { UploadToCloud } from '../../icons';

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const InputFileUpload: React.FC<{
  onClick?: () => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  title?: string;
  variant?: string;
}> = ({onClick, onChange,}) => {
  return (
    <Button
      onClick={onClick}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<UploadToCloud />}
    >
      ADJUNTAR ARCHIVO
      <VisuallyHiddenInput type="file" onChange={onChange} />
    </Button>
  );
};

export default InputFileUpload;