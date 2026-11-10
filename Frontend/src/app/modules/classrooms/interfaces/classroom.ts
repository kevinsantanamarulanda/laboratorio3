export interface Classroom {
  id: number;
  code: string;
  building: string;
  capacity: number;
  type: string;
  status: boolean;
}

export type CreateClassroomRequest = Omit<Classroom, 'id'>;
export type UpdateClassroomRequest = CreateClassroomRequest;
