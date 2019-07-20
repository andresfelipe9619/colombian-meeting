import React, {useCallback} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';
import {withRouter} from 'react-router-dom';

function Navbar(props) {
  const classes = useStyles();

  const goTo = useCallback((route) => (event) => props.history.push(route), [
    props.history,
  ]);

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            onClick={goTo('/')}
          >
            Encuentro Colombiano De Gestión Universitaria
          </Typography>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(React.memo(Navbar));
