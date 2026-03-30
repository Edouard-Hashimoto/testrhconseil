import { d as defineEventHandler, r as readBody, c as createError } from '../../_/nitro.mjs';
import nodemailer from 'nodemailer';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const contact_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { nom, prenom, telephone, email, message } = body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  const mailOptions = {
    from: `"${nom} ${prenom}" <${email}>`,
    to: "accueil@rhconseil71.com",
    subject: `Nouveau message de contact : ${nom} ${prenom}`,
    text: `
      Nom : ${nom}
      Pr\xE9nom : ${prenom}
      Email : ${email}
      T\xE9l\xE9phone : ${telephone || "Non renseign\xE9"}
      
      Message :
      ${message}
    `,
    html: `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom :</strong> ${nom}</p>
      <p><strong>Pr\xE9nom :</strong> ${prenom}</p>
      <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>T\xE9l\xE9phone :</strong> ${telephone || "Non renseign\xE9"}</p>
      <br>
      <p><strong>Message :</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    `,
    replyTo: email
  };
  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email envoy\xE9 avec succ\xE8s !" };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Erreur lors de l'envoi de l'email."
    });
  }
});

export { contact_post as default };
//# sourceMappingURL=contact.post.mjs.map
