import { Invoice, IInvoice } from '../models/invoice.model';

export class InvoiceRepository {
  async getAll(): Promise<IInvoice[]> {
    return await Invoice.find();
  }

  async getById(id: string): Promise<IInvoice | null> {
    return await Invoice.findById(id);
  }

  async create(invoiceData: Partial<IInvoice>): Promise<IInvoice> {
    const newInvoice = new Invoice(invoiceData);
    return await newInvoice.save();
  }

  async update(
    id: string,
    invoiceData: Partial<IInvoice>
  ): Promise<IInvoice | null> {
    return await Invoice.findByIdAndUpdate(id, invoiceData, { new: true });
  }

  async delete(id: string): Promise<IInvoice | null> {
    return await Invoice.findByIdAndDelete(id);
  }
}
