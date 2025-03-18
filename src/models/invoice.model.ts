import { Schema, Document, Types, model } from 'mongoose';
import { ILineItem } from './lineitem.model';

export enum PayStatus {
  PAID = 'paid',
  UNPAID = 'unpaid',
  OVERDUE = 'overdue',
}

export interface IInvoice extends Document {
  customer: Types.ObjectId;
  lineItems: ILineItem[];
  totalAmount: number;
  dueDate: Date;
  status: PayStatus;
}

export const InvoiceSchema: Schema = new Schema(
  {
    customerName: { type: String, required: true },
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: Object.values(PayStatus),
      default: PayStatus.UNPAID,
    },
  },
  { versionKey: '__v', optimisticConcurrency: true }
);

export const Invoice = model<IInvoice>('Invoice', InvoiceSchema);
