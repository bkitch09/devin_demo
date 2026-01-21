import { api } from './api';
import { Station, CreateStationRequest } from '../types/station';

export const stationService = {
  getAll: async (): Promise<Station[]> => {
    const response = await api.get<Station[]>('/stations');
    return response.data;
  },

  getById: async (id: string): Promise<Station> => {
    const response = await api.get<Station>(`/stations/${id}`);
    return response.data;
  },

  createStation: async (data: CreateStationRequest): Promise<Station> => {
    const response = await api.post<Station>('/stations', data);
    return response.data;
  },
};
