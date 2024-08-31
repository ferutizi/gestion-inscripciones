import React from "react";
import { Card, CardContent, CardMedia, Typography, CardActions } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomButton from "./customButton";

interface CardProjectProps {
  title: string;
  description: string;
  imageUrl: string;
  onButtonClick?: () => void;
}

const CardProject: React.FC<CardProjectProps> = ({ title, description, imageUrl, onButtonClick }) => {
  const theme = useTheme();

  return (
    <Card 
      sx={{ 
        maxWidth: 348, 
        borderRadius: "16px", 
        backgroundColor: theme.palette.background.paper, 
        boxShadow: "none" ,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center"
      }}
    >
      <CardMedia component="img" sx={{width: "3rem"}} image={imageUrl} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" color={theme.palette.primary.main} fontWeight={600} fontSize={27} marginBottom={0}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          color={theme.palette.text.secondary}
          marginBottom={1}
          marginTop={2}
          fontWeight={500}
          fontSize={15}
          maxWidth={260} lineHeight="29px"
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <CustomButton
          colorVariant="white"
          sx={{
            backgroundColor: "#fff",
            color: theme.palette.primary.main,
            boxShadow: `2px 2px 64px ${theme.palette.primary.dark}1f`,
            border: 'none',
            ":hover": {
              border: 'none'
            }
          }}
          onClick={onButtonClick}
        >
          Más información
        </CustomButton>
      </CardActions>
    </Card>
  );
};

export default CardProject;
