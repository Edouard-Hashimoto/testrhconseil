import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { nom, prenom, telephone, email, message } = body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS, 
    },
  });

  const mailOptions = {
    from: `"${nom} ${prenom}" <${email}>`,
    to: 'accueil@rhconseil71.com',
    subject: `Nouveau message de contact : ${nom} ${prenom}`,
    text: `
      Nom : ${nom}
      Prénom : ${prenom}
      Email : ${email}
      Téléphone : ${telephone || 'Non renseigné'}
      
      Message :
      ${message}
    `,
    html: `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom :</strong> ${nom}</p>
      <p><strong>Prénom :</strong> ${prenom}</p>
      <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Téléphone :</strong> ${telephone || 'Non renseigné'}</p>
      <br>
      <p><strong>Message :</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    `,
    replyTo: email
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Email envoyé avec succès !' };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email :', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur lors de l\'envoi de l\'email.',
    });
  }
});
