import { ReactNode } from "react";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface LoginLayoutProps {
  children: ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  const navigate = useNavigate();

  return (
    <>
      <Box
        component="img"
        src="/media/logo-login.png"
        alt="Logo"
        sx={{
          textAlign: "left",
          cursor: "pointer",
          width: "auto",
          display: { xs: "block", lg: "block" },
          margin: { xs: "0", lg: "0" },
          paddingLeft: "2.5rem",
          marginTop: "2rem !important"
        }}
        onClick={() => navigate("/")} 
      />

      <Container
        sx={{
          display: { xs: "block", md: "grid" },
          width: "100dvw",
          minHeight: "calc(100dvh - 8.625rem)",
          alignItems: "center",
          placeContent: "center",
          padding: { xs: "0 40px", md: "4rem" },
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {children}
      </Container>
    </>
  );
}
