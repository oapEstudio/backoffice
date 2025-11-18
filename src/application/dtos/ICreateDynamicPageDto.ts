
export interface ICreateDynamicPageDto { 
    title:             string;
    description?:       string;
    hasMenu:           boolean;  
    statusId:          number;   
    sections:          ISectionDto[];
    profiles:          string[];
}

export interface ISectionDto{
     order:           number;
     backgroundColor?: string;
     elements:        IElementDto[];
}


export interface IElementDto{  
    order?:    number;
    label?:    string;
    text?:     string;
    fontSize?: string;
    type?:     number;
    file?:     File | null;
    height?:   number;
    align?:    string;
    link?:     string;
}