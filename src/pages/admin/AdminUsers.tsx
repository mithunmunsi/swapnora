import { useEffect, useState } from "react";

import api from "../../services/api";

import "./AdminUsers.css";

import { User } from "../../types/user";

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/users");

      setUsers(response.data.users);
    } catch (error) {
      console.error(error);

      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingUser) return;

    try {
      await api.put(`/admin/users/${editingUser._id}`, {
        role: editingUser.role,

        votingCredits: editingUser.votingCredits,

        isVerified: editingUser.isVerified,

        status: editingUser.status,
      });

      setEditingUser(null);

      fetchUsers();
    } catch (error) {
      console.error(error);

      alert("Failed to update user");
    }
  };

  const handleDeleteUser = async () => {
    if (!deletingUser) return;

    try {
      await api.delete(`/admin/users/${deletingUser._id}`);

      setDeletingUser(null);

      fetchUsers();
    } catch (error) {
      console.error(error);

      alert("Failed to delete user");
    }
  };

  if (loading) {
    return <h2>Loading users...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="admin-users">
      <div className="admin-page-header">
        <h1>👥 Users Management</h1>

        <p>Total Users: {users.length}</p>
      </div>
      {editingUser && (
        <div className="edit-user-modal">
          <div className="edit-user-content">
            <form onSubmit={handleUpdateUser}>
              <h2>Edit User</h2>

              <div className="form-group">
                <label>Name</label>

                <input
                  value={`${editingUser.firstName} ${editingUser.lastName}`}
                  disabled
                />
              </div>

              <div className="form-group">
                <label>Email</label>

                <input value={editingUser.email} disabled />
              </div>

              <div className="form-group">
                <label>Role</label>

                <select
                  value={editingUser.role}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      role: e.target.value as "user" | "admin",
                    })
                  }
                >
                  <option value="user">User</option>

                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>

                <select
                  value={editingUser.status}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      status: e.target.value as
                        | "active"
                        | "suspended"
                        | "disabled",
                    })
                  }
                >
                  <option value="active">Active</option>

                  <option value="suspended">Suspended</option>

                  <option value="disabled">Disabled</option>
                </select>
              </div>

              <div className="form-group">
                <label>Voting Credits</label>

                <input
                  type="number"
                  value={editingUser.votingCredits}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      votingCredits: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="form-group verification-row">
                <label>Verified</label>

                <input
                  type="checkbox"
                  checked={editingUser.isVerified}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      isVerified: e.target.checked,
                    })
                  }
                />
              </div>

              <div className="modal-actions">
                <button type="submit">Update User</button>

                <button type="button" onClick={() => setEditingUser(null)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deletingUser && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <h3>Delete User</h3>

            <p>
              Are you sure you want to delete
              <strong>
                {" "}
                {deletingUser.firstName} {deletingUser.lastName}
              </strong>
              ?
            </p>

            <div className="modal-actions">
              <button className="btn-delete" onClick={handleDeleteUser}>
                Delete
              </button>

              <button onClick={() => setDeletingUser(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>

            <th>Email</th>

            <th>Role</th>

            <th>Credits</th>

            <th>Verified</th>

            <th>Joined</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                {user.firstName} {user.lastName}
              </td>

              <td>{user.email}</td>

              <td>
                <span className={`role-badge role-${user.role}`}>
                  {user.role}
                </span>
              </td>

              <td>{user.votingCredits}</td>

              <td>{user.isVerified ? "✅" : "❌"}</td>

              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <span className={`status-badge status-${user.status}`}>
                  {user.status}
                </span>
              </td>

              <td>
                <button
                  className="btn-edit"
                  onClick={() => setEditingUser(user)}
                >
                  Edit
                </button>

                {user.role !== "admin" && (
                  <button
                    className="btn-delete"
                    onClick={() => setDeletingUser(user)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
