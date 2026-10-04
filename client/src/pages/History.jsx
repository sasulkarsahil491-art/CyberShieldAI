import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get(
          "/scan/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setHistory(res.data.scans || []);
      } catch (error) {
        console.error(
          "History Error:",
          error.response?.data || error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-page">

      <div className="history-header">

        <div>
          <p className="history-label">
            SECURITY ACTIVITY
          </p>

          <h1>Scan History</h1>

          <p>
            Review your previously analyzed
            websites and their risk results.
          </p>
        </div>

        <Link to="/dashboard">
          <button className="back-dashboard-btn">
            ← Dashboard
          </button>
        </Link>

      </div>

      {loading ? (

        <div className="history-loading">
          Loading scan history...
        </div>

      ) : history.length > 0 ? (

        <div className="history-grid">

          {history.map((item) => (

            <div
              className="history-card"
              key={item._id}
            >

              <div className="history-card-top">

                <span
                  className={`history-status ${
                    item.status?.toLowerCase()
                  }`}
                >
                  {item.status}
                </span>

                <span className="history-score">
                  {item.riskScore}/100
                </span>

              </div>

              <h3
                style={{
                  wordBreak: "break-word",
                }}
              >
                {item.url}
              </h3>

              <p>
                <strong>Risk Score:</strong>{" "}
                {item.riskScore}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {item.status}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {item.createdAt
                  ? new Date(
                      item.createdAt
                    ).toLocaleString()
                  : "N/A"}
              </p>

              {item.recommendation && (

                <div className="history-recommendation">

                  <strong>
                    Recommendation
                  </strong>

                  <p>
                    {item.recommendation}
                  </p>

                </div>

              )}

            </div>

          ))}

        </div>

      ) : (

        <div className="history-empty">

          <h2>
            No Scan History Yet
          </h2>

          <p>
            Analyze your first website
            to start building your
            security history.
          </p>

          <Link to="/scan">
            <button className="hero-scan-btn">
              Scan Website
            </button>
          </Link>

        </div>

      )}

    </div>
  );
}

export default History;