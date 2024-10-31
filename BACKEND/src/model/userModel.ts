export interface User {
    id: number;
    name: string;
    email: string;
}

export let users: User[] = [
    { id: 1, name: 'João', email: 'joao@example.com' },
    { id: 2, name: 'Maria', email: 'maria@example.com' }
];
