import assert from 'assert';
import karma from 'tsds-karma';

describe('exports .mjs', () => {
  it('defaults', () => {
    assert.equal(typeof karma, 'function');
  });
});
