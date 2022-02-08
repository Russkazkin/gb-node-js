import moment from "moment";
import colors from "colors";

const args = process.argv.slice(2);

const [t] = args;

const time = moment(t, 'DD/MM/YYYY HH:mm:ss').unix() - moment().unix();

if (time < 0) {
    console.log(`${colors.red('Время старта должно быть в будущем.')}`);
    process.exit(1)
}

let left = time;
const timer = setInterval(() => {
    left--;
    console.log(left);
}, 1000);
setTimeout(() => {
    clearInterval(timer);
    console.log('finish');
}, time * 1000);


console.log(time);