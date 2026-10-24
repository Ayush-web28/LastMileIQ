import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('LastMileIQ Uncaught Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080C14] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full p-6 rounded-2xl bg-slate-900 border border-rose-500/50 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <div>
              <h2 className="text-lg font-black text-white">Interface Recovery</h2>
              <p className="text-xs text-slate-400 mt-1">
                A rendering anomaly was caught:
              </p>
              <div className="p-3 rounded-lg bg-slate-950 font-mono text-[11px] text-rose-300 mt-2 text-left overflow-x-auto">
                {this.state.error?.message || 'Unknown component error'}
              </div>
            </div>

            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reload Command Center</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
