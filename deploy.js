if (process.env.NODE_ENV === 'production') {                                                                        // Since postinstall will also run when you run npm install, locally we make sure it only runs in production.

  var child_process = require('child_process');                                                                     // We basically just create a child process that will run the production bundle command.
  return child_process.exec("webpack -p --config webpack.production.config.js", function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}
