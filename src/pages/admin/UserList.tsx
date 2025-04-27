import { useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isActive: boolean;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Simulated data fetch
  useEffect(() => {
    const mockUsers: User[] = [
      {
        _id: "u1",
        name: "John Doe",
        email: "john@example.com",
        role: "user",
        isActive: true,
      },
      {
        _id: "u2",
        name: "Jane Admin",
        email: "jane@example.com",
        role: "admin",
        isActive: true,
      },
      {
        _id: "u3",
        name: "Alice Brown",
        email: "alice@example.com",
        role: "user",
        isActive: false,
      },
    ];
    setUsers(mockUsers);
  }, []);

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user._id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  const changeUserRole = (id: string, role: "user" | "admin") => {
    setUsers((prev) =>
      prev.map((user) => (user._id === id ? { ...user, role } : user))
    );
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">👥 Manage Users</h1>
      <table className="w-full table-auto text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-t">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3 capitalize">{user.role}</td>
              <td className="p-3">{user.isActive ? "Active" : "Inactive"}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() =>
                    changeUserRole(
                      user._id,
                      user.role === "user" ? "admin" : "user"
                    )
                  }
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Make {user.role === "user" ? "Admin" : "User"}
                </button>
                <button
                  onClick={() => toggleUserStatus(user._id)}
                  className={`px-3 py-1 ${
                    user.isActive ? "bg-red-500" : "bg-green-500"
                  } text-white rounded`}
                >
                  {user.isActive ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
