import { prisma } from "../../database/prisma"

export const getPlantaPopularByIdAsync = async (id: number) => {
    try {
        const plantaPopular = prisma.nome_Popular.findUnique({
            where: {id: Number(id)}
        })

        if (!plantaPopular){
            throw new Error(`Erro: ID verificado não existe.`)
        }

        return plantaPopular
    }
    
    catch (error){
        throw new Error(`Erro: ID verificado não existe : ${error.message}}`)
    }
}

export const getAllPlantaById = async (id: number) => {
    try {
        const plantaPopular = await getPlantaPopularByIdAsync(id);
        const idPlantaCientifica = plantaPopular.idNomeCientifico


        const nomePlantaCientifica = await prisma.nome_Cientifico.findUnique( {
            where: {
                id: idPlantaCientifica
            },
            select:{
                nome: true
            }
        })

        if(!nomePlantaCientifica){
            throw new Error("Planta verificada não existe.")
        }
        
        const plantas = await prisma.planta.findMany( {
            where: {
                nome_cientifico: nomePlantaCientifica
            }
        })

        return plantas
    }
    catch (error){
        throw error
    }
}
