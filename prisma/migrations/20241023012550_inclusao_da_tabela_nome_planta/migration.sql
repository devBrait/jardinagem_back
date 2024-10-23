/*
  Warnings:

  - You are about to drop the column `nome_social` on the `Planta` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nome_cientifico]` on the table `Planta` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ativo` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Planta" DROP COLUMN "nome_social";

-- CreateTable
CREATE TABLE "Nome_popular" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idPlanta" INTEGER NOT NULL,

    CONSTRAINT "Nome_popular_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Planta_nome_cientifico_key" ON "Planta"("nome_cientifico");

-- AddForeignKey
ALTER TABLE "Nome_popular" ADD CONSTRAINT "Nome_popular_idPlanta_fkey" FOREIGN KEY ("idPlanta") REFERENCES "Planta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
