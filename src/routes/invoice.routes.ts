import { ServerRoute } from '@hapi/hapi';
import { InvoiceRepository } from '../repositories/invoice.repository';
import { Logger } from '../logger';

const invoiceRepo = new InvoiceRepository();

const logger = new Logger();

const invoiceRoutes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/invoices',
    handler: async () => {
      logger.info('Getting all invoices');
      return await invoiceRepo.getAll();
    },
  },
  {
    method: 'POST',
    path: '/invoices',
    handler: async (request) => {
      logger.info('Creating a new invoice', request.payload);
      return await invoiceRepo.create(request.payload as any);
    },
  },
  {
    method: 'GET',
    path: '/invoices/{id}',
    handler: async (request) => {
      logger.info('Getting invoice by id', { id: request.params.id });
      return await invoiceRepo.getById(request.params.id);
    },
  },
  {
    method: 'PATCH',
    path: '/invoices/{id}',
    handler: async (request) => {
      logger.info('Updating invoice by id', { id: request.params.id });
      return await invoiceRepo.update(
        request.params.id,
        request.payload as any
      );
    },
  },
  {
    method: 'DELETE',
    path: '/invoices/{id}',
    handler: async (request) => {
      logger.info('Deleting invoice by id', { id: request.params.id });
      return await invoiceRepo.delete(request.params.id);
    },
  },
];

export default invoiceRoutes;
