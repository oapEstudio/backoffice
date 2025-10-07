import { IconLayoutDashboard } from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Perfiles",
    icon: IconLayoutDashboard,
    href: "/",
    // allowedRole: ["admin"],
  },
];

export default Menuitems;
