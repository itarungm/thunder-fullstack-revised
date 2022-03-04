export interface Menu{
    name: string;
    path?: string;
    icon: string;
    show: boolean;
    children?: ChildrenMenu
}

export interface ChildrenMenu{
    id: string;
    submenu:common[]

}

export interface common{
    name: string;
    path: string;
}