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
        <div className="min-h-screen bg-[#0B1612] text-[#F3F7F4] flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full p-6 rounded-lg bg-[#11231B] border border-[#1E3A2C] space-y-4">
            <div className="w-10 h-10 rounded-md bg-[#F43F5E]/20 border border-[#F43F5E]/40 text-[#F43F5E] flex items-center justify-center mx-auto text-xs font-mono font-bold">
              ERR
            </div>
            
            <div>
              <h2 className="text-lg font-bold text-[#F3F7F4]">Interface Recovery</h2>
              <p className="text-xs text-[#A0B0A6] mt-1">
                A rendering anomaly was caught:
              </p>
              <div className="p-3 rounded-md bg-[#0B1612] font-mono text-[11px] text-[#F43F5E] mt-2 text-left overflow-x-auto border border-[#1E3A2C]">
                {this.state.error?.message || 'Unknown component error'}
              </div>
            </div>

            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="w-full inline-flex items-center justify-center py-2.5 rounded-md bg-[#3DB87E] hover:bg-[#34A074] text-[#0B1612] font-bold text-xs transition"
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
