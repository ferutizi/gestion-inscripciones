import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebaseConfig'; 
import { Button, CircularProgress, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

interface UploadWidgetProps {
  onUploadComplete: (url: string | null) => void;
}

const UploadWidget: React.FC<UploadWidgetProps> = ({ onUploadComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null); 

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (imageUrl) {
      const imagePath = extractImagePath(imageUrl); 
      const imageRef = ref(storage, imagePath);
      deleteObject(imageRef)
        .then(() => console.log("Imagen anterior eliminada"))
        .catch((error) => console.error("Error deleting old image:", error));
    }

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(prog);
      },
      (error) => {
        console.error("Upload failed:", error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploading(false);
          setProgress(0);
          setImageUrl(downloadURL);
          onUploadComplete(downloadURL);
        });
      }
    );
  };

  const handleDeleteImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (imageUrl) {
      const imagePath = extractImagePath(imageUrl); 
      const imageRef = ref(storage, imagePath);
      deleteObject(imageRef)
        .then(() => {
          setImageUrl(null);
          onUploadComplete(null);
        })
        .catch((error) => console.error("Error deleting image:", error));
    }
  };

  const extractImagePath = (url: string): string => {
    const decodedUrl = decodeURIComponent(url);
    const startIndex = decodedUrl.indexOf('/o/') + 3; 
    const endIndex = decodedUrl.indexOf('?'); 
    return decodedUrl.substring(startIndex, endIndex);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading || !!imageUrl} 
        style={{ display: 'none' }} 
        id="upload-input"
      />
      <label htmlFor="upload-input">
        <Button
          variant="contained"
          component="span"
          color="primary"
          startIcon={<CloudUploadIcon />}
          disabled={uploading || !!imageUrl}
        >
          Subir Imagen
        </Button>
      </label>
      {uploading && (
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <CircularProgress size={24} />
          <p style={{ marginLeft: '10px' }}>Subiendo: {Math.round(progress)}%</p>
        </div>
      )}
      {imageUrl && (
        <div style={{ marginTop: '10px' }}>
          <img src={imageUrl} alt="Uploaded" width="100" style={{ marginBottom: '10px' }} />
          <IconButton onClick={handleDeleteImage} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default UploadWidget;
