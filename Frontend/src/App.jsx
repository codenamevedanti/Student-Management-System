import React, { useEffect, useState } from "react";
import * as api from "./services/api";
import StudentForm from "./components/StudentForm";
import Login from "./components/Login"; 
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication state

  useEffect(() => {
    // Only fetch data if the user is logged in
    if (isLoggedIn) {
      loadStudents();
    }
  }, [isLoggedIn]);

  const loadStudents = async () => {
    try {
      const res = await api.getStudents();
      setStudents(res.data);
    } catch (err) {
      console.error("Error loading students", err);
    }
  };

  const handleSave = async (student) => {
    try {
      if (student.id) {
        await api.updateStudent(student.id, student);
      } else {
        await api.createStudent(student);
      }
      loadStudents();
      setShowForm(false);
      setEditingStudent(null);
    } catch (err) {
      alert("Error saving student");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this student?")) {
      await api.deleteStudent(id);
      loadStudents();
    }
  };

  // --- LOGIN GATE ---
  // If the user is not logged in, we return the Login component and stop here.
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  // --- MAIN DASHBOARD ---
  // This part only renders if isLoggedIn is true
  return (
    <div className="App">
      <div className="header-section">
        <h1>Student Management System</h1>
        <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>Logout</button>
      </div>

      <button
        onClick={() => {
          setEditingStudent(null);
          setShowForm(true);
        }}
      >
        + Add Student
      </button>

      {showForm && (
        <StudentForm
          selectedStudent={editingStudent}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              {/* Check your backend: if data is blank, try s.FirstName (PascalCase) */}
              <td>{s.firstName || s.FirstName}</td>
              <td>{s.lastName || s.LastName}</td>
              <td>{s.email || s.Email}</td>
              <td>{s.age || s.Age}</td>
              <td>
                <button
                  onClick={() => {
                    setEditingStudent(s);
                    setShowForm(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => handleDelete(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;