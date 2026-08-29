import express from "express";
import crypto from "crypto";

const router = express.Router();

router.post("/telegram", (req, res) => {
  try {
    const { initData } = req.body;

    if (!initData) {
      return res.status(400).json({
        success: false,
        message: "Telegram initData is required",
      });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!botToken) {
      return res.status(500).json({
        success: false,
        message: "Telegram bot token is not configured",
      });
    }

    const params = new URLSearchParams(initData);
    const receivedHash = params.get("hash");

    if (!receivedHash) {
      return res.status(401).json({
        success: false,
        message: "Telegram hash is missing",
      });
    }

    params.delete("hash");

    const dataCheckString = [...params.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join("\n");

    const secretKey = crypto
      .createHmac("sha256", "WebAppData")
      .update(botToken)
      .digest();

    const calculatedHash = crypto
      .createHmac("sha256", secretKey)
      .update(dataCheckString)
      .digest("hex");

    if (calculatedHash !== receivedHash) {
      return res.status(401).json({
        success: false,
        message: "Invalid Telegram initData",
      });
    }

    const userData = params.get("user");

    const user = userData ? JSON.parse(userData) : null;

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Telegram authentication error:", error);

    return res.status(500).json({
      success: false,
      message: "Telegram authentication failed",
    });
  }
});

export default router;
