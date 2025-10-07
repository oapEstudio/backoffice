import React from 'react';

import { stringAvatar } from '../../../utils/stringAvatar';
import Avatar from '@mui/material/Avatar';

const UserAvatar: React.FC<{ name: string | undefined }> = ({ name }) => {
    return (
        <Avatar {...stringAvatar(name ? name : 'None')} />
    );
}

export default UserAvatar;