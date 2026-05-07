// next.config.mjs
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          destination: "/index.html",
        },
        {
          source: "/:path((?!.*\\..*).*)",
          destination: "/:path/index.html",
        },
      ],
    };
  },
};

export default nextConfig;
