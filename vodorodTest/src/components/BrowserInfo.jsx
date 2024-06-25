import React from 'react';

const BrowserInfo = () => {
    const getBrowserInfo = () => {
        const ua = navigator.userAgent;
        let browserName = 'Unknown';

        if (ua.indexOf('Firefox') > -1) {
            browserName = 'Mozilla Firefox';
        } else if (ua.indexOf('Chrome') > -1) {
            browserName = 'Google Chrome';
        } else if (ua.indexOf('Safari') > -1) {
            browserName = 'Apple Safari';
        } else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1) {
            browserName = 'Microsoft Internet Explorer';
        }

        return browserName;
    };

    return (
        <div>
            <h2>Информация о браузере</h2>
            <p>Вы используете: {getBrowserInfo()}</p>
        </div>
    );
};

export default BrowserInfo;
