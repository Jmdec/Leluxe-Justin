
export type NewsRow = {
    id: string;
    date: string;
    title: string;
    description: string;
    link: string;
    actions: string;
    imageUrl: string;
};

export type News = {
    id: number;
    date: Date;
    title: string;
    description: string;
    link: string;
    imageUrl: string;
};
