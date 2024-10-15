import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  button1Text: string;
  button1Action: () => void;
  button2Text: string;
  showButton2: boolean;
  button2Action: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title,
  subtitle,
  button1Text,
  button1Action,
  button2Text,
  button2Action,
  showButton2,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" mb={1} sx={{textAlign: "center", fontWeight: "bold"}}>
          {title}
        </Typography>
        <Typography variant="subtitle1" mb={4} sx={{textAlign: "center"}}>
          {subtitle}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={button1Action} sx={{ borderRadius: "8px", boxShadow: "none"}}>
            {button1Text}
          </Button>
          {showButton2 && <button onClick={button2Action}>{button2Text}</button>}
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
