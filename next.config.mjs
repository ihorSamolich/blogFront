/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        SERVER_URL: process.env.SERVER_URL,
        TINY_KEY: process.env.NEXT_PUBLIC_TINY_KEY,
    },
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: "tailwindui.com"
            },
            {
                protocol: 'http',
                hostname: "localhost",
                port: "5170"
            },
            {
                protocol: 'https',
                hostname: "blog.ihor.fun",
            }
        ]
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "20mb",
        },
    },
};

export default nextConfig;
