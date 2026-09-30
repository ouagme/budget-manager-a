import {PrismaClient} from '@prisma/client'; const p=new PrismaClient();
async function main(){for(const [code,symbol,decimals] of [['MAD','د.م.',2],['EUR','€',2],['USD','$',2],['GBP','£',2],['CAD','$',2],['AED','د.إ',2] ] as const) await p.currency.upsert({where:{code},update:{},create:{code,symbol,decimals}}); console.log('Seeded currencies');} main().finally(()=>p.$disconnect());
