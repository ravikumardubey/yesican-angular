"use strict";

const execSync = require("child_process").execSync;
const path = require("path");

const SEPARATOR = process.platform === "win32" ? ";" : ":",
  env = Object.assign({}, process.env);

env.PATH = path.resolve("./node_modules/.bin") + SEPARATOR + env.PATH;

function executeScript(cmd) {
  try {
    const output = execSync(cmd, {
      cwd: process.cwd(),
      env: env,
    });
    console.log(`output: ${output}`);
  } catch (err) {
    if (err.stdout || err.stderr || err.output) {
      console.log(
        `stdout: ${err.stdout} \n stderr: ${err.stderr} \n output: ${err.output}`
      );
    }
    throw err;
  }
}

if (process.env.ON_PRODUCTION === "true") {
  console.log("> Production build");
  executeScript(
    "node --max_old_space_size=1024 node_modules/@angular/cli/bin/ng build --configuration production && node --max_old_space_size=1024 node_modules/@angular/cli/bin/ng run yesican:server:production"
  );
} else {
  console.log("> Local build");
  executeScript(
    "node --max_old_space_size=512 node_modules/@angular/cli/bin/ng build && node --max_old_space_size=1024 node_modules/@angular/cli/bin/ng run yesican:server:production"
  );
}
