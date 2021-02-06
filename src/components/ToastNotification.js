import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars(props) {
  const {isOpen, handleClose, from} = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Snackbar open={isOpen} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
            {from === 'addStudent' && 'Elève ajouté avec succès!' }
            {from === 'deleteStudent' && 'Elève supprimé avec succès!' }
            {from === 'updateStudent' && 'Elève modifié avec succès!' }
        </Alert>
      </Snackbar>
    </div>
  );
}