export class User {
    id!: number|0;
    first_name!: string|"";
    last_name!: string|"";
    email!: string|"";
}

export class UserService {
        userData: User | undefined;
        loading: boolean | undefined;
        error: boolean | undefined;
        finished: boolean | undefined;
    }