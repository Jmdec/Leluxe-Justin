import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

interface Action {
    key: string;
    label: string;
    onClick: (data: any) => void;
    icon?: ReactNode;
    color?: string;
}

interface DropdownMenuProps {
    actions: Action[];
    record: any;
}

const DropdownMenuComponent: React.FC<DropdownMenuProps> = ({ actions, record }) => {
    return (
        <div>
            <Dropdown>
                <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                        <EllipsisVerticalIcon className=" text-black" />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu>
                    {actions.map(({ key, label, onClick, icon, color }) => (
                        <DropdownItem key={key} onPress={() => onClick(record)}>
                            <button className={`flex items-center px-2 py-1 w-full text-left ${color === "danger" ? "text-red-500" : color === "primary" ? "text-blue-500" : "text-gray-800"}`}>
                                {icon && <span className="mr-2 w-5">{icon}</span>}
                                {label}
                            </button>
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default DropdownMenuComponent;
