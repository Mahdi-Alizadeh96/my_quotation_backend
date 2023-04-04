module.exports = {
  apps: [{
    name: 'my_quotation_project_backend',
    script: './dist/app.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    // Restart options
    autorestart: true,
    max_restarts: 10,
    min_uptime: '1m',
    // Delay between restarts
    restart_delay: 1000,
    // Maximum memory usage per process
    max_memory_restart: '1G',
    watch: true,
    instances: 1,
    exec_mode: 'cluster',
    error_file: 'logs/error.log',
    out_file: 'logs/out.log'
  }]
}
