import { Model } from 'mongoose';
import { Customer, ICustomer } from './customer.model';

export class CustomerRepository {
  private model: Model<ICustomer>;

  constructor() {
    this.model = Customer;
  }

  async getAll(): Promise<ICustomer[]> {
    return await this.model.find();
  }

  /**
   * Create a new customer
   */
  async create(customerData: Partial<ICustomer>): Promise<ICustomer> {
    const customer = new this.model(customerData);
    return await customer.save();
  }

  /**
   * Get a customer by their MongoDB _id
   */
  async getById(id: string): Promise<ICustomer | null> {
    return await this.model.findById(id).populate('invoices');
  }

  /**
   * Get a customer by their unique customerId
   */
  async getByCustomerId(customerId: string): Promise<ICustomer | null> {
    return await this.model.findOne({ customerId }).populate('invoices');
  }

  /**
   * Get a customer by email
   */
  async getByEmail(email: string): Promise<ICustomer | null> {
    return await this.model.findOne({ email }).populate('invoices');
  }

  /**
   * Update a customer by their MongoDB _id
   */
  async update(
    id: string,
    customerData: Partial<ICustomer>
  ): Promise<ICustomer | null> {
    return await this.model.findByIdAndUpdate(id, customerData, {
      new: true,
      runValidators: true,
    });
  }

  /**
   * Delete a customer by their MongoDB _id
   */
  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id);
    return result !== null;
  }

  /**
   * Add an invoice reference to a customer.
   * Return the updated customer document.
   */
  async addInvoice(
    customerId: string,
    invoiceId: string
  ): Promise<ICustomer | null> {
    return await this.model.findOneAndUpdate(
      { customerId },
      { $push: { invoices: invoiceId } },
      { new: true }
    );
  }
}
