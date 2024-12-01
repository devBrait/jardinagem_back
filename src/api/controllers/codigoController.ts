import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export const enviaCodigoAsync = async (req, res) => {
  try {
    const codigo = [
      Math.floor(Math.random() * 9) + 1,
      ...Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)),
    ].join('')

    const { email } = req.body

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Seu Código de Verificação',
      text: `Seu código de verificação é: ${codigo}`,
      html: `<p>Seu código de verificação é: <b>${codigo}</b></p><p>Atenciosamente,<br>UmEntrePosto</p>`,
    })

    res.status(201).json({ success: true, codigo })
  } catch (error) {
    throw new Error('Não foi possível enviar o email.')
  }
}
