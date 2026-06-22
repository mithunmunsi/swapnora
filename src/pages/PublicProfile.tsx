import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../services/api";

import "./PublicProfile.css";

interface UserProfile {
  _id: string;

  firstName: string;
  lastName: string;

  avatar?: string;
  coverPhoto?: string;

  bio?: string;
  location?: string;
  website?: string;

  role: string;

  createdAt: string;
}

const PublicProfile = () => {
  const { userId } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState<UserProfile | null>(null);

  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const response = await api.get(`/users/${userId}`);

      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleMessageUser = async () => {
    if (!user) return;

    try {
      const response = await api.post("/messages/start", {
        receiverId: user._id,
      });

      navigate(
        `/dashboard/messages?conversation=${response.data.conversation._id}`,
      );
    } catch (error) {
      console.error(error);

      alert("Failed to start conversation");
    }
  };

  if (loading) {
    return <div className="public-profile-loading">Loading profile...</div>;
  }

  if (!user) {
    return <div className="public-profile-error">User not found</div>;
  }

  return (
    <section className="public-profile">
      {/* COVER */}

      <div className="public-cover">
        {user.coverPhoto ? (
          <img src={user.coverPhoto} alt="Cover" />
        ) : (
          <div className="public-cover-placeholder">No Cover Photo</div>
        )}
      </div>

      {/* HEADER */}

      <div className="public-top">
        <div className="public-avatar-wrapper">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.firstName}
              className="public-avatar-image"
            />
          ) : (
            <div className="public-avatar">
              {user.firstName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="public-info">
          <h1>
            {user.firstName} {user.lastName}
          </h1>

          <span className="public-role">{user.role}</span>

          {user.bio && <p className="public-bio">{user.bio}</p>}

          {user.location && <p>📍 {user.location}</p>}

          {user.website && (
            <p>
              🌐{" "}
              <a href={user.website} target="_blank" rel="noreferrer">
                {user.website}
              </a>
            </p>
          )}

          <div className="public-actions">
            <button className="message-user-btn" onClick={handleMessageUser}>
              💬 Message User
            </button>
          </div>
        </div>
      </div>

      {/* DETAILS */}

      <div className="public-card">
        <h2>Profile Information</h2>

        <div className="public-grid">
          <div>
            <strong>Member Since</strong>

            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>

          <div>
            <strong>Account Type</strong>

            <p>{user.role}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicProfile;
