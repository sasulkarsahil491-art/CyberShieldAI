import { FaLink, FaSearch, FaFileAlt } from "react-icons/fa";

function HowItWorks() {
  return (
    <section id="how" className="features">
      <h2>How CyberShieldAI Works</h2>

      <div className="feature-grid">
        <div className="feature-card">
          <FaLink className="feature-icon" />
          <h3>Paste URL</h3>
          <p>Enter the website URL you want to analyze.</p>
        </div>

        <div className="feature-card">
          <FaSearch className="feature-icon" />
          <h3>AI Analysis</h3>
          <p>Our engine checks for phishing, fraud and suspicious patterns.</p>
        </div>

        <div className="feature-card">
          <FaFileAlt className="feature-icon" />
          <h3>Get Report</h3>
          <p>Receive a complete threat intelligence report instantly.</p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;