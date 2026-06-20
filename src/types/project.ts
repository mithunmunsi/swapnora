// src/types/project.ts

export interface Project {
  _id: string;

  title: string;

  description: string;

  category: string;

  targetAmount: number;

  raisedAmount: number;

  totalVotes: number;

  image: string;

  status: string;

  fundingStatus: string;

  createdAt: string;

  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}
