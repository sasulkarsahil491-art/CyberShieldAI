import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1>404 😵</h1>

        <p>
          The page you are looking for does not exist.
        </p>

        <Link to="/">
          <button className="hero-scan-btn">
            🏠 Go Home
          </button>
        </Link>

      </div>

    </div>
  );
}

export default NotFound;