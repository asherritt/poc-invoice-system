import Hapi from '@hapi/hapi';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import invoiceRoutes from './features/invoice/invoice.routes';
import { Logger } from './logger';
import { Database } from './db';
import customerRoutes from './features/customer/customer.routes';

dotenv.config();

const logger = new Logger();

const init = async () => {
  const server = Hapi.server({
    port: process.env.HAPI_PORT || 3000,
    host: 'localhost',
  });

  // Connect to MongoDB
  Database.connect();

  // Register routes
  server.route(invoiceRoutes);
  server.route(customerRoutes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (error: Error) => {
  logger.error(error.message, error);
  process.exit(1);
});

init();
