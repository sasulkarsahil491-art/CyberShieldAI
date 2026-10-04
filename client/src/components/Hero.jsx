import { motion } from "framer-motion";
import { FaShieldAlt } from "react-icons/fa";

function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-icon">
          <FaShieldAlt />
        </div>

        <h1>
          Stay Safe From
          <span> Online Scams</span>
        </h1>

        <p>
          Analyze suspicious websites, detect phishing attacks,
          and protect your personal information before it's too late.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            Analyze Website
          </button>

          <button className="secondary-btn">
            Learn More
          </button>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;