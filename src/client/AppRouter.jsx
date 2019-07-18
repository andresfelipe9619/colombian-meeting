import React, {useContext} from 'react';
import Navbar from './components/navbar/Navbar';
import Alert from './components/alert/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AlertContext from './context/alert-context';
export default function AppRouter() {
  const {open, message, variant, closeAlert} = useContext(AlertContext);
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg">
        <Alert
          open={open}
          message={message}
          variant={variant}
          handleClose={closeAlert}
        />
        <Switch>
          <Route path="/" component={HomePage} exact />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}
