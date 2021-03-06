module.exports = {
  apps: [
    {
      name: 'CC_v_0.5',
      script: './App.js',
      watch: ['build', 'server', 'App.js'],
      ignore_watch: ['node_modules', 'uploads', 'src'],
      exec_mode: 'cluster',
      autorestart: true,
      max_memory_restart: '1G',
      error_file: './uploads/logs/error.log',
      out_file: './uploads/logs/out.log',
      log_date_format: 'CC_LOGS ::: HH:mm Z ::: DD-MM-YYYY',
      combine_logs: true,
    },
  ],
};
