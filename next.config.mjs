/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nkagbbiwfbtugezyxrxf.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  headers: async () => {
    return [
      {
        source: "/",
        headers: [{ key: "X-Custom-Header", value: "hello" }],
      },
    ];
  },
  // output: "export",
};

export default nextConfig;
