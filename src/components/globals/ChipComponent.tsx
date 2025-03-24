import { Chip, ChipProps } from "@heroui/chip";


interface ChipComponentProps {
    status: string;
    color?: ChipProps["color"];
    size: ChipProps["size"];
    variant?: ChipProps["variant"];
}

const statusColorMap: Record<ChipComponentProps["status"], ChipProps["color"]> = {
    pending: "default",
    accepted: "success",
    declined: "danger",
    done: "primary",
};

const ChipComponent: React.FC<ChipComponentProps> = ({ status, color, size = "sm", variant = "flat" }) => {
    return (
        <Chip className="uppercase" color={color || statusColorMap[status]} size={size} variant={variant}>
            {status}
        </Chip>
    );
};

export default ChipComponent;
