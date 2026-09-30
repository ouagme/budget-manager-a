export type Money = { amount:string; currency:string };
export function decimal(value:string|number):bigint{ const s=String(value); const [a,b='']=s.split('.'); return BigInt(a.replace(/[^0-9-]/g,'' )||'0')*1000000n+BigInt((b+'000000').slice(0,6)); }
export function fromMicro(v:bigint, precision=2){ const neg=v<0n; const x=neg?-v:v; const s=x.toString().padStart(7,'0'); const whole=s.slice(0,-6)||'0'; const frac=s.slice(-6).slice(0,precision).padEnd(precision,'0'); return `${neg?'-':''}${whole}${precision?'.'+frac:''}`; }
export function convert(amount:string, rate:string, precision=2){ return fromMicro((decimal(amount)*decimal(rate))/1000000n,precision); }
