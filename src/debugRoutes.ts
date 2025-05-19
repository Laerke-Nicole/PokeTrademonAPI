import app from "./app";

// ✅ Properly type `stack` to avoid implicit `any` errors
const routes = app._router.stack
  .filter((r: any) => r.route)
  .map((r: any) => r.route.path);