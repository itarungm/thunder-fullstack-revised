export class CreateCategoryModel{
    email?: string;
    categoryName: string;
}

export class CreateSubcategoryModel{
    email?: string;
    link: string;
    categoryId: string;
}

export class UpdateCategoryNameModel{
    email?: string;
    categoryId: string;
    updatedName: string;
}

export class UpdateSubcategoryModel{
    email?: string;
    categoryId: string;
    subcategoryId: string;
    subcategoryLink: string;
}

export class DeleteCategoryModel{
    email?: string;
    categoryId: string;
}

export class DeleteSubcategoryModel{
    email?: string;
    categoryId: string;
    subcategoryId: string;
}

export class UpdateSettingModel{
    id: string;
    isTitleAvailable: boolean;
    isPasswordProtected: boolean;
    isShareable: boolean;
    title: string;
    password: string;
    shareLink: string;

    constructor(){
        this.isPasswordProtected =  false,
        this.isTitleAvailable = false;
        this.isShareable = false,
        this.title = '',
        this.password='',
        this.shareLink=''
    }
}

export class GetAllLinksForVisitors{
    isTitleAvailable: boolean;
    title: string;
    isPasswordProtected: boolean;
    isShareable: boolean;
    password: string;
    shareLink: string;
    categoryList:[]
}