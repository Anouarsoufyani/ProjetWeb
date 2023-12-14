import { ObjectId } from "@mikro-orm/mongodb";

interface loginResponseDto {
  success: boolean;
  id?: ObjectId;
  username?: string;
  token?: string;
  errors?: {
    message?: string;
  };
}

export default loginResponseDto;
