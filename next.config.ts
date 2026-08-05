import type { NextConfig } from "next";

const API_URL = process.env.API_URL || "http://192.168.1.133:3001/api";
// La carpeta de uploads cuelga de la raiz del backend, no de /api
const BACKEND_URL = API_URL.replace(/\/api\/?$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: `${BACKEND_URL}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;