import { Box, Typography, FormControlLabel, Checkbox } from "@mui/material";
import CustomInput from "../components/CustomInput";
import FormButton from "../components/FormButton";
import theme from "../theme";
import GoogleButton from "../components/GoogleButton";
import { Link } from "react-router-dom";
import LoginLayout from "../layouts/LoginLayout";
import IniciaConHr from "../components/IniciaConHr";

export default function Register() {
  const {secondary, text} = theme.palette;

  return(
    <>
      <LoginLayout>
        <Box sx={{display: {xs: "none", md: "block"}}}>
          <img src="./src/media/register-img.png" alt="Descripción de la imagen" style={{ width: "100%", height: 'auto' }} />
        </Box>
        <Box sx={{display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%"}}>
          <Typography variant="customSubtitle">Registrate</Typography>
          <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem"}}>
            <CustomInput type="text" placeholder="Nombre" label="Nombre" />
            <CustomInput type="text" placeholder="Apellido" label="Apellido" />
          </Box>
          <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem"}}>
            <CustomInput type="email" placeholder="ejemplo@gmail.com" label="Email" />
            <CustomInput type="text" placeholder="Teléfono" label="Teléfono" />
          </Box>
          <CustomInput type="password" placeholder="Password" label="Password" />
          <CustomInput type="password" placeholder="Password" label="Password" />
          <Box sx={{display: "flex", alignItems: "center", width: "100%"}}>
            <FormControlLabel
              sx={{color: "#000"}}
              label="Acepto los"
              control={
                <Checkbox
                  name="SomeName"
                  value="SomeValue"
                />
              }
            />
            <Link to="/privacy-policies">
              <Typography component="span" sx={{color: secondary.light, cursor: "pointer"}}>Terminos y Política de privacidad</Typography>
            </Link>
          </Box>
          <FormButton buttonText="Crear cuenta" />
          <Typography component="p" sx={{color: text.primary, fontWeight: "bold", width: "100%", display: "flex", justifyContent: "center", gap: "8px"}}>
            ¿Ya tenés cuenta?
            <Link to="/login">
              <Typography component="span" sx={{color: secondary.light, cursor: "pointer"}}>Inicia Sesión</Typography>
            </Link>
          </Typography>
          <IniciaConHr />
          <GoogleButton />
        </Box>
      </LoginLayout>
    </>
  )
}