import { network } from '../network';
import { GetUnitListResponse, GetUnitResponse } from './types';

class UnitService {
  async getUnitList() {
    const response = await network.get<GetUnitListResponse>('/units');
    return response.data;
  }

  async getUnit(id: number) {
    const response = await network.get<GetUnitResponse>(`/units/${id}`);
    return response.data;
  }
}

export const unitService = new UnitService();
