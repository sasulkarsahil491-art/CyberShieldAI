import { useState } from "react";
import API from "../services/api";

function Scan() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setResult(null);

      const token = localStorage.getItem("token");

      const res = await API.post(
        "/scan",
        { url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(res.data.scan || res.data);

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Scan Failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scan-page">

      <h1>🛡 Website Security Scanner</h1>

      <form onSubmit={handleScan}>

        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        <button type="submit">
          Analyze Website
        </button>

      </form>

      {loading && (
        <div className="loading-card">
          <h2>🔍 Scanning Website...</h2>
          <p>
            CyberShieldAI is analyzing the website.
          </p>
        </div>
      )}

      {result && (
        <div className="result-card">

          <h2>🛡 Threat Intelligence Report</h2>

          <div className="report-status">
            {result.riskScore < 30
              ? "🟢 SAFE WEBSITE"
              : result.riskScore < 70
              ? "🟡 SUSPICIOUS WEBSITE"
              : "🔴 HIGH RISK WEBSITE"}
          </div>

          <div className="url-box">
            <strong>URL:</strong>

            <p className="url-text">
              {result.url}
            </p>
          </div>

          <p>
            <strong>Risk Score:</strong>{" "}
            {result.riskScore}/100
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {result.status}
          </p>

          <p>
            <strong>Recommendation:</strong>{" "}
            {result.recommendation}
          </p>

          {result.threats &&
            result.threats.length > 0 && (

            <div className="threat-panel">

              <h3>
                🚨 Threat Indicators
              </h3>

              <div className="threat-list">

                {result.threats.map(
                  (threat, index) => (
                    <span
                      key={index}
                      className="threat-badge"
                    >
                      ⚠️ {threat}
                    </span>
                  )
                )}

              </div>

            </div>

          )}

        </div>
      )}

    </div>
  );
}

export default Scan;