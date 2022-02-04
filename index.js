import colors from 'colors';

const args = process.argv.slice(2);

const num1 = +args[0].trim();
const num2 = +args[1].trim();
if (!num1 || !num2 || num1 <= 1 || num2 <= 1) {
    console.log(`${colors.red('Введенные параметры должны быть положительными числами больше 1')}`);
    process.exit(1)
}
const start = num1 < num2 ? num1 : num2;
const finish = start === num1 ? num2 : num1;

const primes = [];

nextPrime:
for (let i = 2; i <= finish; i++) {
    for (let j = 2; j < i; j++) {
        if (i % j === 0) continue nextPrime;
    }
    primes.push(i);
}

const output = primes.filter(prime => prime >= start);
if (!output.length) {
    console.log(`${colors.red('В заданном диапазоне простые числа не найдены')}`);
    process.exit(2)
}

output.forEach(prime => {
    let color, c = 1;
    while (output.length) {
        if (c > 3) c = 1;
        switch (c) {
            case 1:
                color = 'green';
                break;
            case 2:
                color = 'yellow';
                break
            case 3:
                color = 'red';
                break;
            default:
                throw 'Something went wrong.'
        }
        console.log(`${colors[color](`${output.shift()}`)}`);
        c++;
    }
});