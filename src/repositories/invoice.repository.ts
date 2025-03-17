import { Model } from 'mongoose';
import { IInvoice, InvoiceSchema } from '../models/invoice.model';
import { dbConnection } from '../db';
import { Logger } from '../logger';

export class InvoiceRepository {
  private model: Model<IInvoice>;

  private logger = new Logger();

  constructor() {
    this.model = dbConnection.model<IInvoice>('Invoice', InvoiceSchema);
  }

  async getAll(): Promise<IInvoice[]> {
    return await this.model.find();
  }

  async getById(id: string): Promise<IInvoice | null> {
    return await this.model.findById(id);
  }

  async create(invoiceData: Partial<IInvoice>): Promise<IInvoice> {
    const newInvoice = new this.model(invoiceData);
    return await newInvoice.save();
  }

  async update(
    id: string,
    invoiceData: Partial<IInvoice>
  ): Promise<IInvoice | null> {
    try {
      const updatedInvoice = await this.model.findByIdAndUpdate(
        id,
        invoiceData,
        { new: true }
      );
      console.log('Invoice updated successfully:', updatedInvoice);
    } catch (error: any) {
      if (error.name === 'VersionError') {
        console.log('Optimistic concurrency error detected. Retrying...');
        return this.update(id, invoiceData); // Retry updating
      }
      console.error('Update failed:', error);
    }
    return await this.model.findByIdAndUpdate(id, invoiceData, { new: true });
  }

  async delete(id: string): Promise<IInvoice | null> {
    return await this.model.findByIdAndDelete(id);
  }
}
