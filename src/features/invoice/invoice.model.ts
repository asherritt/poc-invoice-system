import { Schema, Document, Types, model } from 'mongoose';
import { ILineItem, LineItemSchema } from '../lineitem/lineitem.model';
import { PayStatus } from '../../enums'; // Assuming you store enums separately
import { ICustomer } from '../customer/customer.model';
import { Logger } from '../../logger';

export interface IInvoice extends Document {
  customer: Types.ObjectId | ICustomer;
  lineItems: ILineItem[];
  totalAmount: number;
  dueDate: Date;
  status: PayStatus;
}

const logger = new Logger();

export const InvoiceSchema: Schema = new Schema(
  {
    customer: {
      type: Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    lineItems: [LineItemSchema],
    totalAmount: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: Object.values(PayStatus),
      default: PayStatus.UNPAID,
    },
  },
  { versionKey: '__v', optimisticConcurrency: true }
);

// Middleware to Auto-Calculate Total Amount
InvoiceSchema.pre<IInvoice>('save', function (next) {
  this.totalAmount = this.lineItems.reduce(
    (sum: number, item: ILineItem) => sum + item.price * item.quantity,
    0
  );
  next();
});

InvoiceSchema.post<IInvoice>('save', function (doc) {
  logger.info('Invoice saved:', doc);
});

export const Invoice = model<IInvoice>('Invoice', InvoiceSchema);
