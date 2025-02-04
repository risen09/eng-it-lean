export interface Unit {
  id: number;
  author: number;
  name: string;
  content?: string;
}

export type GetUnitListResponse = Array<Unit>;
export type GetUnitResponse = Unit;
export type PutUnitRequest = {
  id?: number;
  name: string;
  content: string;
};
