import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function BackToLoginButton() {
  return(
    <Link to="/login">
      <Box component="button" sx={{display: "flex", alignItems: "center", background: "none", boxShadow: "none", border: "none", cursor: "pointer"}}>
        <img src="./media/chevron_back.png" alt="Descripción de la imagen" style={{ width: "24px", height: 'auto' }} />
        <Typography color="textPrimary" fontWeight={500} fontSize={14} height="24px" lineHeight="24px" sx={{marginLeft: "4px"}} fontFamily="Poppins, sans-serif">Volver al inicio de sesión</Typography>
      </Box>
    </Link>
  )
}