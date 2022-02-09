import EventEmitter from 'events';
import moment from "moment";
import colors from "colors";
import Timer from "./Listners/Timer.js";
import Time from "./Helpers/Time.js";

const args = process.argv.slice(2);

const [t] = args;

const time = moment(t, 'DD/MM/YYYY HH:mm:ss').unix() - moment().unix();

const emitter = new EventEmitter;
emitter.on('tick', Timer.tick);
emitter.on('finish', Timer.timerFinishAlert);

if (time < 1) {
    console.log(`${colors.red('Время старта должно быть в будущем.')}`);
    process.exit(1)
}

let left = time;
const timer = setInterval(() => {
    left--;
    emitter.emit('tick', left);
}, 1000);
Time.setTimeout(() => {
    clearInterval(timer);
    emitter.emit('finish', 'Готово!')
}, time * 1000);