import { Model, Types } from 'mongoose';
import { IInvoice, InvoiceSchema } from './invoice.model';
import { dbConnection } from '../../db';
import { Logger } from '../../logger';
import { Customer } from '../customer/customer.model';

export class InvoiceRepository {
  private model: Model<IInvoice>;

  private logger = new Logger();

  constructor() {
    this.model = dbConnection.model<IInvoice>('Invoice', InvoiceSchema);
  }

  async getById(id: string): Promise<IInvoice | null> {
    return this.model.findById(id).populate('customer').exec();
  }

  async getAllByCustomerId(customerId: string): Promise<IInvoice[]> {
    return this.model
      .find({ customer: new Types.ObjectId(customerId) })
      .populate('customer')
      .exec();
  }

  async create(invoiceData: Partial<IInvoice>): Promise<IInvoice> {
    try {
      // Create the invoice
      const invoice = new this.model(invoiceData);
      const savedInvoice = await invoice.save();

      // Push the invoice ID to the customer's invoices array
      await Customer.findByIdAndUpdate(savedInvoice.customer, {
        $push: { invoices: savedInvoice._id },
      });

      // Populate the customer but exclude the `invoices` array
      return await savedInvoice.populate({
        path: 'customer',
        select: '-invoices', // Exclude invoices field
      });
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw new Error('Failed to create invoice.');
    }
  }

  async update(
    id: string,
    invoiceData: Partial<IInvoice>
  ): Promise<IInvoice | null> {
    return this.model
      .findByIdAndUpdate(id, invoiceData, { new: true })
      .populate('customer')
      .exec();
  }

  async delete(id: string): Promise<IInvoice | null> {
    return this.model.findByIdAndDelete(id).populate('customer').exec();
  }
}
