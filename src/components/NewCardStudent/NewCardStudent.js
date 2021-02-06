import React from 'react';
import './style.css';

// Mui stuff
import Tooltip from '@material-ui/core/Tooltip';

// Mui Icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default function NewCardStudent(props) {
    const{student, deleteStudent, openEditModal} = props;
    return (
        <div className="card-template card-template-1">
            <div className="left-part">
                <span>{student.name}</span>
                <span>{student.age} ans</span>
                <img src={student.img}  alt='profile-image' width="100%" />
                <div className="actions-icon">
                    <Tooltip title="Modifier" placement="top">
                        <EditIcon style={{cursor: 'pointer'}} onClick={() => openEditModal(student)}/>
                    </Tooltip>
                    <Tooltip title="Supprimer" placement="top">
                        <DeleteIcon style={{cursor: 'pointer'}} onClick={() => deleteStudent(student.id)}/>
                    </Tooltip>
                </div>
            </div>
            <div className="right-part">
                <h1 className="text-center orig-font">{student.name} {student.lastName}</h1>
                <p>
                    {student.details}
                </p>
            </div>
        </div>
    )
}
