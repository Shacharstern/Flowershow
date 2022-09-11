import chalk from 'chalk';

export const log = (msg = '') => {
  console.log(msg);
}

export const info = (msg) => {
  console.log(`${chalk.bgBlueBright.black(' INFO ')} ${msg}`);
}

export const error = (msg) => {
  console.error(`${chalk.bgRed(' ERROR ')} ${chalk.red(msg)}`)
  if (msg instanceof Error) {
    console.error(msg.stack)
  }
}
