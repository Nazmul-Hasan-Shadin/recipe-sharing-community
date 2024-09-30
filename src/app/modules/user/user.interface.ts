export interface TUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
  status: "block" | "active";
  registeredAt: Date;
}
