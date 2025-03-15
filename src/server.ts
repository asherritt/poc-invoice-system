import Hapi from '@hapi/hapi';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import invoiceRoutes from './routes/invoice.routes';
import { Logger } from './logger';

dotenv.config();

const logger = new Logger();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
  });

  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    logger.info('MongoDB connected...');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }

  // Register routes
  server.route(invoiceRoutes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (error: Error) => {
  logger.error(error.message, error);
  process.exit(1);
});

init();
