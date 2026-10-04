import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaSearch,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

import API from "../services/api";
import SecurityChart from "../components/SecurityChart";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    safe: 0,
    suspicious: 0,
  });

  const [recentScans, setRecentScans] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/scan/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const scans = res.data.scans || [];

        setStats({
          total: scans.length,
          safe: scans.filter(
            (scan) => scan.status === "Safe"
          ).length,
          suspicious: scans.filter(
            (scan) =>
              scan.status === "Suspicious" ||
              scan.status === "Dangerous"
          ).length,
        });

        setRecentScans(scans.slice(0, 5));
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  const filteredScans = recentScans.filter((scan) =>
    scan.url
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <h1>🛡️ CyberShieldAI Dashboard</h1>

        <p>
          Monitor phishing threats, analyze websites
          and stay safe online.
        </p>

        <div className="dashboard-buttons">

          <Link to="/scan">
            <button className="hero-scan-btn">
              🚀 Scan Website Now
            </button>
          </Link>

          <Link to="/history">
            <button className="history-btn">
              📜 Scan History
            </button>
          </Link>

          <Link to="/profile">
            <button className="history-btn">
              👤 Profile
            </button>
          </Link>

        </div>

      </div>

      <div className="welcome-card">

        <h2>
          Welcome to CyberShieldAI 🛡️
        </h2>

        <p>
          Analyze websites, detect phishing threats,
          and protect your online identity with
          AI-powered security.
        </p>

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <FaSearch className="card-icon" />
          <h2>{stats.total}</h2>
          <p>Total Scans</p>
        </div>

        <div className="stat-card">
          <FaCheckCircle className="card-icon green" />
          <h2>{stats.safe}</h2>
          <p>Safe Websites</p>
        </div>

        <div className="stat-card">
          <FaExclamationTriangle className="card-icon yellow" />
          <h2>{stats.suspicious}</h2>
          <p>Suspicious Sites</p>
        </div>

      </div>

      <SecurityChart />

      <div className="dashboard-panel">

        <h2>📜 Recent Scans</h2>

        <input
          type="text"
          placeholder="🔍 Search scanned URLs..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="scan-search"
        />

        {filteredScans.length > 0 ? (

          <ul>

            {filteredScans.map((scan) => (

              <li key={scan._id}>

                <div className="scan-url">
                  {scan.url}
                </div>

                <p>
                  <strong>Status:</strong>{" "}
                  {scan.status}
                </p>

                <p>
                  <strong>Risk Score:</strong>{" "}
                  {scan.riskScore}/100
                </p>

              </li>

            ))}

          </ul>

        ) : (

          <p>No matching scans found.</p>

        )}

      </div>

      <div className="dashboard-panel">

        <h2>
          <FaShieldAlt /> Security Tips
        </h2>

        <ul>
          <li>
            Verify website URLs before entering credentials.
          </li>
          <li>
            Never share OTPs or passwords.
          </li>
          <li>
            Enable Two-Factor Authentication.
          </li>
          <li>
            Avoid clicking unknown links.
          </li>
          <li>
            Keep software and browsers updated.
          </li>
        </ul>

      </div>

    </div>
  );
}

export default Dashboard;