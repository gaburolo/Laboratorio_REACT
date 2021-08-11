const format2Digits = (num) => {
    if(num < 10) {
        num = '0' + num;
    }
    return num;
};

const getCurrentTime = () => {
    const date = new Date();
    const hours = format2Digits(date.getHours());
    const mins = format2Digits(date.getMinutes());
    const secs = format2Digits(date.getSeconds());
    return `${hours}:${mins}:${secs}`;
};

module.exports = { getCurrentTime };