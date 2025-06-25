import { ExpenseCategory, ReceiptStatus } from "./enums";

export interface IReceipt {
  _id: string;
  user_id: string;
  upload_date: string;
  image_url: string;
  status: ReceiptStatus;
  ocr_raw_text?: string;
  processing_error?: string;
}

export interface IExpenseRecord {
  _id: string;
  user_id: string;
  medicine_name?: string;
  facility_name?: string;
  category: ExpenseCategory | string;
  transaction_date?: string;
  total_price: number;
  receipt_id?: string;
  createdAt: string;
  updatedAt: string;
}
