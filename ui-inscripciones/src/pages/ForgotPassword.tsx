import { Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { useState } from "react";
import CustomInput from "../components/CustomInput";
import FormButton from "../components/FormButton";
import LoginLayout from "../layouts/LoginLayout";
import BackToLoginButton from "../components/BackToLoginButton";
import api from "../utils/axiosConfig";
import { useNavigate } from 'react-router-dom';


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
 


  const handleForgotPassword = async () => {
    try {
      await api.post(`/api/password/recuperar/${email}`);
      setOpenDialog(true);
    } catch (error) {
      console.error("Error al enviar el correo de recuperación", error);
    }
  };


  const handleResetPassword = async () => {
    try {
      await api.post(`/api/password/restablecer`, {
        token,
        nuevaPassword: newPassword,
      });
      setOpenDialog(false);
      setOpenSuccessDialog(true);
    } catch (error) {
      console.error("Error al restablecer la contraseña", error);
    }
  };


  const handleSuccessDialogClose = () => {
    setOpenSuccessDialog(false);
    navigate('/login');
  };


  return (
    <>
      <LoginLayout>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", width: "100%" }}>
          <BackToLoginButton />
          <Typography variant="customSubtitle">¿Olvidaste la contraseña?</Typography>
          <Typography color="#656565" fontFamily="Poppins, sans-serif" fontWeight={400} fontSize={16}>
            No te preocupes, nos pasa a todos. Ingresa tu correo electrónico a continuación para recuperar tu contraseña.
          </Typography>
          <CustomInput
            type="email"
            placeholder="ejemplo@gmail.com"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormButton buttonText="Enviar" onClick={handleForgotPassword} />
        </Box>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <img src="/media/forgot-password-img.png" alt="Descripción de la imagen" style={{ width: "100%", height: 'auto' }} />
        </Box>
      </LoginLayout>


      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} >
        <DialogTitle>Restablecer Contraseña</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: '1rem',  
              margin: "1rem"
            }}
          >
            <CustomInput
              type="text"
              placeholder="Ingrese su token"
              label="Token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              sx={{ flex: 1 }}
            />
            <CustomInput
              type="password"
              placeholder="Ingrese su nueva contraseña"
              label="Nueva Contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ flex: 1 }}
            />
          </Box>
        </DialogContent>


        <DialogActions>
          <Button onClick={handleResetPassword}>Restablecer</Button>
        </DialogActions>
      </Dialog>


      <Dialog open={openSuccessDialog} onClose={handleSuccessDialogClose}>
        <DialogTitle>¡Contraseña Restablecida!</DialogTitle>
        <DialogContent>
          <Typography>Tu contraseña ha sido restablecida correctamente.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessDialogClose}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}





