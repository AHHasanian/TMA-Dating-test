export const healthCheck = (req, res) => {
  res.json({
    status: "ok",
    message: "Backend is running",
  });
};
