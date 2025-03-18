export enum PayStatus {
  PAID = 'paid',
  UNPAID = 'unpaid',
  OVERDUE = 'overdue',
  PARTIALLY_PAID = 'partially_paid',
}

export enum PayMethod {
  NONE = 'none',
  CREDIT_CARD = 'credit_card',
  BANK_TRANSFER = 'bank_transfer',
  PAYPAL = 'paypal',
  CASH = 'cash',
  CHECK = 'check',
  OTHER = 'other',
}
