import { ServicePriceFormatPipe } from './service-price-format.pipe';

describe('ServicePriceFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new ServicePriceFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
