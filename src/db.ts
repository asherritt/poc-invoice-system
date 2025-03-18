import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Logger } from './logger';

dotenv.config();

const logger = new Logger();

mongoose.set('debug', true);

const MONGO_URI = process.env.MONGO_URI || '';
const READ_PREFERENCE = process.env.READ_PREFERENCE || 'secondaryPreferred'; // Can be 'secondaryPreferred'
const DB_NAME = 'poc_invoice_system';

export class Database {
  static async connect(): Promise<void> {
    try {
      await mongoose.connect(
        `${MONGO_URI}/${DB_NAME}?replicaSet=rs0`,
        Database.getConnectionOptions()
      );

      logger.info('MongoDB Connected');

      mongoose.connection.on('connected', () =>
        logger.info('Database Connected')
      );
      mongoose.connection.on('error', (err) =>
        logger.error('Database Connection Error:', err)
      );
      mongoose.connection.on('disconnected', () =>
        logger.warn('Database Disconnected')
      );

      // Auto-reconnect if the DB goes down
      process.on('SIGINT', async () => {
        await Database.close();
        process.exit(0);
      });
    } catch (error) {
      logger.error('Database connection failed:', error);
      process.exit(1);
    }
  }
  static getConnectionOptions(): mongoose.ConnectOptions {
    return {
      readPreference: READ_PREFERENCE as mongoose.mongo.ReadPreferenceMode,
    };
  }

  static async close(): Promise<void> {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed');
  }
}

export const dbConnection = mongoose.connection;
