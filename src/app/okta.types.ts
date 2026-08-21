export interface OktaUser {
  id: string;
  status: string;
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
  };
}

export interface OktaGroup {
  id: string;
  profile: {
    name: string;
    description?: string;
  };
}
