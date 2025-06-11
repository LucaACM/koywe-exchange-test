export interface AuthProvider {
  generateToken: (userId: string) => Promise<string>;
  validateToken: (token: string) => Promise<any>;
}
