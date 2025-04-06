import * as z from 'zod';

const DiscountDetailsSchema = z.object({
  amount: z.number(),
  amountType: z.string(),
});

const ItemSchema = z.object({
  name: z.string(),
  description: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  total: z.string(),
});

const PaymentInformationSchema = z.object({
  bankName: z.string(),
  accountName: z.string(),
  accountNumber: z.string(),
});

const ShippingDetailsSchema = z.object({
  cost: z.number(),
  costType: z.string(),
});

const TaxDetailsSchema = z.object({
  amount: z.number(),
  amountType: z.string(),
  taxID: z.string(),
});

const ReceiverSchema = z.object({
  name: z.string(),
  address: z.string(),
  zipCode: z.string(),
  city: z.string(),
  country: z.string(),
  email: z.string(),
  phone: z.string(),
  customInputs: z.array(z.any()),
});

const DetailsSchema = z.object({
  invoiceLogo: z.string(),
  invoiceNumber: z.string(),
  invoiceDate: z.string(),
  dueDate: z.string(),
  items: z.array(ItemSchema),
  currency: z.string(),
  language: z.string(),
  taxDetails: TaxDetailsSchema,
  discountDetails: DiscountDetailsSchema,
  shippingDetails: ShippingDetailsSchema,
  paymentInformation: PaymentInformationSchema,
  additionalNotes: z.string(),
  paymentTerms: z.string(),
  totalAmountInWords: z.string(),
  pdfTemplate: z.number(),
  subTotal: z.number(),
  totalAmount: z.number(),
});

export const UploadInvoiceSchema = z.object({
  sender: ReceiverSchema,
  receiver: ReceiverSchema,
  details: DetailsSchema,
});
export type UploadInvoiceDto = z.infer<typeof UploadInvoiceSchema>;
