import React from "react";

export interface Menu{
    MenuHead: string,
    Links: React.ReactNode[]
}

export interface MenuItem{
    label: string,
    link:string,
    icon?:string,
    className?:string
}