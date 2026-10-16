import { useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Lightbulb,
  Palette,
  Send,
  Workflow,
} from 'lucide-react';
import CandidatureFAB from '../components/CandidatureFAB';
import CandidatureModal from '../components/CandidatureModal';
import { useLanguage } from '../utils/LanguageContext';

const Careers = () => {
  const { t } = useLanguage();
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState('');

  const roles = [
    {
      profile: 'developpeur-fullstack',
      icon: Code2,
      title: t('Développement logiciel', 'Software development'),
      description: t(
        'Concevez des applications web et des outils numériques utiles, de la réflexion technique à la mise en production.',
        'Build useful web applications and digital tools, from technical discovery through to production.',
      ),
      skills: ['Frontend', 'Backend', 'Full Stack'],
    },
    {
      profile: 'devops',
      icon: Workflow,
      title: t('Cloud & infrastructure', 'Cloud & infrastructure'),
      description: t(
        'Contribuez à des environnements fiables, à l’automatisation des déploiements et à la qualité des plateformes.',
        'Help create reliable environments, automate deployments and improve platform quality.',
      ),
      skills: ['DevOps', 'Cloud', 'Automation'],
    },
    {
      profile: 'ui-ux',
      icon: Palette,
      title: t('Produit & expérience', 'Product & experience'),
      description: t(
        'Transformez les besoins des utilisateurs en parcours simples, interfaces accessibles et produits cohérents.',
        'Turn user needs into simple journeys, accessible interfaces and cohesive products.',
      ),
      skills: ['UI/UX', 'Product design', 'Research'],
    },
    {
      profile: 'chef-projet',
      icon: BriefcaseBusiness,
      title: t('Gestion de projet', 'Project management'),
      description: t(
        'Faites avancer les projets avec les équipes et les clients, en gardant le cap sur les objectifs et la qualité.',
        'Move projects forward with teams and clients while keeping focus on outcomes and quality.',
      ),
      skills: ['Coordination', 'Agile', 'Delivery'],
    },
    {
      profile: 'commercial',
      icon: Lightbulb,
      title: t('Conseil & développement commercial', 'Consulting & business development'),
      description: t(
        'Aidez les entreprises à clarifier leurs enjeux et à identifier les solutions numériques qui leur correspondent.',
        'Help businesses clarify their challenges and identify digital solutions that fit their needs.',
      ),
      skills: ['Conseil', 'Partenariats', 'Commercial'],
    },
  ];

  const openApplication = (profile = '') => {
    setSelectedProfile(profile);
    setApplicationOpen(true);
  };

  return (
    <main className="pt-[72px]">
      <section className="relative isolate overflow-hidden bg-[#07172b] text-white">
        <div className="pointer-events-none absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-16 -top-24 h-[26rem] w-[26rem] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute right-[12%] top-20 h-64 w-64 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="relative mx-auto grid min-h-[520px] max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-yellow-300">
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              {t('Carrières chez Enésense', 'Careers at Enésense')}
            </span>
            <h1 className="mt-7 font-headline text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              {t('Construisons des solutions qui font avancer les entreprises.', 'Build solutions that move businesses forward.')}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              {t(
                'Enésense rassemble des talents du numérique autour de projets concrets : logiciels sur mesure, automatisation et produits digitaux.',
                'Enésense brings digital talent together around meaningful projects: custom software, automation and digital products.',
              )}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => openApplication()}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-bold text-[#07172b] shadow-lg shadow-yellow-400/15 transition hover:-translate-y-0.5 hover:bg-yellow-300"
              >
                {t('Envoyer une candidature', 'Send an application')}
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              <a
                href="#domaines"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-white/50 hover:bg-white/5"
              >
                {t('Découvrir les domaines', 'Explore our areas')}
                <ArrowDown size={17} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-yellow-400/20 to-blue-500/10 blur-2xl" />
            <div className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl backdrop-blur sm:p-9">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-[#07172b]">
                <BriefcaseBusiness size={27} aria-hidden="true" />
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-yellow-300">
                {t('Candidatures spontanées', 'Open applications')}
              </p>
              <h2 className="mt-3 font-headline text-2xl font-extrabold leading-snug">
                {t('Votre prochain projet peut commencer ici.', 'Your next project could start here.')}
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {t(
                  'Aucun poste précis ne vous correspond ? Présentez-nous votre profil et les sujets qui vous motivent.',
                  'Do not see a specific role that fits? Tell us about your profile and what motivates you.',
                )}
              </p>
              <div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5 text-sm text-slate-300">
                <Send size={16} className="text-yellow-300" aria-hidden="true" />
                {t('Votre CV est transmis à notre équipe.', 'Your CV is sent to our team.')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 lg:py-20" id="domaines">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-700">
                {t('Nos domaines', 'Our fields')}
              </p>
              <h2 className="mt-3 font-headline text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                {t('Là où votre talent peut faire la différence.', 'Where your talent can make a difference.')}
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-slate-600">
              {t(
                'Ces domaines représentent les profils que nous souhaitons rencontrer. Ils ne constituent pas une liste de postes actuellement ouverts.',
                'These areas reflect the profiles we are interested in meeting. They are not a list of currently open positions.',
              )}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {roles.map((role) => {
              const RoleIcon = role.icon;
              return (
                <article key={role.profile} className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-950/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0b1d33] text-yellow-400 transition group-hover:bg-yellow-400 group-hover:text-[#0b1d33]">
                    <RoleIcon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-headline text-lg font-extrabold text-slate-900">{role.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{role.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {role.skills.map((skill) => (
                      <span key={skill} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">{skill}</span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => openApplication(role.profile)}
                    className="mt-6 inline-flex items-center gap-2 self-start text-sm font-bold text-blue-800 transition hover:gap-3 hover:text-blue-600"
                  >
                    {t('Proposer mon profil', 'Share your profile')}
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </article>
              );
            })}
          </div>

          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <div>
              <h3 className="font-headline font-bold text-slate-900">{t('Un autre parcours ?', 'A different background?')}</h3>
              <p className="mt-1 text-sm text-slate-600">{t('Nous sommes aussi ouverts aux profils complémentaires.', 'We are also open to complementary profiles.')}</p>
            </div>
            <button
              type="button"
              onClick={() => openApplication('autre')}
              className="mt-4 inline-flex items-center gap-2 font-bold text-blue-800 sm:mt-0"
            >
              {t('Présenter mon profil', 'Introduce yourself')}
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#f2f5f8] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-700">
              {t('Notre approche', 'Our approach')}
            </p>
            <h2 className="mt-3 font-headline text-3xl font-extrabold tracking-tight text-slate-900">
              {t('Du concret, de la confiance, de l’impact.', 'Real work, trust and impact.')}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                number: '01',
                title: t('Des projets utiles', 'Useful projects'),
                text: t('Participez à des solutions pensées pour répondre à des besoins réels.', 'Contribute to solutions designed around real needs.'),
              },
              {
                number: '02',
                title: t('Une équipe engagée', 'A committed team'),
                text: t('Travaillez avec des personnes qui partagent leurs idées et leurs compétences.', 'Work with people who share ideas and expertise.'),
              },
              {
                number: '03',
                title: t('La progression', 'Room to grow'),
                text: t('Développez votre savoir-faire au fil des projets et des responsabilités.', 'Grow your skills through projects and responsibility.'),
              },
            ].map((item) => (
              <article key={item.number} className="rounded-2xl border border-slate-200/80 bg-white p-5">
                <span className="text-sm font-extrabold tracking-widest text-yellow-600">{item.number}</span>
                <h3 className="mt-4 font-headline font-extrabold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center rounded-[2rem] bg-[#0b1d33] px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-300">
            {t('La suite commence par vous', 'The next step starts with you')}
          </span>
          <h2 className="mt-4 max-w-3xl font-headline text-3xl font-extrabold sm:text-4xl">
            {t('Envie de contribuer aux projets numériques de demain ?', 'Ready to contribute to tomorrow’s digital projects?')}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            {t('Envoyez-nous votre candidature et dites-nous ce que vous aimeriez construire avec Enésense.', 'Send us your application and tell us what you would like to build with Enésense.')}
          </p>
          <button
            type="button"
            onClick={() => openApplication()}
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-3 font-bold text-[#07172b] transition hover:-translate-y-0.5 hover:bg-yellow-300"
          >
            {t('Postuler maintenant', 'Apply now')}
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </section>

      <CandidatureModal
        open={applicationOpen}
        initialProfile={selectedProfile}
        onClose={() => setApplicationOpen(false)}
      />
      <CandidatureFAB onApply={() => openApplication()} />
    </main>
  );
};

export default Careers;
