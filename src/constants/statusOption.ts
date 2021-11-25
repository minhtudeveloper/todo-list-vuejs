export enum statusTodo {
  DELETE = 0,
  ACTIVE = 1,
  COMPLETE = 2
}

export enum statusFilter {
  ALL = "ALL",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  DELETED = "DELETED"
}
export interface objectTodo {
  value: string;
  status: statusTodo;
}
