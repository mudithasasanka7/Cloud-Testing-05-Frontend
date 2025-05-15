import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get(`${API_URL}/all`);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) return alert('Enter both name and email');

    await axios.post(`${API_URL}/add`, { name, email });
    setName('');
    setEmail('');
    fetchUsers(); // Refresh list
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>User Entry</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <h3>User List</h3>
      {users.length === 0 ? (
        <p>No names to show</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr><th>Name</th><th>Email</th></tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}><td>{user.name}</td><td>{user.email}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
