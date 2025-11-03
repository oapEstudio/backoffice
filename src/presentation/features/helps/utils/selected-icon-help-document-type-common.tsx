import { Typography } from "@mui/material";
import { DownloaddIcon, Visibility } from "../../../components/ui/icons";
import { colors } from "../../../common/colors";
import { HELP_DOCUMENT_DOWNLOAD, HELP_DOCUMENT_LINK, HELP_DOCUMENT_PDF } from "../shared/constants/helps";


export function selectedIconsHelpDocumentTypeCommon(id: string): React.ReactNode {

  switch (Number(id)) {
    case HELP_DOCUMENT_LINK: return <Typography sx={{
        fontWeight: 500,
        color: colors.grey800,
        fontSize: '0.9rem',
        }}
      >
      Explorar
    </Typography>;
    case HELP_DOCUMENT_DOWNLOAD: return <DownloaddIcon />; 
    case HELP_DOCUMENT_PDF: return <Visibility />;
  }
}