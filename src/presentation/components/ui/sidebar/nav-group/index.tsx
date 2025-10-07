import PropTypes from "prop-types";
// mui imports
import { ListSubheader, styled, type Theme } from "@mui/material";
import { IconDots } from '@tabler/icons-react';

type NavGroup = {
  navlabel?: boolean;
  subheader?: string;
};

interface ItemType {
  item: NavGroup;
  isSidebarCollapse?: boolean;
}

const NavGroup = ({ item, isSidebarCollapse = false }: ItemType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ListSubheaderStyle = styled((props: Theme | any) => (
    <ListSubheader disableSticky {...props} />
  ))(({ theme }) => ({
    ...theme.typography.overline,
    fontWeight: "700",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0),
    color: theme.palette.text.primary,
    lineHeight: "26px",
    padding: "3px 12px",
  }));
  return <ListSubheaderStyle>{!isSidebarCollapse ? item.subheader : <IconDots width={14} height={14} />}</ListSubheaderStyle>;
};

NavGroup.propTypes = {
  item: PropTypes.object,
};

export default NavGroup;
