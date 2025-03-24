
export type Inquiry = {
    id: number;
    fullname: string;
    email: string;
    phonenumber: string;
    message: string;
    reply?: string | null;

};

export type InquiryRow = {
    id: string;
    fullname: string;
    email: string;
    phonenumber: string;
    message: string;
    actions: string;
    reply: string;
};

