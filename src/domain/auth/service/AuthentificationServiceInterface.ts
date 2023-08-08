import { SignupDTO } from '../dto/AuthDTO';

export default interface AuthentificationServiceInterface {
  signin(): Promise<void>;
  signup(request: SignupDTO): Promise<void>;
}
