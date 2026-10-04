const Scan = require("../models/Scan");

const getDashboardStats = async (req, res) => {
  const scans = await Scan.find({
    user: req.user.id,
  });

  const totalScans = scans.length;

  const safe = scans.filter(
    (scan) => scan.status === "Safe"
  ).length;

  const dangerous = scans.filter(
    (scan) => scan.status === "Dangerous"
  ).length;

  const suspicious = scans.filter(
    (scan) => scan.status === "Suspicious"
  ).length;

  res.status(200).json({
    success: true,
    totalScans,
    safe,
    dangerous,
    suspicious,
  });
};

module.exports = {
  getDashboardStats,
};