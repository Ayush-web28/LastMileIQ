import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useSimulation } from '../context/SimulationContext';
import { 
  Smartphone, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Star,
  ArrowRight
} from 'lucide-react';

export default function CommuterPreviewModal() {
  const { currentStation } = useSimulation();

  const [selectedFeeder, setSelectedFeeder] = useState('shared_ev');
  const [isBooked, setIsBooked] = useState(false);
  const [bookingPin, setBookingPin] = useState('4821');

  const stationName = currentStation?.name || 'Andheri Metro';
  const gateName = currentStation?.highDeficitGate?.gateName || 'Gate 1 (Railway Skywalk)';

  const handleBookRide = () => {
    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    setBookingPin(pin);
    setIsBooked(true);

    try {
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#10B981', '#06B6D4', '#F59E0B'],
      });
    } catch (e) {}
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 backdrop-blur-xl shadow-xl flex flex-col items-center">
      
      {/* Top Header */}
      <div className="w-full max-w-sm flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 font-bold uppercase">
            <Smartphone className="w-4 h-4" />
            <span>MUMBAI COMMUTER ONDC PREVIEW</span>
          </div>
          <h3 className="text-base font-bold text-white">
            {stationName.split(' (')[0]} Concourse
          </h3>
        </div>
        <div className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold">
          ONDC PROTOCOL
        </div>
      </div>

      {/* Realistic Mobile Device Frame */}
      <div className="relative w-full max-w-[340px] rounded-[36px] bg-slate-950 p-3 shadow-2xl border-4 border-slate-700/80 ring-1 ring-white/10">
        
        {/* Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full bg-slate-900 flex items-center justify-center gap-2 z-20">
          <div className="w-2 h-2 rounded-full bg-slate-950" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Mobile Screen */}
        <div className="rounded-[26px] bg-[#0A0E17] text-white p-3.5 pt-8 overflow-hidden flex flex-col justify-between min-h-[520px] border border-slate-800/80">
          
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>9:41 AM</span>
              <span className="text-emerald-400 font-bold">5G • Namma Yatri / Chalo</span>
            </div>

            {/* Station Exit Banner */}
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-left">
              <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-bold uppercase">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>Exiting {stationName.split(' (')[0]}</span>
              </div>
              <div className="text-xs font-bold text-white mt-0.5">
                Take {gateName}
              </div>
            </div>

            {/* Feeder Options */}
            {!isBooked ? (
              <div className="space-y-2 pt-1 text-left">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                  Available Feeder Rides
                </div>

                {/* Option 1: Shared EV Auto */}
                <div
                  onClick={() => setSelectedFeeder('shared_ev')}
                  className={`p-2.5 rounded-xl border transition cursor-pointer ${
                    selectedFeeder === 'shared_ev'
                      ? 'bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        <span>Shared EV Auto</span>
                        <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                          Pool
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">Mahindra Treo • 2 seats left</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black font-mono text-emerald-400">₹20</div>
                      <div className="text-[9px] text-slate-400">2 min wait</div>
                    </div>
                  </div>
                </div>

                {/* Option 2: BEST Feeder Bus */}
                <div
                  onClick={() => setSelectedFeeder('bus')}
                  className={`p-2.5 rounded-xl border transition cursor-pointer ${
                    selectedFeeder === 'bus'
                      ? 'bg-cyan-950/40 border-cyan-500 ring-1 ring-cyan-500/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">
                        BEST Feeder Bus (A-12)
                      </div>
                      <div className="text-[10px] text-slate-400">AC Electric Minibus</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black font-mono text-cyan-400">₹15</div>
                      <div className="text-[9px] text-slate-400">4 min wait</div>
                    </div>
                  </div>
                </div>

                {/* Option 3: Direct Auto */}
                <div
                  onClick={() => setSelectedFeeder('private')}
                  className={`p-2.5 rounded-xl border transition cursor-pointer ${
                    selectedFeeder === 'private'
                      ? 'bg-amber-950/40 border-amber-500 ring-1 ring-amber-500/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">
                        Direct Auto (Metered)
                      </div>
                      <div className="text-[10px] text-slate-400">Doorstep drop</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black font-mono text-white">₹40</div>
                      <div className="text-[9px] text-slate-400">1 min wait</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Booking Confirmed State */
              <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-left space-y-2.5">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Ride Confirmed on ONDC!</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 text-center">
                  <div className="text-[9px] font-mono text-slate-400 uppercase">Boarding OTP</div>
                  <div className="text-xl font-black font-mono text-emerald-400">
                    {bookingPin}
                  </div>
                </div>

                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Driver:</span>
                    <strong className="text-white">Sachin Shinde</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Vehicle:</span>
                    <strong className="text-cyan-400 font-mono">MH-02-ER-4192</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fare:</span>
                    <strong className="text-emerald-400 font-mono">₹20 (Pre-paid)</strong>
                  </div>
                </div>

                <button
                  onClick={() => setIsBooked(false)}
                  className="w-full py-1.5 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300"
                >
                  Book Another Ride
                </button>
              </div>
            )}
          </div>

          {!isBooked && (
            <div className="pt-3">
              <button
                onClick={handleBookRide}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs tracking-wide shadow-md transition active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 fill-slate-950" />
                <span>Reserve ONDC Seat (₹20)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="w-24 h-1 rounded-full bg-slate-700/80 mx-auto mt-2" />
        </div>

      </div>

    </div>
  );
}
