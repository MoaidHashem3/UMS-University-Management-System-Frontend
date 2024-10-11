import React from 'react';
import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';

const PdfViewer = ({ fileUrl, title }) => {
  const theme = useTheme();

  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card 
        sx={{
          width: '80%',
          height: '80%',
          boxShadow: 3,
          borderRadius: 2,
          overflow: 'hidden',
          
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ padding: '16px', backgroundColor: 'primary.main', color: '#fff' }}
          >
            {title}
          </Typography>
          <iframe
            src={fileUrl}
            width="100%"
            height="700px"
            title="PDF Viewer"
            style={{ border: 'none' }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default PdfViewer;
