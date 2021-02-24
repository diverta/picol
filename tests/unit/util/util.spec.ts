import { util } from '@/util/util';
import distanceInWords from 'date-fns/distance_in_words';
import parse from 'date-fns/parse';

describe('util', () => {
  it('checksPasswordComplexity(): should return only pass comlexed password value', () => {
    const weak = ['', '0', 'a', 'あ', '0a', '0aA', '00?aa?AA', '00-aa-AA?', '00-aa-AAあ']
      .map(util.checksPasswordComplexity)
      .every((res) => res === false);
    const strong = ['00aaAA', '00-aa-AA', '00_aa_AA'].map(util.checksPasswordComplexity).every((res) => res === true);

    expect(weak).toBeTruthy();
    expect(strong).toBeTruthy();
  });

  [
    { origin: '2020-10-10T10:10:10', now: '2020-10-10T10:10:11', expected: 'in less than a minute' },
    { origin: '2020-10-10T10:10:10', now: '2020-10-10T10:30:10', expected: 'in 20 minutes' },
    { origin: '2020-10-10T10:10:10', now: '2020-10-11T10:10:10', expected: 'in 1 day' },
    { origin: '2020-10-10T10:10:10', now: '2020-11-10T10:10:10', expected: 'in about 1 month' },
  ].forEach(({ origin, now, expected }) => {
    it(`getHowLongBeforePostedData() ${expect}`, () => {
      // arrange
      Date.now = jest.fn(() => new Date(origin).getTime());

      // act
      const res = util.getHowLongBeforePostedData(now);

      // assert
      // console.log(res);
      expect(res).toBe(expected);
    });
  });
});
