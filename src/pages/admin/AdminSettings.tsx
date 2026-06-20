import { useEffect, useState } from "react";
import api from "../../services/api";
import "./AdminSettings.css";

interface Settings {
  platformName: string;
  supportEmail: string;
  contactPhone: string;
  creditsPerEuro: number;
  minDonation: number;
  maxDonation: number;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
}

const AdminSettings = () => {
  const [settings, setSettings] = useState<Settings | null>(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get("/admin/settings");

      setSettings(response.data.settings);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!settings) return;

    try {
      setSaving(true);

      await api.put("/admin/settings", settings);

      alert("Settings updated successfully");
    } catch (error) {
      console.error(error);

      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Loading settings...</div>;
  }

  if (!settings) {
    return <div>Failed to load settings</div>;
  }

  return (
    <div className="admin-settings">
      <h1>⚙️ Platform Settings</h1>

      <form onSubmit={handleSave} className="settings-form">
        <div className="settings-section">
          <h2>Platform</h2>

          <label>Platform Name</label>

          <input
            type="text"
            value={settings.platformName}
            onChange={(e) =>
              setSettings({
                ...settings,
                platformName: e.target.value,
              })
            }
          />

          <label>Support Email</label>

          <input
            type="email"
            value={settings.supportEmail}
            onChange={(e) =>
              setSettings({
                ...settings,
                supportEmail: e.target.value,
              })
            }
          />

          <label>Contact Phone</label>

          <input
            type="text"
            value={settings.contactPhone}
            onChange={(e) =>
              setSettings({
                ...settings,
                contactPhone: e.target.value,
              })
            }
          />
        </div>

        <div className="settings-section">
          <h2>Voting</h2>

          <label>Credits Per Euro</label>

          <input
            type="number"
            value={settings.creditsPerEuro}
            onChange={(e) =>
              setSettings({
                ...settings,
                creditsPerEuro: Number(e.target.value),
              })
            }
          />
        </div>

        <div className="settings-section">
          <h2>Donations</h2>

          <label>Minimum Donation</label>

          <input
            type="number"
            value={settings.minDonation}
            onChange={(e) =>
              setSettings({
                ...settings,
                minDonation: Number(e.target.value),
              })
            }
          />

          <label>Maximum Donation</label>

          <input
            type="number"
            value={settings.maxDonation}
            onChange={(e) =>
              setSettings({
                ...settings,
                maxDonation: Number(e.target.value),
              })
            }
          />
        </div>

        <div className="settings-section">
          <h2>Security</h2>

          <label>
            <input
              type="checkbox"
              checked={settings.allowRegistration}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  allowRegistration: e.target.checked,
                })
              }
            />
            Allow Registration
          </label>

          <label>
            <input
              type="checkbox"
              checked={settings.requireEmailVerification}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  requireEmailVerification: e.target.checked,
                })
              }
            />
            Require Email Verification
          </label>
        </div>

        <button type="submit" className="save-btn" disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
