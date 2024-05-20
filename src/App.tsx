import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import SimpleAlert from './complements/alert';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ResponsiveAppBar from './complements/navbar';
import BasicSpeedDial from './complements/menuapp';
import GetPerson from './person/GetPerson';
import CardTodo from './complements/card';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ResponsiveAppBar />
      <Container maxWidth="md">
        <GetPerson />
        <CardTodo />
        <Box sx={{ my: 4 }}>
          {/* <SimpleAlert /> */}
        </Box>
      </Container>
      < BasicSpeedDial />
    </ThemeProvider>
    
  );
}