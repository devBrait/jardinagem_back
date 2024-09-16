/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "CPF" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "CEP" TEXT NOT NULL,
    "telefone" INTEGER NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" SERIAL NOT NULL,
    "CNPJ" INTEGER NOT NULL,
    "razao_social" TEXT NOT NULL,
    "ctt_1" TEXT NOT NULL,
    "telefone_1" INTEGER NOT NULL,
    "ctt_2" TEXT NOT NULL,
    "telefone_2" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "CEP" TEXT NOT NULL,
    "obs" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL,

    CONSTRAINT "Fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Planta" (
    "id" SERIAL NOT NULL,
    "idFornecedor" INTEGER NOT NULL,
    "nome_social" TEXT NOT NULL,
    "nome_cientifico" TEXT NOT NULL,
    "variedade" TEXT NOT NULL,
    "cor_floracao" TEXT NOT NULL,
    "porte" TEXT NOT NULL,
    "topiaria" TEXT NOT NULL,
    "forma_tronco" TEXT NOT NULL,
    "quant_ramos" INTEGER NOT NULL,
    "dap" INTEGER NOT NULL,
    "diametro_copa" DOUBLE PRECISION NOT NULL,
    "altura_ramo" DOUBLE PRECISION NOT NULL,
    "altura_total" DOUBLE PRECISION NOT NULL,
    "peso_medio" DOUBLE PRECISION NOT NULL,
    "volume" INTEGER NOT NULL,
    "entouceirada" BOOLEAN NOT NULL,
    "tutorada" BOOLEAN NOT NULL,
    "embalagem" TEXT NOT NULL,
    "diametro_base" DOUBLE PRECISION NOT NULL,
    "concatenar_diametro" BOOLEAN NOT NULL,
    "obs" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL,

    CONSTRAINT "Planta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_CPF_key" ON "Cliente"("CPF");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_CNPJ_key" ON "Fornecedor"("CNPJ");

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_email_key" ON "Fornecedor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_CEP_key" ON "Fornecedor"("CEP");

-- AddForeignKey
ALTER TABLE "Planta" ADD CONSTRAINT "Planta_idFornecedor_fkey" FOREIGN KEY ("idFornecedor") REFERENCES "Fornecedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
