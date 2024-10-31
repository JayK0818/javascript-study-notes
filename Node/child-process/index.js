const { spawn } = require('node:child_process');

(function () {
    const ls = spawn('ls', ['-lh', '/usr']);
    ls.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    ls.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    })
})();