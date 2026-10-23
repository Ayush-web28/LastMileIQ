import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useSimulation } from '../context/SimulationContext';
import { 
  Smartphone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Users, 
  ArrowRight, 
  ChevronRight, 
  Star,
  Navigation,
  Sparkles,
  QrCode
} from 'lucide-react';

export default function CommuterPreviewModal({ onClose }) {
  const { currentStation } = useSimulation();

  const [selectedFeeder, setSelectedFeeder] = useState('shared_ev'); // 'shared_ev' | 'bus' | 'private'
  const [isBooked, setIsBooked] = useState(false);
  const [bookingPin, setBookingPin] = useState('7842');

  const stationName = currentStation?.name || 'Hoodi';
  const gateName = currentStation?.highDeficitGate?.gateName || 'Gate 2 (EPIP Zone Feeder)';

  const handleBookRide = () => {
    // Generate random 4-digit PIN
    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    setBookingPin(pin);
    setIsBooked(true);

    // Trigger confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#10B981', '#06B6D4', '#F59E0B'],
      });
    } catch (e) {}
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-500/30 backdrop-blur-xl shadow-2xl flex flex-col items-center">
      
      {/* Top Header */}
      <div className="w-full max-w-md flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 font-bold uppercase">
            <Smartphone className="w-4 h-4" />
            <span>B2C ONDC COMMUTER EXPERIENCE</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            Live Station Concourse Preview
          </h3>
        </div>
        <div className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
          ONDC PROTOCOL
        </div>
      </div>

      {/* Realistic Mobile Device Frame */}
      <div className="relative w-full max-w-[360px] rounded-[40px] bg-slate-950 p-3.5 shadow-2xl border-4 border-slate-700/80 ring-1 ring-white/10">
        
        {/* Dynamic Island / Speaker Notch */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full bg-slate-900 flex items-center justify-center gap-2 z-20">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-950" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
        </div>

        {/* Mobile Screen Container */}
        <div className="rounded-[30px] bg-[#0A0E17] text-white p-4 pt-10 overflow-hidden flex flex-col justify-between min-h-[580px] border border-slate-800/80">
          
          {/* Top Status & Station Exit Banner */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>9:41 AM</span>
              <span className="text-emerald-400 font-bold">5G • Namma Yatri ONDC</span>
            </div>

            {/* Station Arrival Guide */}
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-left space-y-1">
              <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-bold uppercase">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>Exiting {stationName} Metro</span>
              </div>
              <div className="text-xs font-bold text-white">
                Follow Signs to {gateName}
              </div>
              <p className="text-[10px] text-slate-400 leading-snug">
                Sheltered feeder stand located 90 meters from concourse exit. Vetted EV rides ready.
              </p>
            </div>

            {/* Safety Rating Badge */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/50 border border-slate-800 text-[10px] font-mono text-slate-300">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> Safe Transit Corridor
              </span>
              <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                <Star className="w-3 h-3 fill-amber-400" /> 4.9 Rating
              </span>
            </div>

            {/* Feeder Options List */}
            {!isBooked ? (
              <div className="space-y-2 pt-1 text-left">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
                  Available Station Feeder Rides
                </div>

                {/* Option 1: Shared EV Auto */}
                <div
                  onClick={() => setSelectedFeeder('shared_ev')}
                  className={`p-3 rounded-xl border transition cursor-pointer ${
                    selectedFeeder === 'shared_ev'
                      ? 'bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                        ⚡
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1">
                          <span>Shared EV Rickshaw</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                            Pool
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400">Mahindra Treo • 2 seats left</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black font-mono text-emerald-400">₹25</div>
                      <div className="text-[9px] font-mono text-slate-400">3 min wait</div>
                    </div>
                  </div>
                </div>

                {/* Option 2: BMTC Minibus */}
                <div
                  onClick={() => setSelectedFeeder('bus')}
                  className={`p-3 rounded-xl border transition cursor-pointer ${
                    selectedFeeder === 'bus'
                      ? 'bg-cyan-950/40 border-cyan-500 shadow-md ring-1 ring-cyan-500/30'
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                        🚌
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">
                          Metro Feeder Bus (MF-12)
                        </div>
                        <div className="text-[10px] text-slate-400">AC Minibus • ITPL Direct</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black font-mono text-cyan-400">₹20</div>
                      <div className="text-[9px] font-mono text-slate-400">5 min wait</div>
                    </div>
                  </div>
                </div>

                {/* Option 3: Direct EV Auto */}
                <div
                  onClick={() => setSelectedFeeder('private')}
                  className={`p-3 rounded-xl border transition cursor-pointer ${
                    selectedFeeder === 'private'
                      ? 'bg-amber-950/40 border-amber-500 shadow-md ring-1 ring-amber-500/30'
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                        🚖
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">
                          Direct EV Auto (Private)
                        </div>
                        <div className="text-[10px] text-slate-400">Doorstep drop • 0 detour</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black font-mono text-white">₹50</div>
                      <div className="text-[9px] font-mono text-slate-400">1 min wait</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Booking Confirmed State */
              <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 text-left space-y-3 animate-fade-in">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Ride Confirmed on ONDC!</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Boarding OTP</div>
                  <div className="text-2xl font-black font-mono tracking-widest text-emerald-400">
                    {bookingPin}
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">Share with driver upon entry</div>
                </div>

                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Driver:</span>
                    <strong className="text-white">Ramesh Gowda</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Vehicle:</span>
                    <strong className="text-cyan-400 font-mono">KA-03-ER-4821</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pick-up:</span>
                    <strong className="text-white">Stand A, Gate 2</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fixed Fare:</span>
                    <strong className="text-emerald-400 font-mono">₹25 (Pre-paid)</strong>
                  </div>
                </div>

                <button
                  onClick={() => setIsBooked(false)}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-300"
                >
                  Book Another Ride
                </button>
              </div>
            )}
          </div>

          {/* Action CTA Button */}
          {!isBooked && (
            <div className="pt-4">
              <button
                onClick={handleBookRide}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 text-slate-950 font-black text-xs tracking-wide shadow-lg shadow-emerald-500/25 transition active:scale-95 flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Reserve ONDC Seat (₹25)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="text-[9px] font-mono text-slate-500 text-center mt-2">
                Protected by Open Network for Digital Commerce
              </div>
            </div>
          )}

          {/* iPhone Home Bar */}
          <div className="w-28 h-1 rounded-full bg-slate-700/80 mx-auto mt-3" />
        </div>

      </div>

    </div>
  );
}
