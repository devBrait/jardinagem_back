import * as nomeCientificoService from '../services/nomeCientificoService'

export const getAllAsync = async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 10
    const search = req.query.search || ''

    const response = await nomeCientificoService.getAllAsync(
      page,
      limit,
      search
    )

    res.status(200).json({
      success: true,
      items: response.items,
      pagination: {
        total: response.total,
        totalPages: response.totalPages,
        currentPage: page,
        itemsPerPage: limit,
        hasNext: page < response.totalPages,
        hasPrevious: page > 1,
      },
    })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}

export const AddAsync = async (req, res) => {
  try {
    const { nome } = req.body
    const response = await nomeCientificoService.AddAsync(nome)
    res.status(200).json({ success: true, data: response })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
}
