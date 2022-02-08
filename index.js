import moment from "moment";
import colors from "colors";

const args = process.argv.slice(2);

const [t] = args;

const timer = moment(t, 'DD/MM/YYYY HH:mm:ss').unix() - moment().unix();

if (timer < 0) {
    console.log(`${colors.red('Время старта должно быть в будущем.')}`);
    process.exit(1)
}

console.log(timer);