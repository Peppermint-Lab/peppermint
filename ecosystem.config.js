module.exports = {
  apps: [
    {
      name: "client",
      script: "npm run start",
      cwd: "apps/client",
      instances: "1",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: 3000, // Change this to your desired port
      },
    },
    {
      name: "api",
      script: "node",
      args: "dist/main.js",
      cwd: "apps/api",
      instances: "1",
      autorestart: true,
      watch: false,
      restart_delay: 3000,
      env: {
        NODE_ENV: "production",
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_HOST: process.env.DB_HOST,
        secret: process.env.SECRET,
      },
    },
  ],
};
