<script setup>
useHead({
  title: 'Mentions Légales - RH Conseil 71',
  meta: [{ name: 'description', content: 'Consultez les mentions légales et la politique de confidentialité de RH Conseil 71.' }]
})
</script>

<template>
  <div class="legal-page">
    <div class="legal-container">
      <h1 class="page-title">Mentions Légales</h1>
      
      <section class="legal-section">
        <h2>Éditeur du site</h2>
        <p><strong>RH CONSEIL 71</strong></p>
        <p>Association loi 1901</p>
        <p>75 Grande Rue Saint-Cosme</p>
        <p>71100 CHALON SUR SAÔNE</p>
        <p><strong>Directrice générale :</strong> Madame Isabelle LAUGERETTE</p>
      </section>

      <section class="legal-section">
        <h2>Hébergement</h2>
        <p>Le site est hébergé par la société :</p>
        <p><strong>OVH Cloud</strong></p>
        <p>2 rue Kellermann - 59100 Roubaix - France</p>
      </section>

      <section class="legal-section">
        <h2>Respect de la vie privée et RGPD</h2>
        <p>
          RH CONSEIL 71 s'engage à ce que la collecte et le traitement de vos données soient conformes au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
        </p>
        
        <div class="legal-box">
          <h3>Cookies et traceurs</h3>
          <p>
            Aucun traceur (cookie) n'est déposé sur votre navigateur, aucune donnée n'est collectée lors de votre simple visite sur ce site.
          </p>
        </div>

        <div class="legal-box info-box">
          <h3>Données personnelles (Formulaire de contact)</h3>
          <p>
            Lors de l'envoi d'une demande de contact via notre formulaire, les informations suivantes sont enregistrées :
          </p>
          <ul>
            <li>Nom et Prénom</li>
            <li>Adresse E-mail</li>
            <li>Numéro de téléphone</li>
            <li>Contenu du message</li>
            <li>Adresse IP de l'expéditeur</li>
          </ul>
          <p>
            Ces données sont collectées dans le seul but de traiter votre demande et sont conservées par RH CONSEIL 71 pendant la durée nécessaire à la gestion de la relation commerciale. 
            Elles ne sont jamais cédées ou vendues à des tiers.
          </p>
        </div>

        <h3>Vos droits</h3>
        <p>
          Conformément à la réglementation, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données vous concernant. 
          Pour exercer ces droits, vous pouvez nous contacter à l'adresse du siège social mentionnée ci-dessus.
        </p>
      </section>

      <section class="legal-section">
        <h2>Propriété intellectuelle</h2>
        <p>
          L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
          Tous les droits de reproduction sont réservés, y compris les représentations iconographiques et photographiques.
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.legal-page {
  padding: 100px 1rem 6rem;
  background-color: #f8fafc;
  min-height: 100vh;
}

.legal-container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 4rem;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.04);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 850;
  color: #1a1a2e;
  margin-bottom: 3rem;
  text-align: center;
}

.legal-section {
  margin-bottom: 3rem;
}

.legal-section h2 {
  font-size: 1.4rem;
  font-weight: 800;
  color: #e91e8c;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.legal-section h2::after {
  content: '';
  flex: 1;
  height: 2px;
  background: #f1f5f9;
}

.legal-section p {
  line-height: 1.8;
  color: #475569;
  margin-bottom: 0.75rem;
}

.legal-box {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  margin: 1.5rem 0;
}

.legal-box h3 {
  font-size: 1rem;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 0.75rem;
}

.info-box {
  border-left: 4px solid #e91e8c;
  background: rgba(233, 30, 140, 0.02);
}

.info-box ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.info-box li {
  color: #475569;
  padding-left: 1.5rem;
  position: relative;
  margin-bottom: 0.5rem;
}

.info-box li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #e91e8c;
  font-weight: bold;
}

@media (max-width: 600px) {
  .legal-container {
    padding: 2rem 1.5rem;
  }
  .page-title {
    font-size: 1.8rem;
  }
}
</style>
