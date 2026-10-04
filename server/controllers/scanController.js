const Scan = require("../models/Scan");

// Create Scan
const createScan = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "URL is required",
      });
    }

    if (
      !url.startsWith("http://") &&
      !url.startsWith("https://")
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid URL format",
      });
    }

    let riskScore = 0;
    let status = "Safe";

    const threats = [];

    const lowerUrl = url.toLowerCase();

    // Threat Rules
    if (lowerUrl.includes("login")) {
      riskScore += 30;
      threats.push("Contains login keyword");
    }

    if (lowerUrl.includes("verify")) {
      riskScore += 25;
      threats.push("Contains verify keyword");
    }

    if (lowerUrl.includes("free")) {
      riskScore += 20;
      threats.push("Contains free offer keyword");
    }

    if (lowerUrl.includes("gift")) {
      riskScore += 20;
      threats.push("Contains gift keyword");
    }

    if (lowerUrl.includes("update")) {
      riskScore += 15;
      threats.push("Contains update keyword");
    }

    if (lowerUrl.includes("secure")) {
      riskScore += 15;
      threats.push("Contains secure keyword");
    }

    if (lowerUrl.includes("@")) {
      riskScore += 10;
      threats.push("Contains @ symbol");
    }

    // Short URL Detection
    if (
      lowerUrl.includes("bit.ly") ||
      lowerUrl.includes("tinyurl") ||
      lowerUrl.includes("t.co")
    ) {
      riskScore += 25;
      threats.push("Uses shortened URL");
    }

    // IP Address Detection
    const ipPattern =
      /https?:\/\/(\d{1,3}\.){3}\d{1,3}/;

    if (ipPattern.test(lowerUrl)) {
      riskScore += 40;
      threats.push(
        "Uses IP address instead of domain"
      );
    }

    // Status
    if (riskScore >= 70) {
      status = "Dangerous";
    } else if (riskScore >= 30) {
      status = "Suspicious";
    }

    // Recommendation
    let recommendation =
      "This URL appears safe.";

    if (status === "Suspicious") {
      recommendation =
        "Proceed with caution before entering sensitive information.";
    }

    if (status === "Dangerous") {
      recommendation =
        "Avoid this website. Do not enter passwords, banking details, or personal information.";
    }

    // Save Scan
    const scan = await Scan.create({
      user: req.user.id,
      url,
      riskScore,
      status,
      threats,
      recommendation,
    });

    // Return scan object
    res.status(201).json({
      success: true,
      scan,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Scan History
const getScanHistory = async (req, res) => {
  try {
    const scans = await Scan.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: scans.length,
      scans,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createScan,
  getScanHistory,
};