import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import { addCandidature } from '../utils/siteContent';

const CandidatureModal = ({ open, onClose, initialProfile = '' }) => {
  const { t } = useLanguage();
  const fileInputRef = useRef(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profile, setProfile] = useState(initialProfile);
  const [customProfile, setCustomProfile] = useState('');
  const [cvFile, setCvFile] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [notificationWarning, setNotificationWarning] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (open) {
      setProfile(initialProfile);
      return;
    }

    setFullName('');
    setEmail('');
    setPhone('');
    setProfile(initialProfile);
    setCustomProfile('');
    setCvFile(null);
    setSuccess(false);
    setNotificationWarning('');
    setErrorMessage('');
  }, [initialProfile, open]);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  const MAX_SIZE = 10 * 1024 * 1024;
  const ALLOWED_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
  ];

  const handleFileChange = (file) => {
    if (!file) return;
    if (file.size > MAX_SIZE) {
      setErrorMessage(t('Le fichier est trop volumineux (max 10 Mo).', 'File is too large (max 10 MB).'));
      return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrorMessage(t('Format de fichier non accepte (PDF, DOC, JPG, PNG).', 'File format not accepted (PDF, DOC, JPG, PNG).'));
      return;
    }
    setCvFile(file);
    setErrorMessage('');
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFileChange(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage(t('Veuillez remplir tous les champs obligatoires.', 'Please fill in all required fields.'));
      return;
    }
    if (!cvFile) {
      setErrorMessage(t('Veuillez televerser votre CV (PV).', 'Please upload your CV.'));
      return;
    }

    setIsSending(true);
    setErrorMessage('');

    try {
      const result = await addCandidature({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        profile: profile === 'autre' ? customProfile.trim() : profile,
        cv: cvFile,
      });
      setNotificationWarning(result?.notificationError || '');
      setSuccess(true);
    } catch (error) {
      const reason = error instanceof Error ? error.message : t('Erreur inconnue', 'Unknown error');
      setErrorMessage(`${t("Impossible d'envoyer votre candidature :", 'Unable to send your application:')} ${reason}`);
    } finally {
      setIsSending(false);
    }
  };

  const profileOptions = [
    { value: 'developpeur-fullstack', label: t('Développeur Full Stack', 'Full Stack Developer') },
    { value: 'developpeur-frontend', label: t('Développeur Frontend', 'Frontend Developer') },
    { value: 'developpeur-backend', label: t('Développeur Backend', 'Backend Developer') },
    { value: 'devops', label: 'DevOps' },
    { value: 'chef-projet', label: t('Chef de Projet', 'Project Manager') },
    { value: 'ui-ux', label: 'UI/UX Designer' },
    { value: 'commercial', label: t('Commercial', 'Sales') },
    { value: 'support', label: t('Support Technique', 'Technical Support') },
    { value: 'autre', label: t('Autre', 'Other') },
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <button
        type="button"
        className="absolute inset-0 bg-on-surface/50 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
        aria-label={t('Fermer', 'Close')}
      />
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[2rem] bg-white border border-outline-variant/20 shadow-[0_40px_120px_rgba(0,25,70,0.35)] animate-fade-up">
        <div className="sticky top-0 bg-white rounded-t-[2rem] px-6 py-5 flex items-center justify-between border-b border-outline-variant/10">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">description</span>
            </div>
            <div>
              <h2 className="font-headline text-lg font-extrabold text-on-surface leading-tight">
                {t('Postuler chez Enésense', 'Apply to Enésense')}
              </h2>
              <p className="text-[11px] text-on-surface-variant font-medium">
                {t('Déposez votre candidature en quelques clics', 'Submit your application in a few clicks')}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors"
            aria-label={t('Fermer', 'Close')}
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="px-6 py-6">
          {success ? (
            <div className="text-center py-8">
              <div className="mx-auto h-20 w-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <span className="material-symbols-outlined text-4xl">check</span>
              </div>
              <h3 className="font-headline text-xl font-extrabold text-on-surface mb-2">
                {t('Candidature envoyee !', 'Application sent!')}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                {t('Votre candidature a bien ete recue. Notre equipe l examine sous 48h ouvrées.', 'Your application has been received. Our team will review it within 48 business hours.')}
              </p>
              {notificationWarning && (
                <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm font-medium text-amber-800" role="status">
                  {t(
                    "La candidature est enregistree, mais la notification push n'a pas pu etre envoyee. Contactez l'administrateur du site.",
                    'The application was saved, but its push notification could not be sent. Please contact the site administrator.'
                  )}
                </p>
              )}
              <button
                type="button"
                onClick={onClose}
                className="bg-primary text-white font-headline font-bold px-8 py-3 rounded-xl hover:brightness-110 transition-all"
              >
                {t('Fermer', 'Close')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant" htmlFor="candidature-fullname">
                  {t('Nom complet', 'Full name')} <span className="text-primary">*</span>
                </label>
                <input
                  id="candidature-fullname"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl bg-surface-container-lowest px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/10 border border-outline-variant/20"
                  placeholder={t('Jean-Baptiste Segbe', 'Your full name')}
                  type="text"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant" htmlFor="candidature-email">
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    id="candidature-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl bg-surface-container-lowest px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/10 border border-outline-variant/20"
                    placeholder="nom@exemple.com"
                    type="email"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant" htmlFor="candidature-phone">
                    {t('Telephone', 'Phone')} <span className="text-primary">*</span>
                  </label>
                  <input
                    id="candidature-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl bg-surface-container-lowest px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/10 border border-outline-variant/20"
                    placeholder="+33 6 00 00 00 00"
                    type="tel"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant" htmlFor="candidature-profile">
                  {t('Profil / Poste recherche', 'Profile / Position sought')} <span className="text-primary">*</span>
                </label>
                <select
                  id="candidature-profile"
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                  className="w-full rounded-xl bg-surface-container-lowest px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/10 border border-outline-variant/20 appearance-none cursor-pointer"
                  required
                >
                  <option value="">{t('Selectionnez un profil', 'Select a profile')}</option>
                  {profileOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {profile === 'autre' && (
                  <input
                    id="candidature-custom-profile"
                    value={customProfile}
                    onChange={(e) => setCustomProfile(e.target.value)}
                    className="mt-2 w-full rounded-xl bg-surface-container-lowest px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-primary/10 border border-outline-variant/20"
                    placeholder={t('Precisez le poste', 'Specify the position')}
                    type="text"
                    required
                  />
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  {t('CV (PV)', 'CV (Resume')} <span className="text-primary">*</span>
                </label>
                <div
                  className={`relative rounded-xl border-2 border-dashed transition-all p-6 text-center cursor-pointer ${dragActive ? 'border-primary bg-primary-fixed/30' : 'border-outline-variant/40 bg-surface-container-lowest hover:border-primary/50'}`}
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e.target.files?.[0])}
                    className="hidden"
                  />
                  {cvFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <span className="material-symbols-outlined text-2xl text-emerald-600">attach_file</span>
                      <div className="text-left">
                        <p className="text-sm font-bold text-on-surface truncate max-w-[200px]">{cvFile.name}</p>
                        <p className="text-[11px] text-on-surface-variant">{(cvFile.size / 1024 / 1024).toFixed(2)} Mo</p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setCvFile(null); }}
                        className="ml-auto text-on-surface-variant hover:text-red-500"
                      >
                        <span className="material-symbols-outlined text-xl">close</span>
                      </button>
                    </div>
                  ) : (
                    <div>
                      <span className="material-symbols-outlined text-3xl text-primary mb-2">upload</span>
                      <p className="text-sm font-medium text-on-surface">
                        {t('Glissez-déposez votre CV ici ou', 'Drag and drop your CV here or')}
                      </p>
                      <p className="text-xs text-on-surface-variant mt-1">
                        {t('Cliquez pour parcourir', 'Click to browse')} · PDF, DOC, JPG, PNG · {t('max 10 Mo', 'max 10 MB')}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {errorMessage && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 border border-red-100">
                  {errorMessage}
                </p>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02]"
                  style={{ background: '#F2B705', color: '#0B1D33', boxShadow: '0 8px 24px rgba(242,183,5,0.3)' }}
                >
                  {isSending ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-base">progress</span>
                      {t('Envoi en cours...', 'Sending...')}
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-base">send</span>
                      {t('Envoyer ma candidature', 'Send my application')}
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-on-surface-variant mt-3">
                  {t('En envoyant, vous acceptez notre politique de confidentialite. Vos donnees sont traites avec soin.', 'By submitting, you agree to our privacy policy. Your data is handled with care.')}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidatureModal;
