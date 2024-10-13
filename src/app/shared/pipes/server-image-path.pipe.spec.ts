import { ServerImagePathPipe } from './server-image-path.pipe';

describe('ServerImagePathPipe', () => {
  it('create an instance', () => {
    const pipe = new ServerImagePathPipe();
    expect(pipe).toBeTruthy();
  });
});
