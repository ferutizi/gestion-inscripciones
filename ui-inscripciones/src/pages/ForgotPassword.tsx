import { Box, Typography } from "@mui/material";
import CustomInput from "../components/CustomInput";
import FormButton from "../components/FormButton";
import LoginLayout from "../layouts/LoginLayout";
import { Link } from "react-router-dom";
import BackToLoginButton from "../components/BackToLoginButton";

export default function ForgotPassword() {

  return(
    <>
      <LoginLayout>
        <Box sx={{display: "flex", flexDirection: "column", gap: "1rem", width: "100%"}}>
          <BackToLoginButton />
          <Typography variant="customSubtitle">Olvidaste la contraseña?</Typography>
          <Typography
            color="#656565"
            fontFamily="Poppins, sans-serif"
            fontWeight={400}
            fontSize={16}
          >
            No te preocupes, nos pasa a todos. Ingresa tu correo electrónico a continuación para recuperar tu contraseña.
          </Typography>
          <CustomInput type="email" placeholder="ejemplo@gmail.com" label="Email"></CustomInput>
          <Link to="verify">
            <FormButton buttonText="Enviar" />
          </Link>
        </Box>
        <Box sx={{display: {xs: "none", md: "block"}}}>
          <img src="./src/media/forgot-password-img.png" alt="Descripción de la imagen" style={{ width: "100%", height: 'auto' }} />
        </Box>
      </LoginLayout>
    </>
  )
}