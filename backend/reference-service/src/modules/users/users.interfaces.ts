export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserRepository {
    getUsers(): User[];
    create(): User;
    getUserById(): User;
    updateUser(): User;
    deleteUser(): void;
}