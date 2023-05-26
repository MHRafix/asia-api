import { registerEnumType } from '@nestjs/graphql';

export enum BOOKING_STATUS {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED',
}

export enum PAYMENT_STATUS {
  DUE = 'DUE',
  IN_REVIEW_PAID = 'IN_REVIEW_PAID',
  PAID = 'PAID',
}

export enum PAYMENT_METHOD {
  ONLINE = 'ONLINE',
  BANK = 'BANK',
  NONE = 'NONE',
  BKASH = 'BKASH',
  NAGAD = 'NAGAD',
  ROCKET = 'ROCKET',
}

registerEnumType(PAYMENT_METHOD, {
  name: 'PAYMENT_METHOD',
});

registerEnumType(BOOKING_STATUS, {
  name: 'BOOKING_STATUS',
});

registerEnumType(PAYMENT_STATUS, {
  name: 'PAYMENT_STATUS',
});
