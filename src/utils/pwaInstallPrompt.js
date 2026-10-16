let installPromptEvent = null;
const listeners = new Set();

const notifyListeners = () => {
  listeners.forEach((listener) => listener(installPromptEvent));
};

export const capturePwaInstallPrompt = () => {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPromptEvent = event;
    notifyListeners();
  });

  window.addEventListener('appinstalled', () => {
    installPromptEvent = null;
    notifyListeners();
  });
};

export const subscribeToPwaInstallPrompt = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const getPwaInstallPrompt = () => installPromptEvent;

export const takePwaInstallPrompt = () => {
  const prompt = installPromptEvent;
  installPromptEvent = null;
  notifyListeners();
  return prompt;
};
