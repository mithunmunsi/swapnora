import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

const Settings = () => {
  const { user, refreshUser } = useAuth();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    location: "",
    website: "",
  });

  useEffect(() => {
    if (!user) return;

    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      bio: user.bio || "",
      location: user.location || "",
      website: user.website || "",
    });
  }, [user]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);

    try {
      await api.put("/users/profile", formData);
      await refreshUser();
      toast.success("Settings saved");
    } catch (error) {
      console.error(error);
      toast.error("Unable to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="settings">
      <section className="settings-container">
        <h2 className="settings-title">Account Settings</h2>

        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">
              First name
            </label>
            <input
              id="firstName"
              className="form-input"
              value={formData.firstName}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  firstName: event.target.value,
                }))
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="form-label">
              Last name
            </label>
            <input
              id="lastName"
              className="form-input"
              value={formData.lastName}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  lastName: event.target.value,
                }))
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio" className="form-label">
              Bio
            </label>
            <input
              id="bio"
              className="form-input"
              value={formData.bio}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  bio: event.target.value,
                }))
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              id="location"
              className="form-input"
              value={formData.location}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  location: event.target.value,
                }))
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="website" className="form-label">
              Website
            </label>
            <input
              id="website"
              type="url"
              className="form-input"
              value={formData.website}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  website: event.target.value,
                }))
              }
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Settings;
