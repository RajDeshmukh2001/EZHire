/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["s3.amazonaws.com"]
    },
    compiler: {
        styledComponents: true
    }
}

module.exports = nextConfig
