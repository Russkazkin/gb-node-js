import EventEmitter from 'events';
import moment from "moment";
import colors from "colors";
import Timer from "./Listners/Timer.js";

const args = process.argv.slice(2);

const [t] = args;

const time = moment(t, 'DD/MM/YYYY HH:mm:ss').unix() - moment().unix();

const emitter = new EventEmitter;
emitter.on('tick', Timer.tick);
emitter.on('finish', Timer.timerFinishAlert);

if (time < 0) {
    console.log(`${colors.red('Время старта должно быть в будущем.')}`);
    process.exit(1)
}

let left = time;
const timer = setInterval(() => {
    left--;
    emitter.emit('tick', left);
}, 1000);
setTimeout(() => {
    clearInterval(timer);
    emitter.emit('finish', 'Готово!')
}, time * 1000);