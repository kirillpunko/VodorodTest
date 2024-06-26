import React from 'react';
import styles from "./ShareButton.module.css"

const ShareButton = ({params}) => {

    const generateShareUrl = () => {
        const url = new URL(window.location.href);
        url.search = new URLSearchParams(params).toString();
        return url.toString();
    };

    const shareUrl = () => {
        const url = generateShareUrl();
        navigator.clipboard.writeText(url).then(() => {
            alert('Ссылка скопирована в буфер обмена');
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    };

    return <button className={styles.btn} onClick={shareUrl}>Поделиться</button>;
};

export default ShareButton;
