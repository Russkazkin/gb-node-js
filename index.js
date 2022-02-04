import colors from 'colors';

const args = process.argv.slice(2);

const num1 = args[0].trim();
const num2 = args[1].trim();
if (typeof(num1) !== 'number' || typeof(num2) !== 'number' || num1 <= 1 || num2 <=1) {
    console.log(`${colors.red('Введенные параметры должны быть положительными числами больше 1')}`);
}
const start = +num1 < +num2 ? +num1 : +num2;
const finish = start === +num1 ? +num2 : +num1;

console.log(start, 'start');
console.log(finish, 'finish');

const primes = [];

nextPrime:
for (let i = 2; i <= finish; i++) {
    for (let j = 2; j < i; j++) {
        if (i % j === 0) continue nextPrime;
    }
    primes.push(i);
}
console.log(primes);