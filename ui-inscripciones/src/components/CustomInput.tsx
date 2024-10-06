import FormControl from '@mui/material/FormControl';
import { styled } from "@mui/system";
import { Input as MUIInput, InputProps as MUIInputProps } from "@mui/material";
import { FormLabel as MUILabel } from "@mui/material";

interface InputFieldProps extends MUIInputProps {
  type: "email" | "text" | "password" | "date",
  placeholder: string,
  label: string,
  value: string, 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
}

const StyledInput = styled(MUIInput)(() => ({
  border: "1px solid #79747E",
  borderBottom: "1px",
  borderRadius: "4px",
  padding: "8px 0 8px 16px"
}));

const StyledLabel = styled(MUILabel)(() => ({
  backgroundColor: "#fff",
  padding: "0 2px",
  zIndex: "50",
  position: "absolute",
  top: "8px",
  left: "10px",
  fontFamily: "Poppins, sans-serif",
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "21px",
  textAlign: "left"
}));

export default function InputField({ type, placeholder, label, value, onChange }: InputFieldProps) {
  return (
    <FormControl>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput 
        type={type} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
      />
    </FormControl>
  );
}
