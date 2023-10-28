export type IAjaxResponseSuccessCallback = (message: string) => void; 
export type IAjaxResponseErrorCallback = (message: string) => void; 

export type IAjaxResponse = IAjaxResponseSuccess | IAjaxResponseError;
export interface IAjaxResponseSuccess {
    status: 'success';
    message: string;
}
export interface IAjaxResponseError {
    status: 'error';
    message: string;
}

export interface IAjaxRequestParams {
    inputName: string;
    inputEmail: string;
    inputPhone: string;
    inputMessage: string;
}

export type IFields = 'name' | 'email' | 'phone' | 'message';
