import { stringToColor } from "./stringToColor";

export function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            color: "#FFFFFF"
        },
        children: `${name?.slice(0, 2)}`,
    };
}