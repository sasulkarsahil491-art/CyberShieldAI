import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaShieldAlt } from "react-icons/fa";
import API from "../services/api";

const USER_ID_PATTERN = /^[a-z0-9][a-z0-9._-]{1,22}[a-z0-9]$/;

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const normalizedUserId = userId.trim().toLowerCase();
    const normalizedEmail = email.trim().toLowerCase();

    if (!USER_ID_PATTERN.test(normalizedUserId)) {
      setError("Choose a User ID with 3–24 letters, numbers, dots, underscores, or hyphens; it must start and end with a letter or number.");
      return;
    }

    if (password.length < 12) {
      setError("Use a password with at least 12 characters.");
      return;
    }

    if (new TextEncoder().encode(password).length > 72) {
      setError("Password must be 72 bytes or fewer.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const res = await API.post("/auth/register", {
        name: name.trim(),
        userId: normalizedUserId,
        email: normalizedEmail,
        password,
      });

      const registeredUserId = res.data.user?.userId || normalizedUserId;
      alert("Account created. Your User ID is " + registeredUserId + ".");
      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <FaShieldAlt />
          <span>CyberShieldAI</span>
        </div>

        <h1>Create Account</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Name"
            autoComplete="name"
            maxLength={80}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Choose User ID"
            autoComplete="username"
            minLength={3}
            maxLength={24}
            pattern="[A-Za-z0-9][A-Za-z0-9._-]{1,22}[A-Za-z0-9]"
            title="3–24 letters, numbers, dots, underscores, or hyphens; start and end with a letter or number."
            value={userId}
            onChange={(e) => setUserId(e.target.value.toLowerCase())}
            required
          />
          <p className="auth-hint">Your User ID must be unique and will appear on your profile.</p>

          <input
            type="email"
            placeholder="Enter Email"
            autoComplete="email"
            maxLength={254}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            autoComplete="new-password"
            minLength={12}
            maxLength={72}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby="password-requirement"
            required
          />
          <p className="auth-hint" id="password-requirement">Use at least 12 characters. A longer passphrase is even better.</p>

          <input
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
            minLength={12}
            maxLength={72}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="auth-message auth-error" role="alert">{error}</p>}

          <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
            {isSubmitting ? "Creating Account…" : "Register"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;