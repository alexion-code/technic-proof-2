export interface LoginInterface {
    success: boolean | undefined;
    error: boolean | undefined;
    loading: boolean | undefined;
    finished: boolean | undefined;
}

export interface LoginContextInterface extends LoginInterface  { 
    login?: (email: string, password: string) => Promise<void> | null;
    clear?: () => void | null;
}