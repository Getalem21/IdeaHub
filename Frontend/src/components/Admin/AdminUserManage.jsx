import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import AdminPostManage from "./AdminPostManage"; 

function AdminPage() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateUser = async (id, changes) => {
    try {
      await axios.put(`http://localhost:5000/admin/users/${id}`, changes, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin User Management</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) =>
                    updateUser(user._id, { role: e.target.value })
                  }
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={user.isActive}
                  onChange={(e) =>
                    updateUser(user._id, { isActive: e.target.checked })
                  }
                />
              </td>
              <td>
                <button
                  onClick={() => deleteUser(user._id)}
                  style={{ color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AdminPostManage/>
    </div>
  );
}

export default AdminPage;
