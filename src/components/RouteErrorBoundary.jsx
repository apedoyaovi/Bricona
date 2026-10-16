import { Component } from 'react';

class RouteErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('Page rendering failed:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="font-headline text-2xl font-bold text-primary">
            Cette page n’a pas pu être chargée.
          </h1>
          <p className="max-w-lg text-on-surface-variant">
            Vérifiez votre connexion puis rechargez la page. Si le problème persiste, contactez-nous.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-xl bg-primary px-6 py-3 font-bold text-white hover:bg-primary-container"
          >
            Recharger la page
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}

export default RouteErrorBoundary;
