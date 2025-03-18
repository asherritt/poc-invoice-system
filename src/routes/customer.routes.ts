import { ServerRoute } from '@hapi/hapi';
import { Logger } from '../logger';
import { CustomerRepository } from '../repositories/customer.repository';

const logger = new Logger();
const customerRepo = new CustomerRepository();

const customerRoutes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/customers',
    handler: async () => {
      logger.info('Fetching all customers');
      return await customerRepo.getAll();
    },
  },
  {
    method: 'POST',
    path: '/customers',
    handler: async (request) => {
      logger.info('Creating a new customer', request.payload);
      return await customerRepo.create(request.payload as any);
    },
  },
  {
    method: 'GET',
    path: '/customers/{id}',
    handler: async (request) => {
      logger.info('Fetching customer by ID', { id: request.params.id });
      return await customerRepo.getById(request.params.id);
    },
  },
  {
    method: 'PATCH',
    path: '/customers/{id}',
    handler: async (request) => {
      logger.info('Updating customer by ID', { id: request.params.id });
      return await customerRepo.update(
        request.params.id,
        request.payload as any
      );
    },
  },
  {
    method: 'DELETE',
    path: '/customers/{id}',
    handler: async (request) => {
      logger.info('Deleting customer by ID', { id: request.params.id });
      return await customerRepo.delete(request.params.id);
    },
  },
  {
    method: 'POST',
    path: '/customers/{id}/invoices',
    handler: async (request) => {
      logger.info('Adding invoice to customer', {
        customerId: request.params.id,
        invoiceId: request.payload,
      });
      return await customerRepo.addInvoice(
        request.params.id,
        request.payload as any
      );
    },
  },
];

export default customerRoutes;
