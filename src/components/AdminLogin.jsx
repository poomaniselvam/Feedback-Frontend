import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const AdminLogin = () => {
  const [adminEmail, setAdminEmail] = useState('');
  const [editing, setEditing] = useState(false);
  const emailRef = useRef(null);

  useEffect(() => {
    axios
      .get('https://mediumblue-jellyfish-250677.hostingersite.com/api/admin_login/1')
      .then(response => {
        setAdminEmail(response.data.email);
      })
      .catch(error => {
        console.error('Error fetching admin email:', error);
      });
  }, []);

  const updateEmail = () => {
    const updatedEmail = emailRef.current.value;
    axios
      .put('https://mediumblue-jellyfish-250677.hostingersite.com/api/admin_login/1', {
        email: updatedEmail
      })
      .then(response => {
        setAdminEmail(updatedEmail);
        setEditing(false);
      })
      .catch(error => {
        console.error('Error updating admin email:', error);
      });
  };

  return (
    <div>
      <h2>Admin Email</h2>
      {editing ? (
        <div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              ref={emailRef}
              defaultValue={adminEmail}
            />
          </div>
          <button onClick={updateEmail}>Save</button>
        </div>
      ) : (
        <div>
          <p><strong>Email:</strong> {adminEmail}</p>
          <button onClick={() => setEditing(true)}>Edit Email</button>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;