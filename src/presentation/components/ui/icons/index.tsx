/* eslint-disable @typescript-eslint/no-explicit-any */
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import ProfileImg from "./user-1.png";
import type { IActiveColumnIconProps } from "./active-column-icon-props.interface";
import { IconPencil } from "@tabler/icons-react";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import ErrorOutlineTwoToneIcon from "@mui/icons-material/ErrorOutlineTwoTone";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import PendingTwoToneIcon from "@mui/icons-material/PendingTwoTone";

import { baselightTheme } from "../../../theme/baselightheme";
import PersonIcon from '@mui/icons-material/Person';
import type React from "react";
import Avatar from "@mui/material/Avatar";
import WarningOutlined from "@mui/icons-material/WarningOutlined";
import BorderColorOutlined from "@mui/icons-material/BorderColorOutlined";
import ChecklistIcon from '@mui/icons-material/Checklist';
import WhatsAppSVG from './whatsapp.svg';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import LinkIcon from '@mui/icons-material/Link';
import { colors } from '../../../common/colors';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';

export interface IIconAction{
  handleClick?: any,
  parameterHandleClick?: any
}
export const PendingIcon = ({ color }: any) => {
  return <PendingTwoToneIcon sx={{ color: color, fontSize: 40 }} />;
};

export const CheckListIcon = ({color}: any)=>{
    return <ChecklistIcon  sx={{
        width: 20,
        height: 20,
      }} />
}
export const CheckIcon = ({ color }: any) => {
  return <CheckCircleOutlineRoundedIcon sx={{ color: color, fontSize: 40 }} />;
};

export const ErrorIcon = ({ color }: any) => {
  return <ErrorOutlineTwoToneIcon sx={{ color: color, fontSize: 40 }} />;
};

export const FaceIcon = ({ color }: any) => {
  return <FaceRoundedIcon sx={{ color: color, fontSize: 40 }} />;
};

export const TerminalIcon = ({ color }: any) => {
  return <TerminalRoundedIcon sx={{ color: color, fontSize: 40 }} />;
};

export const BriefCaseIcon = ({ color }: any) => {
  return <WorkTwoToneIcon sx={{ color: color.toString(), fontSize: 40 }} />;
};

export const LinkedinIcon = () => {
  return <LinkedInIcon />;
};

export const UploadToCloud = () => {
  return <CloudUploadIcon />;
};

export const SendIcon = () => {
  return <SendRoundedIcon sx={{ transform: "rotate(180deg)", width: 15 }} />;
};

export const AttachFileIcon = () => {
  return <AttachFileOutlinedIcon />;
};

export const DeleteIcon = () => {
  return (
    <DeleteForeverOutlinedIcon
      sx={{ color: baselightTheme.palette.error.dark }}
    />
  );
};


export const SuccessIcon = () => {
  return (
    <CheckCircleIcon sx={{ color: baselightTheme.palette.success.dark }} />
  );
};

export const DangerIcon = () => {
  return <CancelIcon sx={{ color: baselightTheme.palette.error.dark }} />;
};

export const WarningIcon = ({ color }: any) => {
  return <WarningOutlined  sx={{ color: color.toString(), fontSize: 40 }} />;
};

export const ActiveColumnIcon: React.FC<IActiveColumnIconProps> = ({
  active,
}) => {
  return <div>{active === true ? <SuccessIcon /> : <DangerIcon />}</div>;
};

export const EditActionIcon: React.FC<IIconAction> = ({handleClick, parameterHandleClick}) => {
  //return <EditIcon sx={{ color: baselightTheme.palette.info.dark }} />;
  return <BorderColorOutlined onClick={()=>{
      if(handleClick) parameterHandleClick? handleClick(parameterHandleClick) : handleClick();
  }} />
};

export const GroupActionIcon: React.FC<IIconAction> = ({handleClick, parameterHandleClick}) => {
  //return <EditIcon sx={{ color: baselightTheme.palette.info.dark }} />;
  return <GroupAddOutlinedIcon onClick={()=>{
      if(handleClick) parameterHandleClick? handleClick(parameterHandleClick) : handleClick();
  }} />
};

export const AddActionIcon: React.FC<IIconAction> = ({handleClick, parameterHandleClick}) => {
  //return <EditIcon sx={{ color: baselightTheme.palette.info.dark }} />;
  return <AddOutlinedIcon onClick={()=>{
      if(handleClick) parameterHandleClick? handleClick(parameterHandleClick) : handleClick();
  }} />
};

export const DeleteActionIcon: React.FC<IIconAction> = ({handleClick, parameterHandleClick}) => {
  //return <EditIcon sx={{ color: baselightTheme.palette.info.dark }} />;
  return <DeleteOutlineOutlinedIcon onClick={()=>{
      if(handleClick) parameterHandleClick? handleClick(parameterHandleClick) : handleClick();
  }} />
};


export const UserAvatar = () => {
  return (
    <Avatar
      src={ProfileImg}
      alt={"ProfileImg"}
      sx={{
        width: 35,
        height: 35,
      }}
    />
  );
};

export const EyeIcon = () => {
  return <RemoveRedEyeIcon sx={{ color: baselightTheme.palette.info.dark }} />;
};

export const PencilIcon = () => {
  return <IconPencil />;
};

export const UserIcon = () => {
  return <PersonIcon />;
};

export const StarIcon = () => {
  return <StarBorderPurple500OutlinedIcon />;
};


export const WhatsAppIcon = () => {

  return <img src={WhatsAppSVG} width={35} height={35} />
}

export const ExitIcon = ()=>{
  return <ExitToAppIcon />
}

export const FilterIcon = () => {
  return <FilterListOutlinedIcon  color={'primary'} />
}

export const QuitIconFiltes = ()=>{
  return <HighlightOffOutlinedIcon color={'primary'} />
}

export const LinksIcon = ()=>{
  return <LinkIcon />
}

export const ArrowDownIcon = () => {
  return <ArrowDownwardIcon />
}

export const ArrowUpIcon = () => {
  return <ArrowUpwardIcon />
}

export const ArrowDownDobleIcon = () =>{
  return <KeyboardDoubleArrowDownIcon />
}

export const UploadFileIconn = ()=>{
  return <UploadFileIcon color={'primary'} />
}
export const CopyIcon = () => {
  return <ContentCopyIcon />
}

export const ImageIcon = () =>{
  return <ImageRoundedIcon />
}