import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  TextareaAutosize,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  const [ticker, setTicker] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('YouTube');
  const [url, setUrl] = useState('');

  const handleInputChange = (event) => {
    setTicker(event.target.value);
  };

  const handleSubmit = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleUrlSubmit = () => {
    console.log('URL:', url);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          bgcolor: 'background.default',
          minHeight: '100vh',
          py: 4,
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ my: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom color="text.secondary">
              Stock Earnings Conference Tracker
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
              Apes Together Strong
            </Typography>
            <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
              <TextField
                id="ticker-input"
                label="Ticker Symbol"
                value={ticker}
                onChange={handleInputChange}
                sx={{ flexGrow: 1, mr: 2 }}
              />
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Send
              </Button>
            </Box>
            <TextareaAutosize
              aria-label="User input"
              minRows={10}
              value={ticker}
              readOnly
              style={{ width: '100%', marginTop: '16px' }}
            />
          </Box>
        </Container>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Select an Option</DialogTitle>
          <DialogContent>
            <FormControl component="fieldset">
              <FormLabel component="legend">Choose URL type</FormLabel>
              <RadioGroup
                aria-label="URL type"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <FormControlLabel value="YouTube" control={<Radio />} label="YouTube URL" />
                <FormControlLabel value="Streaming" control={<Radio />} label="Streaming URL" />
                <FormControlLabel value="Video" control={<Radio />} label="Video URL" />
              </RadioGroup>
            </FormControl>
            <TextField
              id="url-input"
              label="Enter URL"
              value={url}
              onChange={handleUrlChange}
              sx={{
          mt: 2,
          width: '100%',
        }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUrlSubmit}
          sx={{ mt: 2 }}
        >
          Submit URL
        </Button>
      </DialogContent>
    </Dialog>
  </Box>
</ThemeProvider>
);
};

export default App;


