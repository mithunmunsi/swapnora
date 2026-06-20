import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";

import "./Profile.css";

const Profile = () => {
  const { user, refreshUser } = useAuth();

  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    location: "",
    website: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        bio: user.bio || "",
        location: user.location || "",
        website: user.website || "",
      });
    }
  }, [user]);

  const handleProfileUpdate = async () => {
    try {
      await api.put("/users/profile", formData);

      await refreshUser();

      setEditing(false);

      alert("Profile updated successfully");
    } catch (error) {
      console.error(error);

      alert("Failed to update profile");
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const data = new FormData();

    data.append("avatar", file);

    try {
      await api.post("/users/upload-avatar", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await refreshUser();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const data = new FormData();

    data.append("coverPhoto", file);

    try {
      await api.post("/users/upload-cover", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await refreshUser();
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return <div className="profile-loading">Please login.</div>;
  }

  return (
    <section className="profile-page">
      {/* Cover */}

      <div className="profile-cover">
        {user.coverPhoto ? (
          <img src={user.coverPhoto} alt="Cover" />
        ) : (
          <div className="cover-placeholder">No Cover Photo</div>
        )}

        <label className="upload-cover-btn">
          Change Cover
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverUpload}
            hidden
          />
        </label>
      </div>

      {/* Avatar */}

      <div className="profile-top">
        <div className="profile-avatar-wrapper">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.firstName}
              className="profile-avatar-image"
            />
          ) : (
            <div className="profile-avatar">
              {user.firstName?.charAt(0).toUpperCase()}
            </div>
          )}

          <label className="upload-avatar-btn">
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              hidden
            />
          </label>
        </div>

        <div className="profile-info">
          <h1 className="verified-container">
            {user.firstName} {user.lastName}
            {user.isVerified && (
              <span className="verified-badge">&#10003;</span>
            )}
          </h1>

          <p className="profile-role">{user.role.toUpperCase()}</p>

          {user.bio && <p className="profile-bio">{user.bio}</p>}

          {user.location && <p>📍 {user.location}</p>}

          {user.website && <p>🌐 {user.website}</p>}
        </div>
      </div>

      {/* Details */}

      <div className="profile-card">
        <h2>Account Information</h2>

        <div className="profile-grid">
          <div>
            <strong>Email</strong>
            <p>{user.email}</p>
          </div>

          <div>
            <strong>Voting Credits</strong>
            <p>{user.votingCredits}</p>
          </div>

          <div>
            <strong>Role</strong>
            <p>{user.role}</p>
          </div>

          <div>
            <strong>Member Since</strong>
            <p>
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Profile */}

      <div className="profile-card">
        <div className="profile-card-header">
          <h2>Edit Profile</h2>

          <button onClick={() => setEditing(!editing)}>
            {editing ? "Cancel" : "Edit"}
          </button>
        </div>

        {editing && (
          <div className="edit-profile-form">
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  firstName: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lastName: e.target.value,
                })
              }
            />

            <textarea
              placeholder="Bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bio: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Website"
              value={formData.website}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  website: e.target.value,
                })
              }
            />

            <button className="save-profile-btn" onClick={handleProfileUpdate}>
              Save Changes
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
