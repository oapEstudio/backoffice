
import type { ReactNode } from "react";
import { CustomBox } from "../../../ui/box/CustomBox";

export function CardsGrid({ children }: { children: ReactNode }) {
  return (
    <CustomBox
      sx={{
        display: "grid",
        gap: 2,                         
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "repeat(4, 1fr)",
        },
      }}
    >
      {children}
    </CustomBox>
  );
}
