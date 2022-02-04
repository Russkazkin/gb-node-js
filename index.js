import colors from 'colors';

const args = process.argv.slice(2);

const num1 = args[0].trim();
const num2 = args[1].trim();
if (typeof(num1) !== 'number' || typeof(num2) !== 'number' || num1 <= 0 || num2 <=0) {
    console.log(`${colors.red('Введенные параметры должны быть положительными числами')}`);
}
const start = +num1 < +num2 ? +num1 : +num2;
const finish = start === +num1 ? +num2 : +num1;

console.log(start, 'start');
console.log(finish, 'finish');