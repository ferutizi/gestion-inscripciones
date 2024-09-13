import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CustomInput from "../components/CustomInput";
import FormButton from "../components/FormButton";
import LoginLayout from "../layouts/LoginLayout";
import { Link } from "react-router-dom";
import BackToLoginButton from "../components/BackToLoginButton";
import theme from "../theme";

export default function VerifyCode() {

  return(
    <>
      <LoginLayout>
        <Box sx={{display: "flex", flexDirection: "column", gap: "1rem", width: "100%"}}>
          <BackToLoginButton />
          <Typography variant="customSubtitle">Verificar Código</Typography>
          <Typography
            color="#656565"
            fontFamily="Poppins, sans-serif"
            fontWeight={400}
            fontSize={16}
          >
            Se ha enviado un codigo de verificación a tu correo electrónico
          </Typography>
          <CustomInput type="text" placeholder="xxx-xxx" label="Código de verificación"></CustomInput>
          <Typography component="p" sx={{color: theme.palette.text.primary, fontWeight: "bold", width: "100%", display: "flex", gap: "8px"}}>
            ¿No recibiste el código?
            <Link to="/register">
              <Typography component="span" sx={{color: theme.palette.secondary.light, cursor: "pointer"}}>Reenviar</Typography>
            </Link>
          </Typography>
          <Link to="/new-password">
            <FormButton buttonText="Verificar" />
          </Link>
        </Box>
        <Box sx={{display: {xs: "none", md: "block"}}}>
          <img src="./src/media/verify-img.png" alt="Descripción de la imagen" style={{ width: "100%", height: 'auto' }} />
        </Box>
      </LoginLayout>
    </>
  )
}