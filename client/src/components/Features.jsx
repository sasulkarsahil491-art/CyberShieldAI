import {
  FaShieldAlt,
  FaBolt,
  FaChartLine,
  FaLock,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Scam Detection",
      desc: "Identify suspicious and fraudulent websites instantly.",
    },
    {
      icon: <FaBolt />,
      title: "Instant Analysis",
      desc: "Get security reports in seconds.",
    },
    {
      icon: <FaChartLine />,
      title: "Threat Intelligence",
      desc: "Understand why a website is risky.",
    },
    {
      icon: <FaLock />,
      title: "Privacy Protection",
      desc: "Keep your personal information safe.",
    },
  ];

  return (
    <section id="features" className="features">
      <h2>Why Choose CyberShieldAI?</h2>

      <div className="feature-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;