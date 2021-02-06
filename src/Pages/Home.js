import React, {useEffect, useState} from 'react';
import ToastNotification from '../components/ToastNotification';
import ModalEditStudent from '../components/ModalEditStudent';
import NewcardStudent from '../components/NewCardStudent/NewCardStudent';

// CSS
import './Home.css'

// Data Students
import dataStudents from '../data/dataStudents';

// Mui stuff
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function Home() {

    const [students, setStudents] = useState([]);

    const [isOpenToast, setIsOpenToast] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [currentStudent, setCurrentStudent] = useState('');


    useEffect(() => {
        // fetch data, not here because it's a fixture
        const arrayStudentsFromStorage = JSON.parse(localStorage.getItem("students"));

        if(arrayStudentsFromStorage === null){
            localStorage.setItem("students", JSON.stringify(dataStudents));
            setStudents(dataStudents);
        } else {
            const studentsFromStorage = JSON.parse(localStorage.getItem("students"));
            setStudents(studentsFromStorage);
        }
    }, []);


    const updateStudent = (student) => {
        const arrayStudents = JSON.parse(localStorage.getItem("students")) || [];
        let index;
        for (let i = 0; i < arrayStudents.length; i++) {
            if (arrayStudents[i].id === student.id) {
                index=i;
             break;
            }
          }

        arrayStudents[index].name = student.name;
        arrayStudents[index].lastName = student.lastName;
        arrayStudents[index].age = student.age;
        arrayStudents[index].details = student.details;

        localStorage.setItem('students', JSON.stringify(arrayStudents));
        setStudents(arrayStudents);
        handleCloseModal();
        setIsOpenToast(true);
    }

    const deleteStudent = (id) => {
        const arrayStudents = JSON.parse(localStorage.getItem("students")) || [];
        let index;
        for (let i = 0; i < arrayStudents.length; i++) {
            if (arrayStudents[i].id === id) {
                index=i;
             break;
            }
          }
        if(index === undefined) return 
        arrayStudents.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(arrayStudents));
        setStudents(arrayStudents);
        setIsOpenToast(true);
    }

    // Open edit modal with the current Student
    const openEditModal = (student) => {
        setIsOpenEditModal(true);
        setCurrentStudent(student);
    }

    // Close Edit Modal
    const handleCloseModal = () => {
        setIsOpenEditModal(false);
      };
    

    // Close ToastNotification
    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setIsOpenToast(false);
    };

    return (
        <div>
            <CssBaseline />
            <Container maxWidth="lg">
                <Typography component="div" style={{marginTop: '32px', marginBottom: '32px' }}>
                
                {/* Toast Notification onDelete */}
                <ToastNotification
                    from={'deleteStudent'}
                    isOpen={isOpenToast}
                    handleClose={handleCloseToast}
                >
                </ToastNotification>
                {/* Toast Notification onDelete */}


                {/* Toast Notification onUpdate */}
                <ToastNotification
                    from={'updateStudent'}
                    isOpen={isOpenToast}
                    handleClose={handleCloseToast}
                >
                </ToastNotification>
                {/* Toast Notification onUpdate */}

                <ModalEditStudent
                    currentStudent={currentStudent}
                    isOpenEditModal={isOpenEditModal}
                    handleCloseModal={handleCloseModal}
                    updateStudent={updateStudent}
                >
                </ModalEditStudent>

                <div className='grid-container'>
                    {students.map(student => 
                    <NewcardStudent
                        key={student.id}
                        student={student}
                        deleteStudent={deleteStudent}
                        openEditModal={openEditModal}
                    />
                    )}
                </div>
                </Typography>
            </Container>
        </div>
    )
}
