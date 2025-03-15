import mongoose, { Schema, Document } from 'mongoose';

export enum PayStatus {
  PAID = 'paid',
  UNPAID = 'unpaid',
  OVERDUE = 'overdue',
}

export interface IInvoice extends Document {
  customerName: string;
  amount: number;
  dueDate: Date;
  status: PayStatus;
}

const InvoiceSchema: Schema = new Schema({
  customerName: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: PayStatus,
    default: PayStatus.UNPAID,
  },
});

export const Invoice = mongoose.model<IInvoice>('Invoice', InvoiceSchema);
