import React from 'react';
import GlobalState from './context/GlobalState';
import AppRouter from './AppRouter';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'red',
    },
    secondary: {
      main: 'white',
    },
  },
  status: {
    danger: 'orange',
  },
});
const App = () => (
  <GlobalState>
    <MuiThemeProvider theme={theme}>
      <AppRouter />
    </MuiThemeProvider>
  </GlobalState>
);

export default App;
