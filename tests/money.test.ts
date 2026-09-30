import {describe,it,expect} from 'vitest'; import {convert,decimal,fromMicro} from '../src/lib/money';
describe('money',()=>{it('preserves decimal arithmetic',()=>expect(fromMicro(decimal('1234.567890'),2)).toBe('1234.56'));it('converts with fixed decimal representation',()=>expect(convert('100','0.92',2)).toBe('92.00'));});
