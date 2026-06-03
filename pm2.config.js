module.exports = {
  apps: [
    {
      name: "oli-cinematics",
      script: "node_modules/.bin/next",
      args: "start",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      error_file: "logs/err.log",
      out_file: "logs/out.log",
      merge_logs: true,
      restart_delay: 3000,
      max_restarts: 10,
    },
  ],
};
