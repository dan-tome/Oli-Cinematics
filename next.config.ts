import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.preview.emergentagent.com",
    "*.preview.emergentcf.cloud",
    "*.cluster-2.preview.emergentcf.cloud",
  ],
};

export default nextConfig;
