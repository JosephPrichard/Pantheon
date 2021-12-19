export interface SignInBody {
    email: string;
    password: string;
}

export interface SignInRes {
    userId: string;
    name: string;
}
