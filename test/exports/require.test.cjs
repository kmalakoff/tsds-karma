const assert = require('assert');
const karma = require('tsds-karma');

describe('exports .cjs', () => {
  it('defaults', () => {
    assert.equal(typeof karma, 'function');
  });
});
