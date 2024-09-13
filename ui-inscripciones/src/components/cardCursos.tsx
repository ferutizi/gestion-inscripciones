import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import CustomButton from "./customButton";

interface CardCursosProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  duration: string;
  amount: string;
  onButtonClick?: () => void;
  buttonText?: string;
}

const CardCursos: React.FC<CardCursosProps> = ({ title, subtitle, description, imageUrl, duration, amount, onButtonClick, buttonText = "Learn More" }) => {
  const theme = useTheme();

  return (
    <Card 
      sx={{ 
        maxWidth: 348, 
        borderRadius: "16px", 
        backgroundColor: theme.palette.background.paper, 
        boxShadow: "none" ,
      }}
    >
      <CardMedia component="img" width="auto" image={imageUrl} alt={title} />
      <CardContent>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <Typography variant="body2" color={theme.palette.text.secondary}>
            {duration}
          </Typography>
          <Typography variant="body2" color={theme.palette.text.secondary}>
            {amount}
          </Typography>
        </div>
        <Typography gutterBottom variant="h6" component="div" color={theme.palette.primary.main} fontWeight="800" marginBottom={0}>
          {title}
        </Typography>
        <Typography gutterBottom variant="h6" component="div" color={theme.palette.primary.main} fontWeight="300">
          {subtitle}
        </Typography>
        <Typography variant="body2" color={theme.palette.text.primary} marginBottom={1} marginTop={2}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <CustomButton colorVariant="green" onClick={onButtonClick}>
          {buttonText}
        </CustomButton>
      </CardActions>
    </Card>
  );
};

export default CardCursos;
