import assert from 'assert';
import karma from 'tsds-karma';

describe('exports .ts', () => {
  it('defaults', () => {
    assert.equal(typeof karma, 'function');
  });
});
