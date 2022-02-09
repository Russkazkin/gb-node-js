import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

class Timer {
    static tick(seconds) {
        momentDurationFormatSetup(moment);
        console.log(`Осталось: ${moment.duration(seconds, 'seconds').format('yy/MM/dd hh:mm:ss')}`);
    }

    static timerFinishAlert(message) {
        console.log(message);
    }
}

export default Timer;