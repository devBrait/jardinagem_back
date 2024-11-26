import * as nomePopularService from '../services/nomePopularService'

export const AddAsync = async (req, res) => {
  try {
    const { nome, idNomeCientifico } = req.body
    console.log(req.body)

    const response = await nomePopularService.addAsync(nome, idNomeCientifico)

    res.status(200).json({ success: true, data: response })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

export const GetAllAsync = async (req, res) => {
  try {
    const response = await nomePopularService.GetAllAsync()

    res.status(200).json({ success: true, data: response })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}
