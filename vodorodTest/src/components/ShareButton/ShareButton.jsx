import React from 'react';
import styles from "./ShareButton.module.css"

const ShareButton = ({ url }) => {
    const shareUrl = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Currency Exchange Rates',
                url: url
            }).catch(error => console.error('Error sharing', error));
        } else {
            alert('Share not supported in this browser.');
        }
    };

    return <button className={styles.btn} onClick={shareUrl}>Поделиться</button>;
};

export default ShareButton;
