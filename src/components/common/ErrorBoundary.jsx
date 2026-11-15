import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Erro de renderização no RadarSocial:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2.5 text-amber-700">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h1 className="text-base font-bold text-slate-900">
                Não foi possível exibir o painel
              </h1>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ocorreu uma falha inesperada ao carregar esta visualização. Você pode recarregar a página ou restaurar os dados iniciais da sessão.
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-3.5 py-2 bg-[#2D5A27] hover:bg-[#1E3F20] text-white text-xs font-semibold rounded-lg transition cursor-pointer"
              >
                Recarregar painel
              </button>
              <button
                type="button"
                onClick={() => {
                  try {
                    localStorage.clear();
                  } catch {
                    // Ignora falha de acesso ao storage
                  }
                  window.location.reload();
                }}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 flex items-center gap-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar sessão</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
