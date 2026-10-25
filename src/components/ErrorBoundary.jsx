import React from 'react';

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
        <div className="min-h-screen bg-[#0E1015] text-[#F4F5F7] flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full p-6 rounded-md bg-[#151820] border border-[#2A2F3D] space-y-4">
            <div className="w-10 h-10 rounded-md bg-[#DC2626]/20 border border-[#DC2626]/40 text-[#DC2626] flex items-center justify-center mx-auto text-xs font-mono font-bold">
              ERR
            </div>
            
            <div>
              <h2 className="text-lg font-bold text-[#F4F5F7]">Interface Recovery</h2>
              <p className="text-xs text-[#949AA8] mt-1">
                A rendering anomaly was caught:
              </p>
              <div className="p-3 rounded-md bg-[#0E1015] font-mono text-[11px] text-[#DC2626] mt-2 text-left overflow-x-auto border border-[#2A2F3D]">
                {this.state.error?.message || 'Unknown component error'}
              </div>
            </div>

            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="w-full inline-flex items-center justify-center py-2.5 rounded-md bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs transition"
            >
              Reload Command Center
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
