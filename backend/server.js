const app = require('./src/app');
const { sequelize } = require('./src/models');
const { PORT, NODE_ENV } = require('./src/config/env');

const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    console.log(`📡 Environment: ${NODE_ENV}`);
    
    // NO AUTO-SYNC - Only use migrations
    console.log('✅ Using migrations for database schema (no auto-sync)');
    console.log('📝 Make sure migrations are run before starting the server');

    // Start server
    app.listen(PORT, () => {
      console.log(`\n🚀 Server is running!`);
      console.log(`🔗 Local: http://localhost:${PORT}`);
      console.log(`🔗 API Base: http://localhost:${PORT}/api`);
      console.log(`🔗 Health Check: http://localhost:${PORT}/health\n`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error.message);
    console.error('💡 Make sure PostgreSQL is running and migrations are executed');
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received. Closing server gracefully...`);
  try {
    await sequelize.close();
    console.log('✅ Database connections closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
