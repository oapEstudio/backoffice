import type { IProfile } from "./IProfile";

export interface IDynamicPage{
    id:                string;
    title:             string;
    statusColor:       string;
    description:       string;
    hasMenu:           boolean;
    url:       string;
    statusId:          number;
    statusDescription: string;
    dateUpdated:       Date;
    updatedBy:         string;
    sections:          ISection[];
    profiles:          IProfile[];
}



export interface ISection {
    id:              string;
    order:           number;
    backgroundColor: string;
    backgroundImage: string;
    elements:        IElement[];
}

export interface IElement {
    id:       string;
    order:    number;
    label:    string;
    text:     string;
    fontSize: string;
    type:     number;
    fileUrl:  string;
    height:   number;
    align:    string;
    link:     string;
}
