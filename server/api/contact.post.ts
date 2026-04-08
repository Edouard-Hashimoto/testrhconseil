import nodemailer from 'nodemailer';
import { useDb } from '../utils/db';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { nom, prenom, telephone, email, message } = body;

  const db = useDb();
  
  // 1. Sauvegarde dans la base de données (sécurité en cas d'échec mail)
  try {
    await db.execute({
      sql: 'INSERT INTO messages (nom, prenom, email, telephone, message) VALUES (?, ?, ?, ?, ?)',
      args: [nom, prenom, email, telephone || null, message]
    });
  } catch (dbError) {
    console.error('Erreur lors du stockage du message en BDD :', dbError);
    // On continue quand même pour essayer d'envoyer le mail
  }

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
    return { success: true, message: 'Message enregistré et envoyé avec succès !' };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email :', error);
    // On retourne quand même un succès partiel ou une info car le message est en BDD
    return { 
      success: true, 
      warning: 'Le message a été enregistré mais l\'envoi de l\'email a échoué.',
      message: 'Votre message a bien été pris en compte.' 
    };
  }
});
