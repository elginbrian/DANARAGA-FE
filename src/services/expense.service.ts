import api from "./api";
import { IExpenseRecord } from "../types";

export const uploadReceipt = async (formData: FormData): Promise<any> => {
  const response = await api.post("/expenses/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getExpenses = async (params: any): Promise<any> => {
  const response = await api.get("/expenses", { params });
  return response.data;
};

export const getExpenseSummary = async (period: string): Promise<any> => {
  const response = await api.get(`/expenses/summary?period=${period}`);
  return response.data;
};

export const getAIRecommendations = async (): Promise<any> => {
  const response = await api.get("/expenses/recommendations");
  return response.data;
};
