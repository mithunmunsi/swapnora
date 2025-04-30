import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import "./Profile.css"; // Import the CSS file

const Profile = () => {
  const { user } = useAuth();
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [, setIsEditing] = useState(false);

  useEffect(() => {
    if (user?.profile) {
      setBio(user.profile.bio || "");
      setLocation(user.profile.location || "");
      setWebsite(user.profile.website || "");
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ bio, location, website });
    setIsEditing(false);
  };

  return (
    <main className="profile-container">
      <header className="profile-header">
        <h1>My Profile</h1>
        <p>Edit your public profile information</p>
      </header>

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself"
            rows={4}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Helsinki, Finland"
          />
        </div>

        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="e.g. https://myportfolio.com"
          />
        </div>

        <button type="submit" className="save-button">
          Save Profile
        </button>
      </form>

      {user && (
        <section className="profile-preview">
          <h2>Profile Preview</h2>
          <dl>
            <div>
              <dt>Name</dt>
              <dd>{user.name}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{user.email}</dd>
            </div>
            <div>
              <dt>Bio</dt>
              <dd>{bio || "N/A"}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{location || "N/A"}</dd>
            </div>
            <div>
              <dt>Website</dt>
              <dd>
                {website ? (
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {website}
                  </a>
                ) : (
                  "N/A"
                )}
              </dd>
            </div>
          </dl>
        </section>
      )}
    </main>
  );
};

export default Profile;
