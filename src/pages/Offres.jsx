import { Link } from 'react-router-dom';

const Offres = () => {
  return (
    <main className="pt-[72px] bg-surface min-h-screen">
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-xs uppercase tracking-[0.28em] text-secondary-container font-bold mb-3">ENÉSENSE</p>
            <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface mb-4">Grille des offres et tarifs</h1>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Trois phases distinctes pour accompagner votre transformation numérique : Diagnostic, Déploiement et Pilotage.
              Chaque phase peut être souscrite indépendamment selon vos besoins.
            </p>
          </div>

          <div className="rounded-[2rem] border border-outline-variant/10 bg-surface-container-low p-8 shadow-sm mb-12">
            <h2 className="font-headline text-xl font-bold text-primary mb-4">Vue d'ensemble des offres</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
              La Phase 1 (Diagnostic) est recommandée comme point de départ pour tout nouveau client.
              Elle peut toutefois être omise si le client dispose déjà d'une vision claire de ses besoins.
              Le Diagnostic est offert sans frais si un contrat de Déploiement est signé dans les 30 jours suivant la remise du rapport.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant mb-2">Email principal</p>
                <p className="font-bold text-on-surface">contact@bricona.net</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant mb-2">Email fondateur</p>
                <p className="font-bold text-on-surface break-words">jeanbaptistesegbe@gmail.com</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant mb-2">WhatsApp</p>
                <p className="font-bold text-on-surface">+228 79 34 00 02</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant mb-2">Tel. & WhatsApp</p>
                <p className="font-bold text-on-surface">+228 96 85 58 63</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 mb-12">
            <article className="rounded-[2rem] border border-outline-variant/10 bg-white p-7 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-[0.24em] text-on-surface-variant font-bold">Phase 1</span>
                <span className="rounded-full bg-secondary-container/10 text-secondary-container px-3 py-1 text-[11px] font-bold uppercase">Diagnostic</span>
              </div>
              <h3 className="font-headline text-xl font-bold text-primary mb-4">Diagnostic structuré</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-5">
                En une à deux sessions de travail, nous analysons votre organisation, vos processus, vos outils et vos objectifs.
              </p>
              <ul className="space-y-2 text-sm text-on-surface-variant mb-5">
                {[
                  'Analyse complète de votre organisation et de vos processus',
                  'Identification des axes de blocage et des opportunités',
                  'Évaluation de votre maturité numérique',
                  'Recommandations priorisées avec estimation de valeur',
                  'Feuille de route détaillée',
                  'Rapport écrit remis sous 5 jours',
                ].map((item) => (
                  <li key={item} className="flex gap-2"><span className="material-symbols-outlined text-primary text-base">check</span>{item}</li>
                ))}
              </ul>
              <div className="rounded-3xl bg-surface-container-low p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-2">Tarif</p>
                <p className="text-2xl font-black text-primary">120 €</p>
                <p className="text-xs text-on-surface-variant mt-2">Offert si contrat Déploiement signé sous 7 jours</p>
              </div>
            </article>

            <article className="rounded-[2rem] border border-outline-variant/10 bg-white p-7 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-[0.24em] text-on-surface-variant font-bold">Phase 2</span>
                <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-[11px] font-bold uppercase">Déploiement</span>
              </div>
              <h3 className="font-headline text-xl font-bold text-primary mb-4">Déploiement sur mesure</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-5">
                Conception et mise en œuvre des solutions adaptées à votre projet, avec intégration, tests et formation.
              </p>
              <ul className="space-y-2 text-sm text-on-surface-variant mb-5">
                {[
                  'Conception des modules retenus',
                  'Implémentation et intégration',
                  'Tests et validation',
                  'Formation des utilisateurs',
                  'Support technique 30 jours',
                  'Documentation utilisateur en français',
                ].map((item) => (
                  <li key={item} className="flex gap-2"><span className="material-symbols-outlined text-primary text-base">check</span>{item}</li>
                ))}
              </ul>
              <div className="rounded-3xl bg-surface-container-low p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-2">Tarif</p>
                <p className="text-2xl font-black text-primary">Sur devis</p>
                <p className="text-xs text-on-surface-variant mt-2">A partir de 1 300 € selon la complexité</p>
              </div>
            </article>

            <article className="rounded-[2rem] border border-outline-variant/10 bg-white p-7 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-[0.24em] text-on-surface-variant font-bold">Phase 3</span>
                <span className="rounded-full bg-secondary-container/10 text-secondary-container px-3 py-1 text-[11px] font-bold uppercase">Pilotage</span>
              </div>
              <h3 className="font-headline text-xl font-bold text-primary mb-4">Accompagnement continu</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-5">
                Suivi des outils déployés, optimisation continue, support et accès prioritaire aux nouveautés.
              </p>
              <ul className="space-y-2 text-sm text-on-surface-variant mb-5">
                {[
                  'Surveillance et corrections mineures',
                  'Ajustements continus',
                  'Conseil mensuel',
                  'Support WhatsApp et email 24h',
                  'Accès prioritaire aux nouvelles fonctionnalités',
                  'Accès événements ENÉSENSE',
                ].map((item) => (
                  <li key={item} className="flex gap-2"><span className="material-symbols-outlined text-primary text-base">check</span>{item}</li>
                ))}
              </ul>
              <div className="rounded-3xl bg-surface-container-low p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-2">Formules</p>
                <p className="text-2xl font-black text-primary">90 €/mois ou 75 €/mois</p>
                <p className="text-sm text-on-surface-variant mt-2">90 €/mois ou 75 €/mois si abonnement annuel (sans frais cachés).</p>
              </div>
            </article>
          </div>

          <div className="rounded-[2rem] border border-outline-variant/10 bg-white p-7 shadow-sm mb-12">
            <h2 className="font-headline text-xl font-bold text-primary mb-4">Synthèse tarifaire</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-on-surface-variant">
                <thead>
                  <tr>
                    <th className="px-4 py-3 font-bold text-on-surface">Phase</th>
                    <th className="px-4 py-3 font-bold text-on-surface">Ce que vous obtenez</th>
                    <th className="px-4 py-3 font-bold text-on-surface">Tarif</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { phase: 'DIAGNOSTIC', detail: 'Rapport d’audit + feuille de route + recommandations chiffrées', tarif: '120 €' },
                    { phase: 'DEPLOIEMENT', detail: 'Conception, implémentation, formation — modules sur mesure', tarif: 'Sur devis' },
                    { phase: 'PILOTAGE', detail: 'Suivi opérationnel, support permanent, optimisation continue', tarif: '90 €/mois ou 75 €/mois si abonnement annuel sans frais cachés' },
                  ].map((row) => (
                    <tr key={row.phase} className="border-t border-outline-variant/20">
                      <td className="px-4 py-4 font-bold text-on-surface">{row.phase}</td>
                      <td className="px-4 py-4">{row.detail}</td>
                      <td className="px-4 py-4 font-bold text-primary">{row.tarif}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-[2rem] border border-outline-variant/10 bg-white p-7 shadow-sm mb-12">
            <h2 className="font-headline text-xl font-bold text-primary mb-4">Offre de lancement</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
              Les 5 premiers clients signataires d’un contrat de Déploiement bénéficient d’un mois de Pilotage offert et d’un accès prioritaire aux nouvelles fonctionnalités. Mentionnez ce document lors de votre prise de contact.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-surface-container-low p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-2">Adresse</p>
                <p className="font-bold text-on-surface">Lomé, Togo</p>
              </div>
              <div className="rounded-2xl bg-surface-container-low p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-2">RCCM</p>
                <p className="font-bold text-on-surface">TG-LFW-01-2025-B13-03086</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-white shadow-lg hover:bg-primary-container transition-all">
              Demander un devis
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Offres;
