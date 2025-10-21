import React from "react";
import { styled } from "@mui/material/styles";
import { CopyIcon } from "../../../components/ui/icons";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { eToast, Toast } from "../../ui/toast/CustomToastService";

interface CopyUrlProps {
  url: string;
}

const WrapperContainerUrl = styled('div')({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
});

export const CopyUrlButton: React.FC<CopyUrlProps> = ({ url }) => {

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      Toast({ message: 'Link copiado', type: eToast.Info });
    } catch (err) {
      Toast({ message: 'Error al copiar la URL:', type: eToast.Error });
    }
  };

  return (
    <>
      <WrapperContainerUrl>
        <Tooltip title="Copiar URL" placement="top-start">
          <IconButton size="small" onClick={handleCopy}> 
            <CopyIcon/>
          </IconButton>
        </Tooltip>
      </WrapperContainerUrl>
    </>
  );
};
