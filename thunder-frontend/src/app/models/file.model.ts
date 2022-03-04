export class FileUploadResponseModel{
    response: {
        url: string,
        filename: string
    };
    success: boolean;
    message: string
}

export class FileDeleteModel{
    id: string;
    email:string;
    name: string;
    linkGenerated: boolean
}

export class AllFilesResponseModel{
    response: FilesResponse[]
    success: boolean;
}

export class FilesResponse{
    _id: string;
    email: string;
    filename: string;
    filetype: string;
    fileurl: string;
    ispasswordprotected:boolean;
    createdAt: string;
    updatedAt: string;
}

export class ChangeFileProtectionModel{
    id: string;
    email: string;
    protected: string;
    password: string;
}