import { model, Schema } from 'mongoose';

export interface ILineItem extends Document {
  description: string;
  quantity: number;
  price: number;
}

const LineItemSchema = new Schema<ILineItem>({
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

export const LineItem = model<ILineItem>('LineItem', LineItemSchema);
