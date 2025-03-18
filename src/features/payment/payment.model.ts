import { model, Schema } from 'mongoose';
import { PayMethod } from '../../enums';

export interface IPayment extends Document {
  amount: number;
  date: Date;
  payMethod?: PayMethod;
}

const PaymentSchema = new Schema<IPayment>({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  payMethod: {
    type: String,
    enum: Object.values(PayMethod),
    default: PayMethod.NONE,
  },
});

export const LineItem = model<IPayment>('LineItem', PaymentSchema);
