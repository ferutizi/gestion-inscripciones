import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CustomInput from "../components/CustomInput";
import FormButton from "../components/FormButton";
import LoginLayout from "../layouts/LoginLayout";
import { Link } from "react-router-dom";
import BackToLoginButton from "../components/BackToLoginButton";

export default function NewPassword() {

  return(
    <>
      <LoginLayout>
        <Box sx={{display: "flex", flexDirection: "column", gap: "1rem", width: "100%"}}>
          <BackToLoginButton />
          <Typography variant="customSubtitle">Genera la contraseña</Typography>
          <Typography
            color="#656565"
            fontFamily="Poppins, sans-serif"
            fontWeight={400}
            fontSize={16}
            sx={{textWrap: "wrap"}}
          >
            Tu anterior contraseña se reseteo. Por favor crea tu nueva contraseña.
          </Typography>
          <CustomInput type="password" placeholder="Nueva contraseña" label="Nueva contraseña"></CustomInput>
          <CustomInput type="password" placeholder="Confirmar contraseña" label="Confirmar contraseña"></CustomInput>
          <Link to="/">
            <FormButton sx={{backgroundColor: "#515DEF"}} buttonText="Generar contraseña" />
          </Link>
        </Box>
        <Box sx={{display: {xs: "none", md: "block"}}}>
          <img src="./src/media/new-password-img.png" alt="Descripción de la imagen" style={{ width: "100%", height: 'auto' }} />
        </Box>
      </LoginLayout>
    </>
  )
}