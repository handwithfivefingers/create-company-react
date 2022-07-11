module.exports = {
  apps: [
    {
      name: 'CC_v_0.5',
      script: './App.js',
      watch: ['build', 'server'],
      exec_mode: 'cluster',
      autorestart: true,
      max_memory_restart: '1G',
      error_file: './uploads/logs/error.log',
      out_file: './uploads/logs/out.log',
    },
  ],
};
