import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    padding: theme.spacing(3, 2),
  },
  select: {
    width: '100%',
  },
  button: {
    margin: '30px 40px',
  },
}));
export default useStyles;
