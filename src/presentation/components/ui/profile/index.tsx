import { useState } from 'react';


// import Avatar from '../../icons/avatar';
import UserAvatar from '../user/user-avatar.component';
import { colors } from '../../../common/colors';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Button } from '../button';
import { CustomBox } from '../box/CustomBox';

const Profile = () => {
   
    const [anchorEl2, setAnchorEl2] = useState(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClick = (event: any) => {
        setAnchorEl2(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl2(null);
    };

    //if (!isAuthenticated || inProgress !== InteractionStatus.None) {
      //  return <Loading />;
    //}

    return (
        <CustomBox>
            <IconButton
                size="large"
                aria-label="show 11 new notifications"
                color={'primary'}
                aria-controls="msgs-menu"
                aria-haspopup="true"
                sx={{
                    ...(typeof anchorEl2 === "object" && {
                        color: "primary.main",
                    }),
                }}
                onClick={handleClick}
            >
                <UserAvatar name="Brian" />
            </IconButton>
           
            <Menu
                id="msgs-menu"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={handleClose}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                sx={{
                    "& .MuiMenu-paper": {
                        width: "360px",
                    },
                }}
            >
                <CustomBox padding={3}>
                    <Typography variant="subtitle2" fontWeight={600} color={"rgb(42, 53, 71)"}>CUENTA</Typography>
                    <Typography variant="subtitle2">BOJEDA</Typography>
                </CustomBox>
                <Divider />
                {/* <MenuItem>
                        <ListItemIcon>
                            <IconUser width={20} />
                        </ListItemIcon>
                        <ListItemText>My Profile</ListItemText>
                    </MenuItem> */}
                <CustomBox mt={1} py={1} px={2}>
                    <center><Button onClick={() => { alert("Exit"); }} variant="primary" title='Logout' /></center>                                        
                </CustomBox>
            </Menu>
        </CustomBox>
    );
};

export default Profile;
