import { useState, useEffect } from "react";
import { User } from "../../types/User";

const mockUser: User = {
  id: "123",
  name: "John Doe",
  email: "john@example.com",
  profilePic: "/profile.png",
};

const Settings = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilePic: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Simulate fetching user data
    setUser(mockUser);
    setFormData({
      name: mockUser.name,
      email: mockUser.email,
      profilePic: mockUser.profilePic,
      password: "",
      confirmPassword: "",
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Submit update (e.g., API call)
    console.log("Updated user info:", formData);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <main className="settings">
      <section className="settings-container">
        <h2 className="settings-title">Account Settings</h2>

        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="profilePic" className="form-label">
              Profile Picture URL
            </label>
            <input
              id="profilePic"
              name="profilePic"
              type="text"
              value={formData.profilePic}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Settings;
