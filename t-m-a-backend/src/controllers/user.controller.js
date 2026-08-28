import pool from "../db.js";

export const createUser = async (req, res) => {
  try {
    const { telegram_id, username, first_name, last_name, age } = req.body;

    if (
      telegram_id === undefined ||
      username === undefined ||
      first_name === undefined ||
      last_name === undefined ||
      age === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO users (
        telegram_id,
        username,
        first_name,
        last_name,
        age
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [telegram_id, username, first_name, last_name, age],
    );

    res.status(201).json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Create user error:", error);

    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id DESC");

    res.json({
      success: true,
      users: result.rows,
    });
  } catch (error) {
    console.error("Get users error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get users",
    });
  }
};

export const getUserByTelegramId = async (req, res) => {
  try {
    const { telegram_id } = req.params;

    const result = await pool.query(
      "SELECT * FROM users WHERE telegram_id = $1",
      [telegram_id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        exists: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      exists: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Get user by Telegram ID error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to check user",
    });
  }
};
