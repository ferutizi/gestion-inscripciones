import { Box, Typography, FormControlLabel, Checkbox } from "@mui/material";
import CustomInput from "../components/CustomInput";
import FormButton from "../components/FormButton";
import theme from "../theme";
import GoogleButton from "../components/GoogleButton";
import { Link } from "react-router-dom";
import LoginLayout from "../layouts/LoginLayout";
import IniciaConHr from "../components/IniciaConHr";

export default function Login() {
  const {secondary, text} = theme.palette;

  return(
    <>
      <LoginLayout>
        <Box sx={{display: "flex", flexDirection: "column", gap: "1rem", width: "100%"}}>
          <Typography variant="customSubtitle" >Inicio de sesión</Typography>
          <CustomInput type="email" placeholder="ejemplo@gmail.com" label="Email"></CustomInput>
          <CustomInput type="password" placeholder="Password" label="Password"></CustomInput>
          <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
            <FormControlLabel
              sx={{color: "#000"}}
              label="Recordarme"
              control={
                <Checkbox
                  name="remember"
                  value={false}
                />
              }
            />
            <Link to="/forgot-password">
              <Typography component="span" sx={{color: secondary.light, cursor: "pointer"}}>Olvidé mi contraseña</Typography>
            </Link>
          </Box>
          <FormButton buttonText="Iniciar Sesión"></FormButton>
          <Typography component="p" sx={{color: text.primary, fontWeight: "bold", width: "100%", display: "flex", justifyContent: "center", gap: "8px"}}>
            ¿No tenés cuenta?
            <Link to="/register">
              <Typography component="span" sx={{color: secondary.light, cursor: "pointer"}}>Registrate</Typography>
            </Link>
          </Typography>
          <IniciaConHr />
          <GoogleButton />
        </Box>
        <Box sx={{display: {xs: "none", md: "block"}}}>
          <img src="./src/media/login-img.png" alt="Descripción de la imagen" style={{ width: "100%", height: 'auto' }} />
        </Box>
      </LoginLayout>
    </>
  )
}