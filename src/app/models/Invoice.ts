import { LocalDateTime } from '@js-joda/core';

export class Invoice {
  id!: number;
  creationDate!: LocalDateTime;
  InvoiceRef!: string;

}
