/* eslint-disable node/no-unpublished-require */
const nodemon = require('gulp-nodemon');

function server (done) {
  return nodemon({
    script: 'index.js',
    ext: 'js',
    env: {
      NODE_ENV: 'development',
    },
    ignore: ['gulpfile.js'],
    done: done,
  });
}

exports.start = server;
