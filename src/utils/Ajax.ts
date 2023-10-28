import { IAjaxRequestParams, IAjaxResponse, IAjaxResponseErrorCallback, IAjaxResponseSuccessCallback } from "../typings/typings";

export class Ajax {
    private ajax: XMLHttpRequest;

    constructor(url: string) {
        this.ajax = this.createAjaxRequest(url)
    }

    private createAjaxRequest(url: string) {
        const request = new XMLHttpRequest();
        request.open('POST', url)
        request.setRequestHeader('Content-type', 'application/json');
        request.onerror = () => {
            alert('Looks like you forgot to run an api server.\nType `npm run server` in your console.');
        }

        return request;
    }

    public sendRequest(params: IAjaxRequestParams) {
        this.ajax.send(JSON.stringify(params))
    }

    public addRequestLoadHandler(successCallback: IAjaxResponseSuccessCallback, errorCallback: IAjaxResponseErrorCallback) {
        this.ajax.onload = () => {
            if(this.ajax.DONE) {
                const result: IAjaxResponse = JSON.parse(this.ajax.response);
                if(result.status === 'success') {
                    successCallback(result.message)
                }
                if(result.status === 'error') {
                    errorCallback(result.message)
                }
            }
        }
    }
}