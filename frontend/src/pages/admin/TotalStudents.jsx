import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TotalStudents.css';

const AdminStudentManager = () => {
  const [studentData, setStudentData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    roll_number: '',
    room_number: '',
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [studentCount, setStudentCount] = useState(0);
  const [studentList, setStudentList] = useState([]);

  const accessToken = localStorage.getItem('adminToken');
  const refreshToken = localStorage.getItem('adminRefreshToken');

  const fetchStudentCount = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users/admin/total-students/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setStudentCount(response.data.total_students);
    } catch (error) {
      console.error('Error fetching student count:', error);
    }
  };

  const fetchStudentList = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users/admin/all-students/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setStudentList(response.data.students);
    } catch (error) {
      console.error('Error fetching student list:', error);
    }
  };

  useEffect(() => {
    fetchStudentCount();
    fetchStudentList();
  }, []);

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/token/refresh/', {
        refresh: refreshToken,
      });
      localStorage.setItem('adminToken', response.data.access);
      return response.data.access;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return null;
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrors({});

    const tryAddStudent = async (token) => {
      try {
        await axios.post('http://localhost:8000/api/users/admin/add-student/', studentData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage('Student added successfully!');
        setStudentData({
          first_name: '',
          last_name: '',
          email: '',
          roll_number: '',
          room_number: '',
        });
        fetchStudentCount();
        fetchStudentList();
      } catch (err) {
        if (err.response?.status === 401 && refreshToken) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            tryAddStudent(newToken);
          }
        } else if (err.response?.data) {
          setErrors(err.response.data);
          setMessage('Validation failed.');
        } else {
          console.error('Error adding student:', err);
          setMessage('Failed to add student.');
        }
      }
    };

    tryAddStudent(accessToken);
  };

  return (
    <div style={styles.container}>
      <h2>Add Student</h2>
      <form onSubmit={handleAddStudent} style={styles.form}>
        <input type="text" name="first_name" placeholder="First Name" value={studentData.first_name} onChange={handleChange} style={styles.input} required />
        <input type="text" name="last_name" placeholder="Last Name" value={studentData.last_name} onChange={handleChange} style={styles.input} required />
        <input type="email" name="email" placeholder="Email" value={studentData.email} onChange={handleChange} style={styles.input} required />
        <input type="text" name="roll_number" placeholder="Roll Number" value={studentData.roll_number} onChange={handleChange} style={styles.input} required />
        {errors.roll_number && <p style={styles.error}>{errors.roll_number[0]}</p>}
        <input type="text" name="room_number" placeholder="Room Number" value={studentData.room_number} onChange={handleChange} style={styles.input} required />
        {errors.room_number && <p style={styles.error}>{errors.room_number[0]}</p>}
        <button type="submit" style={styles.button}>Add Student</button>
      </form>

      {message && <p>{message}</p>}
      <h3>Total Students: {studentCount}</h3>

      {/* Display Student List */}
      <h3>All Students</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Roll No</th>
            <th>Room No</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {studentList.length === 0 ? (
            <tr><td colSpan="5">No students found</td></tr>
          ) : (
            studentList.map((student, index) => (
              <tr key={student.id || index}>
                <td>{index + 1}</td>
                <td>{student.first_name} {student.last_name}</td>
                <td>{student.roll_number}</td>
                <td>{student.room_number}</td>
                <td>{student.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#2d8a80ff',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '-8px',
    marginBottom: '8px',
    textAlign: 'left',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    backgroundColor: '#4d9792ff',
    color: 'white',
  },
  tableRow: {
    borderBottom: '1px solid #ccc',
  },
};

export default AdminStudentManager;
