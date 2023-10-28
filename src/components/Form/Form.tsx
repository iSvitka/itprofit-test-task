import React, { ChangeEvent, FormEvent } from "react";
import cn from 'classnames';
import { CheckMaskInput } from 'check-mask-inputs';
import { IAjaxRequestParams, IAjaxResponseErrorCallback, IAjaxResponseSuccessCallback, IFields } from "../../typings/typings";
import { validateEmail, validateMessage, validateName, validatePhone } from "../../utils/validateInputs";
import { Ajax } from "../../utils/Ajax";

import styles from './Form.module.scss';

export const Form = () => {
    const [nameValue, setNameValue] = React.useState('');
    const [emailValue, setEmailValue] = React.useState('');
    const [phoneValue, setPhoneValue] = React.useState('');
    const [messageValue, setMessageValue] = React.useState('');

    const [errorNameValue, setErrorNameValue] = React.useState('');
    const [errorEmailValue, setErrorEmailValue] = React.useState('');
    const [errorPhoneValue, setErrorPhoneValue] = React.useState('');
    const [errorMessageValue, setErrorMessageValue] = React.useState('');

    const [overlayMessage, setOverlayMessage] = React.useState('');
    const [isOverlayClosing, setIsOverlayClosing] = React.useState(false);

    // const [, setAjaxResponseType] = React.useState(true);
    
    const nameOnChangeHandler = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setNameValue(event.target.value);
    }, [])
    const emailOnChangeHandler = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(event.target.value)
    }, [])
    const phoneOnChangeHandler = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPhoneValue(CheckMaskInput.custom(event.target.value, '+999 99 999-99-99', validatePhone).getValue());
    }, [])
    const messageOnChangeHandler = React.useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
        setMessageValue(event.target.value)
    }, [])

    const validateField = React.useCallback((field: IFields) => {
        switch(field) {
            case 'name':
                if(!validateName(nameValue)) {
                    setErrorNameValue(' Заполните поле');
                }
                break;
            case 'email':
                if(!validateEmail(emailValue)) {
                    setErrorEmailValue('Введите корректный email');
                }
                break;
            case 'phone':
                if(!validatePhone(phoneValue)) {
                    setErrorPhoneValue('Введите корректный номер телефона');
                }
                break;
            case 'message':
                if(!validateMessage(messageValue)) {
                    setErrorMessageValue('Заполните поле');
                }
                break;
            default: break;
        }
    }, [emailValue, messageValue, nameValue, phoneValue])

    const validateAllFields = React.useCallback(() => {
        let isValidated = true;
        if(!validateName(nameValue)) {
            setErrorNameValue(' Заполните поле');
            isValidated = false
        }
        if(!validateEmail(emailValue)) {
            setErrorEmailValue('Введите корректный email');
            isValidated = false
        }
        if(!validatePhone(phoneValue)) {
            setErrorPhoneValue('Введите корректный номер телефона');
            isValidated = false
        }
        if(!validateMessage(messageValue)) {
            setErrorMessageValue('Заполните поле');
            isValidated = false
        }

        return isValidated
    }, [emailValue, messageValue, nameValue, phoneValue])

    const showOverlayMessage = (message: string) => {
        setOverlayMessage(message);
        setTimeout(() => {
            setIsOverlayClosing(true);
            setTimeout(() => {
                setOverlayMessage('');
                setIsOverlayClosing(false);
            }, 500)
        }, 1000)
    }

    const ajaxResponseSuccessHandler = React.useCallback<IAjaxResponseSuccessCallback>((message) => {
        setNameValue('');
        setErrorNameValue('');
        setEmailValue('');
        setErrorEmailValue('');
        setPhoneValue('');
        setErrorPhoneValue('');
        setMessageValue('');
        setErrorMessageValue('');
        showOverlayMessage(message);
    }, [])
    const ajaxResponseErrorHandler = React.useCallback<IAjaxResponseErrorCallback>((message) => {
        setErrorNameValue(message);
        setErrorEmailValue(message);
        setErrorPhoneValue(message);
        setErrorMessageValue(message);
    }, [])

    const onFormSubmitHandler = React.useCallback((event: FormEvent) => {
        event.preventDefault()
        if(validateAllFields()) {
            const params: IAjaxRequestParams = {
                inputName: nameValue,
                inputEmail: emailValue,
                inputPhone: phoneValue,
                inputMessage: messageValue,
            }
            
            const AjaxRequest = new Ajax('http://localhost:9090/api/registration');
            AjaxRequest.addRequestLoadHandler(ajaxResponseSuccessHandler, ajaxResponseErrorHandler);
            AjaxRequest.sendRequest(params);
        }
        
    }, [ajaxResponseErrorHandler, ajaxResponseSuccessHandler, emailValue, messageValue, nameValue, phoneValue, validateAllFields])

    // const onButtonClickHandler = React.useCallback(() => {
    //     if(validateAllFields()) {
    //         setAjaxResponseType(prevType => {
    //             if(prevType) {
    //                 ajaxResponseSuccessHandler('Ваша заявка успешно отправлена')
    //             } else {
    //                 ajaxResponseErrorHandler({inputName: 'Ошибка с сервера'})
    //             }

    //             return !prevType
    //         })
    //     }
    // }, [ajaxResponseErrorHandler, ajaxResponseSuccessHandler, validateAllFields])

    return (
        <form
            className={styles.Form}
            onSubmit={onFormSubmitHandler}
        >
            <div className={styles.FormInputWrapper}>
                <input
                    className={cn(styles.FormInput, {[styles.FormInputError]: errorNameValue})}
                    type="text"
                    placeholder="Name"
                    value={nameValue}
                    onChange={nameOnChangeHandler}
                    onFocus={() => setErrorNameValue('')}
                    onBlur={() => validateField('name')}
                />
                { errorNameValue && <span className={styles.FormInputErrorSpan}>{errorNameValue}</span> }
            </div>
            <div className={styles.FormInputWrapper}>
                <input
                    className={cn(styles.FormInput, {[styles.FormInputError]: errorEmailValue})}
                    type="email"
                    placeholder="Email"
                    value={emailValue}
                    onChange={emailOnChangeHandler}
                    onFocus={() => setErrorEmailValue('')}
                    onBlur={() => validateField('email')}
                />
                { errorEmailValue && <span className={styles.FormInputErrorSpan}>{errorEmailValue}</span> }
            </div>
            <div className={styles.FormInputWrapper}>
                <input
                    className={cn(styles.FormInput, {[styles.FormInputError]: errorPhoneValue})}
                    type="text"
                    placeholder="375 xx xxx xx xx"
                    value={phoneValue}
                    onChange={phoneOnChangeHandler}
                    onFocus={() => setErrorPhoneValue('')}
                    onBlur={() => validateField('phone')}
                />
                { errorPhoneValue && <span className={styles.FormInputErrorSpan}>{errorPhoneValue}</span> }
            </div>
            <div className={styles.FormTextareaWrapper}>
                <textarea
                    className={cn(styles.FormTextarea, {[styles.FormTextareaError]: errorMessageValue})}
                    placeholder="Message..."
                    value={messageValue}
                    onChange={messageOnChangeHandler}
                    onFocus={() => setErrorMessageValue('')}
                    onBlur={() => validateField('message')}
                />
                { errorMessageValue && <span className={styles.FormTextareaErrorSpan}>{errorMessageValue}</span> }
            </div>
            <button
                className={styles.FormButtonSubmit}
                type="submit"
                // onClick={onButtonClickHandler}
            >
                submit
            </button>
            {overlayMessage &&
                <div
                    className={cn(styles.FormOverlay,
                        {[styles.FormOverlayClosing]: isOverlayClosing})}
                >
                    {overlayMessage}
                </div>
            }
        </form>
    )
}