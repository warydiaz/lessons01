export class CreateUserDto {
  email: string;
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
