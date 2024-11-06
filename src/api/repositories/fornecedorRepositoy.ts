import { prisma } from '../../database/prisma'

export const verificaFornecedorAsync = async (cnpj: number, email: string) => {
  try {
    const fornecedorCNPJ = await prisma.fornecedor.findUnique({
      where: { CNPJ: cnpj },
    })

    const fornecedorEmail = await prisma.fornecedor.findUnique({
      where: { email: email },
    })

    let mensagem = null

    if (fornecedorCNPJ) {
      mensagem = 'CNPJ já cadastrado'
      return mensagem
    }

    if (fornecedorEmail) {
      mensagem = 'Email já cadastrado'
      return mensagem
    }

    return mensagem
  } catch (error) {
    throw new Error(`Erro ao verificar fornecedor: ${error.message}`)
  }
}

export const getByEmailAsync = async (email: string) => {
  try {
    const fornecedor = await prisma.fornecedor.findUnique({
      where: { email: email },
    })

    return fornecedor
  } catch (error) {
    throw new Error(`Erro ao buscar fornecedor por email: ${error.message}`)
  }
}

export const getAllAsync = async (limit, offset) => {
  try {
    const [fornecedores, total] = await prisma.$transaction([
      prisma.fornecedor.findMany({
        skip: offset,
        take: limit,
      }),
      prisma.fornecedor.count(),
    ])

    return { fornecedores, total }
  } catch (error) {
    throw new Error(
      `Erro ao buscar fornecedores com contagem total: ${error.message}`
    )
  }
}
