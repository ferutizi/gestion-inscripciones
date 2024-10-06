import { Box, Typography, FormControlLabel, Checkbox } from "@mui/material";
import CustomInput from "../components/CustomInput";
import FormButton from "../components/FormButton";
import theme from "../theme";
import GoogleButton from "../components/GoogleButton";
import { Link } from "react-router-dom";
import LoginLayout from "../layouts/LoginLayout";
import IniciaConHr from "../components/IniciaConHr";
import { useState } from "react";
import api from "../utils/axiosConfig"; 

export default function Register() {
  const { secondary, text } = theme.palette;

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage, setSuccessMessage] = useState("");

  const isFormValid = () => {
    return (
      nombre.length > 0 &&
      apellido.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword &&
      isChecked &&
      fechaNacimiento.length > 0 
    );
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordsMatch(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordsMatch(password === value);
  };

  const handleRegister = async () => {
    const formattedFechaNacimiento = new Date(fechaNacimiento).toISOString().split('T')[0];

    const usuarioData = {
      nombre,
      apellido,
      email,
      fechaNacimiento: formattedFechaNacimiento, 
      rol: "VISITANTE", 
      password,
    };

    try {
      const response = await api.post("/api/usuario/crear", usuarioData);
      console.log("Respuesta del servidor:", response.data); 
      setSuccessMessage("Usuario creado exitosamente!");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Error al crear el usuario. Inténtalo nuevamente.");
      setSuccessMessage("");
    }
  };

  return (
    <LoginLayout>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <img src="./src/media/register-img.png" alt="Descripción de la imagen" style={{ width: "100%", height: 'auto' }} />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }}>
        <Typography variant="customSubtitle">Regístrate</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <CustomInput
            type="text"
            placeholder="Nombre"
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <CustomInput
            type="text"
            placeholder="Apellido"
            label="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
          <CustomInput
            type="email"
            placeholder="ejemplo@gmail.com"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <CustomInput
          type="date" 
          placeholder="Tu fecha de nacimiento"
          label="Fecha de Nacimiento"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
        />
        <CustomInput
          type="password"
          placeholder="Password"
          label="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <CustomInput
          type="password"
          placeholder="Confirmar Password"
          label="Confirmar Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {!passwordsMatch && (
          <Typography sx={{ color: "red", fontSize: "0.875rem" }}>
            Las contraseñas no coinciden
          </Typography>
        )}
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <FormControlLabel
            sx={{ color: "#000" }}
            label="Acepto los"
            control={
              <Checkbox
                name="SomeName"
                value="SomeValue"
                onChange={(e) => setIsChecked(e.target.checked)}
              />
            }
          />
          <Link to="/privacy-policies">
            <Typography component="span" sx={{ color: secondary.light, cursor: "pointer" }}>Términos y Política de privacidad</Typography>
          </Link>
        </Box>
        {errorMessage && (
          <Typography sx={{ color: "red", fontSize: "0.875rem" }}>
            {errorMessage}
          </Typography>
        )}
        {successMessage && (
          <Typography sx={{ color: "green", fontSize: "0.875rem" }}>
            {successMessage}
          </Typography>
        )}
        <FormButton buttonText="Crear cuenta" disabled={!isFormValid()} onClick={handleRegister} />
        <Typography component="p" sx={{ color: text.primary, fontWeight: "bold", width: "100%", display: "flex", justifyContent: "center", gap: "8px" }}>
          ¿Ya tenés cuenta?
          <Link to="/login">
            <Typography component="span" sx={{ color: secondary.light, cursor: "pointer" }}>Inicia Sesión</Typography>
          </Link>
        </Typography>
        <IniciaConHr />
        <GoogleButton />
      </Box>
    </LoginLayout>
  );
}
