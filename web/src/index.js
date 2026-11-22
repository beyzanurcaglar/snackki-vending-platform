import React from 'react';
import App from './App';
import  { store,persistor } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { createRoot } from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { deDE } from '@mui/x-data-grid'

// German labels for data tables
const theme = createTheme({}, deDE)


createRoot(document.getElementById("root")).render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
        </PersistGate>
    </Provider>
);
