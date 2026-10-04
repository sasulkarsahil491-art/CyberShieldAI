import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <h1>🔒 Access Denied</h1>

        <p>
          Please login to access CyberShieldAI.
        </p>

        <div className="dashboard-buttons">

          <Link to="/login">
            <button className="hero-scan-btn">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="history-btn">
              Register
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Unauthorized;