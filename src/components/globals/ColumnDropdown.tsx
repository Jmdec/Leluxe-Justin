
import { Selection } from "@react-types/shared";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { ChevronDownIcon } from "@/components/globals/Icons";

interface DropdownComponentProps {
    label: string;
    items: { name: string; uid: string }[];
    selectedKeys: Selection;
    selectionMode?: "single" | "multiple";
    closeOnSelect?: boolean;
    onSelectionChange: (keys: Selection) => void;
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({
    label,
    items,
    selectedKeys,
    selectionMode = "multiple",
    closeOnSelect = false,
    onSelectionChange,
}) => {
    return (
        <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                    {label}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                disallowEmptySelection
                aria-label={label}
                closeOnSelect={closeOnSelect}
                selectedKeys={selectedKeys}
                selectionMode={selectionMode}
                onSelectionChange={onSelectionChange}
            >
                {items.map((item) => (
                    <DropdownItem key={item.uid} className="capitalize">
                        {item.name}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default DropdownComponent;
