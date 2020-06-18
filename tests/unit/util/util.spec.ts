import { util } from '@/util/util';

describe('util', () => {
  it('checksPasswordComplexity(): should return only pass comlexed password value', () => {
    const weak = [
      '',
      '0',
      'a',
      'あ',
      '0a',
      '0aA',      
      '00?aa?AA',      
      '00-aa-AA?',
      '00-aa-AAあ',      
    ].map(util.checksPasswordComplexity).every(res => res === false);
    const strong = [
      '00aaAA',
      '00-aa-AA',      
      '00_aa_AA',      
    ].map(util.checksPasswordComplexity).every(res => res === true);

    expect(weak).toBeTruthy();
    expect(strong).toBeTruthy();
  });
})
