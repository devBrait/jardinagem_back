import { createAsync } from "../services/plantaService";

export const cadastroPlanta = async (req, res) => {
    try {
        const {
            fornecedor, 
            nome_social, 
            nome_cientifico, 
            variedade, 
            cor_floracao, 
            porte, 
            topiaria, 
            forma_tronco, 
            quant_ramos, 
            dap, 
            diametro_copa, 
            altura_ramo, 
            altura_total, 
            peso_medio, 
            volume, 
            entouceirada, 
            tutorada, 
            embalagem, 
            diametro_base, 
            concatenar_diametro, 
            obs, 
            ativo, 
            pedidoItems} = req.body

        const plantaData = {
            fornecedor: fornecedor, 
            nome_social: nome_social, 
            nome_cientifico: nome_cientifico, 
            variedade: variedade, 
            cor_floracao: cor_floracao, 
            porte: porte, 
            topiaria: topiaria, 
            forma_tronco: forma_tronco, 
            quant_ramos: quant_ramos, 
            dap: dap, 
            diametro_copa: diametro_copa, 
            altura_ramo: altura_ramo, 
            altura_total: altura_total, 
            peso_medio: peso_medio, 
            volume: volume, 
            entouceirada: entouceirada, 
            tutorada: tutorada, 
            embalagem: embalagem, 
            diametro_base: diametro_base, 
            concatenar_diametro: concatenar_diametro, 
            obs: obs, 
            ativo: ativo, 
            pedidoItems: pedidoItems
        }

        const planta = await createAsync(plantaData)

        const plantaResponse = {
            ...planta,
            fornecedor: JSON.stringify(plantaData.fornecedor),
            pedidoItems: JSON.stringify(plantaData.pedidoItems),
        }

        return res.status(201).json(plantaResponse)
    }

    catch(error){
        res.status(500).json({error: "Ocorreu um erro ao cadastrar a planta"})
    }
}