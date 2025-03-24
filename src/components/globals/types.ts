import { SVGProps } from "react";

export type Destroy = {
  id: string;
};

export type Login = {
  username: string;
  password: string;
};

export type ActionResponse = {
  code: number;
  message: string;
  errors?: {
    [key: string]: string;
  };
  error?: any;
};

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Column<T extends object = any> = {
    key: keyof T & string;
    name: string;
  };
  