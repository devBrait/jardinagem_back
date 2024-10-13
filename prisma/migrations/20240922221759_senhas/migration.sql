/*
  Warnings:

  - Added the required column `senha` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "senha" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Fornecedor" ADD COLUMN     "senha" TEXT NOT NULL;
