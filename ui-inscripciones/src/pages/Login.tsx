import { useState } from "react";
import { Box, Typography, FormControlLabel, Checkbox } from "@mui/material";
import CustomInput from "../components/CustomInput";
import FormButton from "../components/FormButton";
import theme from "../theme";
import { Link, useNavigate } from "react-router-dom";
import LoginLayout from "../layouts/LoginLayout";
import IniciaConHr from "../components/IniciaConHr";
import { Auth } from "../auth";
import api from '../utils/axiosConfig'; 

export default function Login() {
  const { secondary, text } = theme.palette;
  const navigate = useNavigate(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      console.log("Respuesta del servidor:", response.data);

      const userDataLogin = response.data; 
      localStorage.setItem('userDataLogin', JSON.stringify(userDataLogin));
      localStorage.setItem('userRole', userDataLogin.rol); 
      localStorage.setItem('isLogged', 'true'); 

      navigate('/'); 
    } catch (error) {
      console.error("Error en el login:", error);
    }
  };

  return (
    <>
      <LoginLayout>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
          <Typography variant="customSubtitle">Inicio de sesión</Typography>
          <CustomInput
            type="email"
            placeholder="ejemplo@gmail.com"
            label="Email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <CustomInput
            type="password"
            placeholder="Password"
            label="Password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            <FormControlLabel
              sx={{ color: "#000" }}
              label="Recordarme"
              control={
                <Checkbox
                  name="SomeName"
                  value="SomeValue"
                />
              }
            />
            <Link to="/forgot-password">
              <Typography component="span" sx={{ color: secondary.light, cursor: "pointer" }}>
                Olvidé mi contraseña
              </Typography>
            </Link>
          </Box>
          <FormButton buttonText="Iniciar Sesión" onClick={handleLogin} />
          <Typography component="p" sx={{ color: text.primary, fontWeight: "bold", width: "100%", display: "flex", justifyContent: "center", gap: "8px" }}>
            ¿No tenés cuenta?
            <Link to="/register">
              <Typography component="span" sx={{ color: secondary.light, cursor: "pointer" }}>Registrate</Typography>
            </Link>
          </Typography>
          <IniciaConHr />
            <Auth />
        </Box>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <img src="/media/register-img.png" alt="Descripción de la imagen" style={{ width: "100%", height: 'auto' }} />
        </Box>

      </LoginLayout>
    </>
  );
}
