import { PoolStatus, ContributionPeriod, ClaimApprovalSystem, PoolMemberRole, ContributionStatus, PaymentMethod, DisbursementStatus, VoteOption, JoinRequestStatus } from "./enums";
import { IUser } from "./user";

export interface IMicrofundingPool {
  _id: string;
  creator_user_id: string;
  title: string;
  description: string;
  pool_code?: string;
  type_of_community: string;
  max_members: number;
  contribution_period: ContributionPeriod;
  contribution_amount_per_member: number;
  benefit_coverage: string[];
  claim_approval_system: ClaimApprovalSystem;
  claim_voting_duration: string;
  current_amount: number;
  status: PoolStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPoolMember {
  _id: string;
  pool_id: string;
  user_id: string;
  user_details?: Pick<IUser, "name" | "email">; // Data pengguna yang di-populate
  role: PoolMemberRole;
  joined_date: string;
}

export interface IContribution {
  _id: string;
  pool_id: string;
  member_id: string;
  amount: number;
  contribution_date: string;
  payment_method: PaymentMethod;
  status: ContributionStatus;
}

export interface IVote {
  user_id: string;
  vote: VoteOption;
  voted_at: string;
  comment?: string;
}

export interface IDisbursement {
  _id: string;
  pool_id: string;
  recipient_user_id: string;
  requested_by_user_id: string;
  recipient_details?: Pick<IUser, "name">;
  amount: number;
  purpose: string;
  proof_url?: string;
  status: DisbursementStatus;
  request_date: string;
  voting_deadline?: string;
  resolved_at?: string;
  votes_for: number;
  votes_against: number;
  voters: IVote[];
}

export interface IJoinRequest {
  _id: string;
  pool_id: string;
  user_id: string;
  user_details?: Pick<IUser, "name" | "email">;
  status: JoinRequestStatus;
  requested_at: string;
}
