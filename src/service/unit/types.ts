export interface Unit {
  id: number;
  fileName: string;
  name: string;
  content?: string;
}

export type GetUnitListResponse = Array<Unit>;
export type GetUnitResponse = Unit;
