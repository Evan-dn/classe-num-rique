import React, {useEffect, useState} from 'react';

// Mui stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    marginTop: '8px',
    backgroundColor: '#ec766c',
    color: '#fff',
    '&:hover':{
        backgroundColor: '#c8645b'
    }
  }
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  const {isOpenEditModal, currentStudent, handleCloseModal, updateStudent} = props;

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
 
  const [studentToUpdate, setStudentToUpdate] = useState({
          id: currentStudent.id,
          name: currentStudent.name,
          lastName: currentStudent.lastName,
          age: currentStudent.age,
          details: currentStudent.details
    });

    // Change State with selected student => current student
    useEffect(() => {
        setStudentToUpdate(prevState => ({
        ...prevState,
        id: currentStudent.id,
        name: currentStudent.name,
        lastName: currentStudent.lastName,
        age: currentStudent.age,
        details: currentStudent.details,
        }));
    }, [currentStudent]);
  

    // Set  current student's attributes to update
    const handleChange=(e)=>{
        const {name, value} = e.target;
        setStudentToUpdate(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

  return (
    <div>
      <Modal
        open={isOpenEditModal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
            <h2 style={{fontFamily: " 'Righteous', cursive"}} id="simple-modal-title">Modifier le profil</h2>
            <>
                <TextField style={{marginBottom: '8px'}} value={studentToUpdate.name}onChange={handleChange} name="name" id="standard-basic" label="nom" />
                <TextField style={{marginBottom: '8px'}} value={studentToUpdate.lastName} onChange={handleChange} name="lastName" id="standard-basic" label="prénom" />
                <TextField style={{marginBottom: '8px'}} value={studentToUpdate.age} onChange={handleChange} name="age" id="standard-basic" label="age" />
                <TextField style={{marginBottom: '8px'}} multiline value={studentToUpdate.details} onChange={handleChange} name="details" id="standard-basic" label="details" />
            </>
            <Button onClick={() => updateStudent(studentToUpdate)}type='submit' className={classes.button} fullWidth variant="contained" >
                Modifier
            </Button>
        </div>
      </Modal>
    </div>
  );
}