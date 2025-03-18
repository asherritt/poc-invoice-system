import { Schema, model, Document, Types } from 'mongoose';
import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({
  length: 8,
  dictionary: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
});

export interface ICustomer extends Document {
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  invoices: Types.ObjectId[];
}

const CustomerSchema = new Schema<ICustomer>({
  customerId: {
    type: String,
    default: () => uid.randomUUID(8), // Generate short unique ID
    unique: true,
    immutable: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  invoices: [{ type: Schema.Types.ObjectId, ref: 'Invoice' }],
});

export const Customer = model<ICustomer>('Customer', CustomerSchema);
