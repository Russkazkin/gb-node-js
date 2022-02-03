import colors from 'colors';

const args = process.argv.slice(2);

const [ test ] = args;
console.log(`${colors.green(test)}`);