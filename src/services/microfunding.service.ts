import api from "./api";
import { IMicrofundingPool, IContribution, IDisbursement, IJoinRequest, IPoolMember, JoinRequestStatus, ContributionStatus, DisbursementStatus, VoteOption } from "../types";

export interface CreatePoolRequest extends Partial<Omit<IMicrofundingPool, "_id" | "creator_user_id" | "current_amount" | "status">> {
  title: string;
  description: string;
  max_members: number;
  contribution_amount_per_member: number;
}

export interface UpdatePoolRequest extends Partial<Omit<IMicrofundingPool, "_id" | "creator_user_id" | "pool_code">> {}

export interface RequestToJoinPoolRequest {
  pool_code: string;
}

export interface UpdateJoinRequestStatusRequest {
  status: "APPROVED" | "REJECTED";
}

export interface CreateContributionRequest {
  amount: number;
}

export interface CreateDisbursementRequest extends Pick<IDisbursement, "recipient_user_id" | "amount" | "purpose"> {
  proof_url?: string;
}

export interface VoteOnDisbursementRequest {
  vote: VoteOption;
  comment?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export const getMyPools = async (): Promise<IMicrofundingPool[]> => {
  const response = await api.get<ApiResponse<{ pools: IMicrofundingPool[] }>>("/microfunding/pools/my-pools");
  return response.data.data.pools;
};

export const getPoolById = async (poolId: string): Promise<IMicrofundingPool> => {
  const response = await api.get<ApiResponse<{ pool: IMicrofundingPool }>>(`/microfunding/pools/${poolId}`);
  return response.data.data.pool;
};

export const createPool = async (poolData: CreatePoolRequest): Promise<IMicrofundingPool> => {
  const response = await api.post<ApiResponse<{ pool: IMicrofundingPool }>>("/microfunding/pools", poolData);
  return response.data.data.pool;
};

export const updatePool = async (poolId: string, updateData: UpdatePoolRequest): Promise<IMicrofundingPool> => {
  const response = await api.patch<ApiResponse<{ pool: IMicrofundingPool }>>(`/microfunding/pools/${poolId}`, updateData);
  return response.data.data.pool;
};

export const getPoolMembers = async (poolId: string): Promise<IPoolMember[]> => {
  const response = await api.get<ApiResponse<{ members: IPoolMember[] }>>(`/microfunding/pools/${poolId}/members`);
  return response.data.data.members;
};

export const getCurrentUserMembership = async (poolId: string): Promise<IPoolMember> => {
  const response = await api.get<ApiResponse<{ member: IPoolMember }>>(`/microfunding/pools/${poolId}/members/me`);
  return response.data.data.member;
};

export const requestToJoinPool = async (poolCode: string): Promise<{ message: string; joinRequest: IJoinRequest }> => {
  const response = await api.post<ApiResponse<{ joinRequest: IJoinRequest }>>("/microfunding/join-requests", { pool_code: poolCode });
  return { message: response.data.message || "", joinRequest: response.data.data.joinRequest };
};

export const getJoinRequests = async (poolId: string, status: JoinRequestStatus): Promise<IJoinRequest[]> => {
  const response = await api.get<ApiResponse<{ requests: IJoinRequest[] }>>(`/microfunding/pools/${poolId}/join-requests?status=${status}`);
  return response.data.data.requests;
};

export const updateJoinRequestStatus = async (requestId: string, newStatus: "APPROVED" | "REJECTED"): Promise<{ message: string; updatedRequest: IJoinRequest }> => {
  const response = await api.patch<ApiResponse<{ updatedRequest: IJoinRequest }>>(`/microfunding/join-requests/${requestId}`, { status: newStatus });
  return { message: response.data.message || "", updatedRequest: response.data.data.updatedRequest };
};

export const createContribution = async (poolId: string, amount: number): Promise<{ contributionId: string; paymentToken: string }> => {
  const response = await api.post<ApiResponse<{ contributionId: string; paymentToken: string }>>(`/microfunding/pools/${poolId}/contributions`, { amount });
  return response.data.data;
};

export const getMyContributions = async (poolId: string): Promise<IContribution[]> => {
  const response = await api.get<ApiResponse<{ contributions: IContribution[] }>>(`/microfunding/pools/${poolId}/contributions/me`);
  return response.data.data.contributions;
};

export const checkContributionStatus = async (contributionId: string): Promise<{ status: ContributionStatus; contribution: IContribution }> => {
  const response = await api.get<ApiResponse<{ status: ContributionStatus; contribution: IContribution }>>(`/microfunding/contributions/${contributionId}/check-status`);
  return response.data.data;
};

export const getDisbursements = async (poolId: string, status?: DisbursementStatus): Promise<IDisbursement[]> => {
  const params = status ? { status } : {};
  const response = await api.get<ApiResponse<{ disbursements: IDisbursement[] }>>(`/microfunding/pools/${poolId}/disbursements`, { params });
  return response.data.data.disbursements;
};

export const createDisbursement = async (poolId: string, data: CreateDisbursementRequest): Promise<IDisbursement> => {
  const response = await api.post<ApiResponse<{ disbursement: IDisbursement }>>(`/microfunding/pools/${poolId}/disbursements`, data);
  return response.data.data.disbursement;
};

export const voteOnDisbursement = async (disbursementId: string, vote: VoteOption, comment?: string): Promise<{ message: string; disbursement: IDisbursement }> => {
  const payload: VoteOnDisbursementRequest = { vote, comment };
  const response = await api.post<ApiResponse<{ disbursement: IDisbursement }>>(`/microfunding/disbursements/${disbursementId}/vote`, payload);
  return { message: response.data.message || "", disbursement: response.data.data.disbursement };
};
