import app from "./app"; // ✅ Use `app` directly

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
