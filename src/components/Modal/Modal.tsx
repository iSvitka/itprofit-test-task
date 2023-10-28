import React from "react";
import cn from 'classnames';
import { IModalProps } from "./Modal.typings"

import styles from './Modal.module.scss';

export const Modal = (props: IModalProps) => {
    const [isClosing, setIsClosing] = React.useState(false);

    const onButtonClickHandler = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        const element = event.target as HTMLElement
        if(element.id === 'ModalOverlay') {
            setIsClosing(true);
            setTimeout(() => {
                props.onCloseCallback();
                document.body.style.overflow = 'auto'
            }, 150);
        }
    }, [props])

    return (
        <div className={cn(styles.Modal, {[styles.ModalClosing]: isClosing})} onClick={onButtonClickHandler} id='ModalOverlay'>
            <div className={styles.ModalContent}>
                <h2 className={styles.ModalTitle}>Lorem Ipsum</h2>
                <div className={styles.ModalTextWrapper}>
                    <p className={styles.ModalText}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut ut velit ligula. Quisque id dolor convallis nulla dignissim aliquet.
                        Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                        Fusce ac tempor lorem. Nulla ut diam quam. In non porta nulla.
                        Ut et lorem at velit porta congue eu et metus. Ut ac tellus ipsum.
                    </p>
                    <p className={styles.ModalText}>
                        Nam justo erat, semper consequat rhoncus id, viverra eget leo.
                        Ut nunc massa, gravida et varius ac, volutpat eu nulla.
                        Nullam risus diam, consequat nec volutpat a, scelerisque ac turpis.
                        Donec congue aliquam metus. Integer erat nibh, cursus et ornare a, porttitor sed ligula.
                        Maecenas molestie lacus eu mi convallis efficitur. In ornare vitae tellus vel iaculis.
                        Phasellus nec nulla at massa elementum accumsan.
                        Quisque sem augue, sagittis quis condimentum malesuada, rutrum in lorem.
                        Aenean libero metus, auctor quis nulla et, accumsan interdum mi.
                        Mauris id tellus ut libero tincidunt ullamcorper.
                        In condimentum hendrerit quam, nec ultrices diam egestas id.
                        Quisque finibus sapien ac felis sodales, id iaculis turpis cursus.
                        Sed consequat risus et dignissim euismod.
                    </p>
                </div>
            </div>
        </div>
    )
}