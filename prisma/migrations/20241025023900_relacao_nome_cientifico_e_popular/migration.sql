/*
  Warnings:

  - You are about to drop the column `nome_cientifico` on the `Planta` table. All the data in the column will be lost.
  - You are about to drop the `Nome_popular` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `CEP` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero_endereco` to the `Pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idNomeCientifico` to the `Planta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idNomePopular` to the `Planta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidade` to the `Planta` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Nome_popular" DROP CONSTRAINT "Nome_popular_idPlanta_fkey";

-- DropIndex
DROP INDEX "Planta_nome_cientifico_key";

-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "CEP" TEXT NOT NULL,
ADD COLUMN     "numero_endereco" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Planta" DROP COLUMN "nome_cientifico",
ADD COLUMN     "idNomeCientifico" INTEGER NOT NULL,
ADD COLUMN     "idNomePopular" INTEGER NOT NULL,
ADD COLUMN     "quantidade" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Nome_popular";

-- CreateTable
CREATE TABLE "Nome_Cientifico" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Nome_Cientifico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nome_Popular" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idNomeCientifico" INTEGER NOT NULL,

    CONSTRAINT "Nome_Popular_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nome_Cientifico_nome_key" ON "Nome_Cientifico"("nome");

-- AddForeignKey
ALTER TABLE "Planta" ADD CONSTRAINT "Planta_idNomeCientifico_fkey" FOREIGN KEY ("idNomeCientifico") REFERENCES "Nome_Cientifico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Planta" ADD CONSTRAINT "Planta_idNomePopular_fkey" FOREIGN KEY ("idNomePopular") REFERENCES "Nome_Popular"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nome_Popular" ADD CONSTRAINT "Nome_Popular_idNomeCientifico_fkey" FOREIGN KEY ("idNomeCientifico") REFERENCES "Nome_Cientifico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
