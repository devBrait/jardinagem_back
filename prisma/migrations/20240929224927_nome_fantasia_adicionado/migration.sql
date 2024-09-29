/*
  Warnings:

  - Added the required column `nome_fantasia` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fornecedor" ADD COLUMN     "nome_fantasia" TEXT NOT NULL;
