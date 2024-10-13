import { MaxTextLengthPipe } from './max-text-length.pipe';

describe('MaxTextLengthPipe', () => {
  it('create an instance', () => {
    const pipe = new MaxTextLengthPipe();
    expect(pipe).toBeTruthy();
  });
});
