import { network } from '../network';
import { GetUnitListResponse, GetUnitResponse, PutUnitRequest, Unit } from './types';

class UnitService {
  async getUnitList() {
    const response = await network.get<GetUnitListResponse>('/units');
    return response.data;
  }

  async getUnit(id: number) {
    const response = await network.get<GetUnitResponse>(`/units/${id}`);
    return response.data;
  }

  async putUnit(unit: PutUnitRequest) {
    const response = await network.put<GetUnitResponse>('/units', unit);
    return response.data;
  }

  async deleteUnit(id: number) {
    const response = await network.delete(`/units/${id}`);
    return response.data;
  }
}

export const unitService = new UnitService();
