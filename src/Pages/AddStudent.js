import React, {useState} from 'react';
import './AddStudent.css';
import ToastNotification from '../components/ToastNotification';

// Mui stuff
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    button: {

        position: 'absolute',
        bottom: '5%',
        backgroundColor: '#ec766c',
        width: '95%',
        color: '#fff',
        '&:hover':{
            backgroundColor: '#c8645b'
        }
    },
    input: {
        marginTop: '12px',
        width: '150%'
    }

  });

export default function AddStudent() {
    const classes = useStyles();
    const [newStudent, setNewStudent] = useState({name: "", lastName: "", age: "", details: ""});

    const [isOpenToast, setIsOpenToast] = useState(false);

    const handleChange=(e)=>{
        const {name, value} = e.target;
        setNewStudent(prevState => ({
            ...prevState,
            [name]: value
        }));

    }

    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setIsOpenToast(false);
    };


    const addStudent = (e)  => {
        e.preventDefault();
        const students = JSON.parse(localStorage.getItem("students")) || [];

        // Id for the student
        const studentId = Math.floor(Math.random() * 100000000) + 1;
        newStudent.id = studentId;

        // img for student
        newStudent.img = 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

        // add student
        students.push(newStudent);
        localStorage.setItem('students', JSON.stringify(students));

        // change state to '' => add another new student
        setNewStudent(prevState =>({
            ...prevState,
            name:'',
            lastName: '',
            age: '',
            details: ''
        }))

        // change state to open toast notification
        setIsOpenToast(true);
    }

    // To disabled button
    const isValidateData = () => {
        if (newStudent.name === "" ||
            newStudent.lastName === "" ||
            newStudent.age === "" ||
            newStudent.details === ""){
                return false
            }else{
                return true
            }
    };


    return (
        <div className='container'>
            <div className="divider">
                <h1>Ajouter un nouvel élève</h1>
                <Divider/>
            </div>
            <form className="content-form" onSubmit={addStudent} >
                <div className='content'>
                    <div className='content-input'>
                        <TextField className={classes.input} value={newStudent.name}onChange={handleChange} required={true} name="name" id="standard-basic" label="nom" />
                        <TextField className={classes.input} value={newStudent.lastName} onChange={handleChange} required={true} name="lastName" id="standard-basic" label="prénom" />
                        <TextField className={classes.input} value={newStudent.age} onChange={handleChange} required={true} name="age" id="standard-basic" label="age" />
                        <TextField className={classes.input} value={newStudent.details} onChange={handleChange} required={true} name="details" id="standard-basic" label="details" />
                    </div>
                    
                    <Button type='submit' disabled={isValidateData() ? false : true} className={classes.button}  variant="contained" >
                            Valider
                    </Button>
                </div>
            </form>
            <ToastNotification from={'addStudent'} isOpen={isOpenToast} handleClose={handleCloseToast}/>
        </div>
        
    )
}
