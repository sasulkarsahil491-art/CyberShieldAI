import { FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  const isLoggedIn = localStorage.getItem("token");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <nav className="navbar">

      <div className="logo">
        <FaShieldAlt />
        <span>CyberShieldAI</span>
      </div>

      <div className="nav-links">

        <Link to="/" className="nav-btn">
          Home
        </Link>

        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="nav-btn">
              Dashboard
            </Link>

            <Link to="/scan" className="nav-btn">
              Scan
            </Link>

            <Link to="/history" className="nav-btn">
              History
            </Link>

            <Link to="/profile" className="nav-btn">
              Profile
            </Link>

            <button
              type="button"
              className="logout-btn"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn">
              Login
            </Link>

            <Link
              to="/register"
              className="nav-btn-primary"
            >
              Register
            </Link>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;