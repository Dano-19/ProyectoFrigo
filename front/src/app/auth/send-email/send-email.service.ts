import * as nodemailer from 'nodemailer';

export async function sendRecoveryEmail(email: string, code: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: 'gmail',  // Usa Gmail u otro servicio para enviar el correo
    auth: {
      user: 'jossymena@gmail.com',
      pass: 'JaMb0520',  // Contraseña de tu correo o contraseña de aplicación (si usas Gmail)
    },
  });

  const mailOptions = {
    from: 'jossymena@gmail.com',  // Dirección de correo del remitente
    to: email,  // Dirección de correo del destinatario
    subject: 'Recuperación de Contraseña',  // Asunto del correo
    text: `Tu código de recuperación es: ${code}`,  // Cuerpo del correo con el código
  };

  // Enviar el correo
  await transporter.sendMail(mailOptions);
}
