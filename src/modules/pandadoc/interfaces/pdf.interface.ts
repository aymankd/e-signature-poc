export type Recipient = {
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  signing_order: number;
};

export type Signature = {
  value: string;
  role: string;
};
