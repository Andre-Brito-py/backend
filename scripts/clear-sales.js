import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Limpando vendas (Sale, SaleItem, SaleItemAdditional)...');
  const [resAdd, resItem, resSale] = await prisma.$transaction([
    prisma.saleItemAdditional.deleteMany({}),
    prisma.saleItem.deleteMany({}),
    prisma.sale.deleteMany({}),
  ]);
  console.log(`SaleItemAdditionals removidos: ${resAdd.count}`);
  console.log(`SaleItems removidos: ${resItem.count}`);
  console.log(`Sales removidas: ${resSale.count}`);
  console.log('Concluído. Observação: estoques de produtos não foram ajustados.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });