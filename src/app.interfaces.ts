export interface ICreditAnalysis {
  clientEmail: string;
  creditReleased: number;
  createdAt: string;
}

export interface ReqUser {
  user: {
    username: string;
  };
}
