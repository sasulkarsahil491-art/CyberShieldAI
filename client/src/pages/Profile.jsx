import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get(
          "/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data.user);
      } catch (error) {
        console.log(
          "Profile Error:",
          error.response?.data || error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Loading Profile...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1>👤 My Profile</h1>
        <p>Manage your CyberShieldAI account</p>
      </div>

      <div className="dashboard-panel">

        <div className="profile-card">

          <div className="profile-avatar">
            👤
          </div>

          <h2>
            {user?.name || "User"}
          </h2>

          <p>
            {user?.email || "No Email"}
          </p>

          <div
            style={{
              marginTop: "20px",
              textAlign: "left",
            }}
          >
            <p>
              <strong>User ID:</strong>{" "}
              {user?.userId || user?._id}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;