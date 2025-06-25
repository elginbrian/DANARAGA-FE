import api from "./api";
import { IFacility } from "../types";

interface FacilityResponse {
  data: IFacility[];
  source: string;
}

export const getAIFacilities = async (preferences: any): Promise<FacilityResponse> => {
  const response = await api.post<FacilityResponse>("/facilities/recommendations", { preferences });
  return response.data;
};

export const getNearbyFacilities = async (preferences: any): Promise<FacilityResponse> => {
  const response = await api.post<FacilityResponse>("/facilities/nearby", { preferences });
  return response.data;
};

export const searchFacilities = async (searchData: any): Promise<FacilityResponse> => {
  const response = await api.post<FacilityResponse>("/facilities/search", searchData);
  return response.data;
};

export const getFacilityById = async (facilityId: string): Promise<IFacility> => {
  const response = await api.get<{ facility: IFacility }>(`/facilities/${facilityId}`);
  return response.data.facility;
};
