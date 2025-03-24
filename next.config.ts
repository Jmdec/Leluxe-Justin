module.exports = {
    images: {
      domains: ['wfnqz0req3ou2cgg.public.blob.vercel-storage.com'],
    },
    env:{
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "fallback_secret",
    }
  };
  