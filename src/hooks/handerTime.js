import { ref, reactive } from "vue"
export default function () {
    const handlerTime1 = 
        (time) => {
            let date = new Date(Number(time));
            if (Date.now() - Number(time) < 60 * 1000) {
                return Math.floor((Date.now() - Number(time)) / 1000) + "秒前";
            } else if (Date.now() - Number(time) < 60 * 60 * 1000) {
                return Math.floor((Date.now() - Number(time)) / (1000 * 60)) + "分钟前";
            } else if (Date.now() - Number(time) < 24 * 60 * 60 * 1000) {
                return (
                    Math.floor((Date.now() - Number(time)) / (1000 * 60 * 60)) + "小时前"
                );
            } else if (Date.now() - Number(time) < 24 * 60 * 60 * 1000 * 30) {
                return (
                    Math.floor((Date.now() - Number(time)) / (1000 * 60 * 60 * 24)) +
                    "天前"
                );
            } else if (Date.now() - Number(time) < 24 * 60 * 60 * 1000 * 30 * 12) {
                return (
                    Math.floor((Date.now() - Number(time)) / (1000 * 60 * 60 * 24 * 30)) +
                    "月前"
                );
            } else {
                return (
                    Math.floor(
                        (Date.now() - Number(time)) / (1000 * 60 * 60 * 24 * 30 * 12)
                    ) + "年前"
                );
            }

        }
    
    const handlerTime2 = (time) => {
        let date = new Date(Number(time));
        let nowYear = new Date(Date.now).getFullYear();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        let day = date.getDate();
        if (day < 10) {
          day = "0" + day;
        }
        let hours = date.getHours();
        if (hours < 10) {
          hours = "0" + hours;
        }
        let minutes = date.getMinutes();
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        return month + "-" + day + " " + hours + ":" + minutes;
      }
    
    return {
        handlerTime1,
        handlerTime2
    }
}