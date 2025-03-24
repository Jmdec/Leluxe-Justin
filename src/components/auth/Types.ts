
export type User = {
    id: string;        
    email: string;
    fullname: string;
    password: string;
    createdAt: Date;   
    updatedAt: Date;
    role: "user" | "admin"; 
};

export type UserRow = {
    id: string;
    email: string;
    fullname: string;
    createdAt: Date;
    role: "user" | "admin";
};
