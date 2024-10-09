/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        outputFileTracingIncludes: {
            '/api/search': ['../docs/**/*', '../README.md'],
        },
    }
};

export default nextConfig;
