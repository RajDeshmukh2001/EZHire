/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["s3.amazonaws.com", "avatars.githubusercontent.com", "lh3.googleusercontent.com", "res.cloudinary.com", "cdn-icons-png.flaticon.com"]
    },
    compiler: {
        styledComponents: true
    }
}

module.exports = nextConfig
