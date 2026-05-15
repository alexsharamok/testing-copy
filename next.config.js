// next.config.mjs
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          destination: "/prod.html",
        },
        {
          source: "/:path((?!.*\\..*).*)",
          destination: "/:path/prod.html",
        },
      ],
    };
  },
};

export default nextConfig;
