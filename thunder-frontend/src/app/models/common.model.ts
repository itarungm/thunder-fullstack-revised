import { ActionType } from "../enums/action-type.enum";

export class CommonResponseModel{
    response:any;
    success: boolean;
    message: string;
}

export class ActionModel{
    actionType: ActionType;
    payload: any;
}