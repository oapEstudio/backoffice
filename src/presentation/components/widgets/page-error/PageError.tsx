import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CustomBox } from "../../ui/box/CustomBox";
import { colors } from "../../../common/colors";
import { Button } from "../../ui/button";


interface PageErrorProps {
  cod: string;
  error: string;
  details: string;
  redirectPath: string;
}

export const PageError: React.FC<PageErrorProps> = ({
  cod,
  error,
  details,
  redirectPath = '/'
}) => {

  const navigate = useNavigate();

  return (
    <CustomBox sx={{
      display: "flex",
      flexDirection: 'column',
      alignItems: "center",
      justifyContent: "center",
      p: 8,
      mt: 10
    }}>
      <Typography variant="h1" color={colors.palette.primary.main} sx={{ fontSize: 100, maxWidth: 400, textAlign: 'center', fontWeight: 900 }}>
        {cod}
      </Typography>
      <Typography variant="h2" color={colors.palette.primary.main} sx={{ maxWidth: 400, textAlign: 'center', fontWeight: 400 }}>
        {error}
      </Typography>
      <Typography variant="h6" color={colors.grey800} sx={{ mt: 2, maxWidth: 400, textAlign: 'center', fontWeight: 400 }}>
        {details}
      </Typography>

      <CustomBox sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 8,
        gap: 2
      }}>
        <Button
          variant="primary"
          onClick={() => navigate(redirectPath)}
          title='Ir al inicio'
        />
      </CustomBox>
    </CustomBox>
  )
}
