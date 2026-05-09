const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  variant = 'primary',
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  const isDanger = variant === 'danger';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <button
        type="button"
        className="absolute inset-0 bg-on-surface/45 backdrop-blur-sm cursor-pointer"
        onClick={onCancel}
        aria-label="Fermer la confirmation"
      />
      <div className="relative w-full max-w-md rounded-[2rem] bg-white border border-outline-variant/20 p-6 shadow-[0_30px_90px_rgba(0,25,70,0.28)] animate-fade-up">
        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-5 ${isDanger ? 'bg-red-50 text-red-600' : 'bg-primary-fixed text-primary'}`}>
          <span className="material-symbols-outlined text-2xl">
            {isDanger ? 'warning' : 'task_alt'}
          </span>
        </div>
        <h2 className="font-headline text-xl font-extrabold text-on-surface mb-2">
          {title}
        </h2>
        <p className="text-sm leading-relaxed text-on-surface-variant mb-6">
          {message}
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-outline-variant/30 bg-white px-5 py-3 text-sm font-bold text-primary hover:bg-surface-container-low transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-xl px-5 py-3 text-sm font-bold text-white transition-colors ${isDanger ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-primary-container'}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
