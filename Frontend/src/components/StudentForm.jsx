import React, { useState, useEffect } from 'react';
import './StudentForm.css';

const StudentForm = ({ selectedStudent, onSave, onCancel }) => {
    const [student, setStudent] = useState({ firstName: '', lastName: '', email: '', age: 0 });

    useEffect(() => {
        if (selectedStudent) {
            setStudent(selectedStudent);
        } else {
            setStudent({ firstName: '', lastName: '', email: '', age: 0 });
        }
    }, [selectedStudent]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(student);
    };

    return (
        <div className="form-container">
            <h3>{student.id ? 'Update Student' : 'Add New Student'}</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="First Name" value={student.firstName}
                    onChange={(e) => setStudent({ ...student, firstName: e.target.value })} required />
                
                <input type="text" placeholder="Last Name" value={student.lastName}
                    onChange={(e) => setStudent({ ...student, lastName: e.target.value })} required />
                
                <input type="email" placeholder="Email" value={student.email}
                    onChange={(e) => setStudent({ ...student, email: e.target.value })} />
                
                <input type="number" placeholder="Age" value={student.age}
                    onChange={(e) => setStudent({ ...student, age: parseInt(e.target.value) || 0 })} />
                
                <div className="button-group">
                    <button type="submit" className="btn-save">Save</button>
                    <button type="button" onClick={onCancel} className="btn-cancel">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default StudentForm;