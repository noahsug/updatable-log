const chalk = require('chalk');
const figures = require('figures');
const logUpdate = require('log-update');

const updateStdout = logUpdate.create(process.stdout, { showCursor: true });
let updating = false;

const log = {
  error,
  important,
  info,
  warn,
  update,
  clear,
  quiet: false,
};

function error(...msg) {
  finishUpdate();
  if (msg.length === 1 && msg[0] instanceof Error) {
    error(msg[0].message);
    console.log(
      chalk.gray(
        msg[0].stack
          .split('\n')
          .slice(1)
          .join('\n')
      )
    );
  } else {
    console.error(chalk.red('Error:'), ...msg);
  }
}

function important(...msg) {
  finishUpdate();
  console.log(...msg);
}

function info(...msg) {
  if (log.quiet) return;
  finishUpdate();
  console.info(...msg);
}

function warn(...msg) {
  if (log.quiet) return;
  finishUpdate();
  console.warn(chalk.yellow('Warning:'), ...msg);
}

function update(...msg) {
  if (log.quiet) return;
  updating = true;
  updateStdout(chalk.gray(figures.arrowRight, ...msg));
}

function clear() {
  if (log.quiet || !updating) return;
  updating = false;
  updateStdout.clear();
}

function finishUpdate() {
  if (!updating) return;
  updating = false;
  updateStdout.clear();
}

module.exports = log;
