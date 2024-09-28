import chalk from 'chalk'

console.log(chalk.blue('Hello World!'))

const log = console.log

log(chalk.blue('Hello') + ' World' + chalk.red('!'));

// ------------------ multiple styles using the chainable API
log(chalk.blue.bgRed.bold('Hello world!'))

// ---------- multiple arguments -------------
log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));

// --------------- Nest styles ----------------
log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

log(`
CPU: ${chalk.red('90%')}
RAM: ${chalk.green('40%')}
DISK: ${chalk.yellow('70%')}
`);

log(chalk.red.italic('hello italic'))