const assert = require('assert');
const suite = new (require('benchmark').Suite)();
const { Stream } = require('stream');

const render = require('../dist/umi.server.js');

// add tests
suite
  .add('ssr#normal /', {
    defer: true,
    fn: (deferred) => {
      render({
        path: '/',
      }).then((res) => {
        if (res.html) {
          deferred.resolve();
        } else {
          suite.abort();
        }
      });
    },
  })
  .add('ssr#normal#stream /', {
    defer: true,
    fn: (deferred) => {
      render({
        path: '/',
        mode: 'stream',
      }).then((res) => {
        if (res.html instanceof Stream) {
          deferred.resolve();
        } else {
          suite.abort();
        }
      });
    },
  })
  .on('complete', function () {
    console.log('result: ');
    // console.log(this)
    this.forEach(function (result) {
      console.log(result.name, result.count, result.times.elapsed);
    });
    assert.equal(
      this.filter('fastest').map('name'),
      'ssr#normal#stream /',
      'expect ssr#normal#stream to be the fastest',
    );
  })
  .run();
