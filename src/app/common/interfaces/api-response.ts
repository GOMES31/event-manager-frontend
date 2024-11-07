import { UserDTO } from "../dtos/userDTO";

export interface ApiResponse{
  message: string; // Message returned by the backend
  user?: UserDTO; // Optionally include UserDTO in the response
}

