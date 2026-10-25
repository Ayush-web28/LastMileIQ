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
    <div className="p-5 rounded-2xl bg-[#0B1612]/95 border border-[#3DB87E]/30 backdrop-blur-xl shadow-xl flex flex-col items-center">
      
      {/* Top Header */}
      <div className="w-full max-w-sm flex items-center justify-between pb-3 mb-4 border-b border-[#1E3A2C]">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#3DB87E] font-bold uppercase">
            <Smartphone className="w-4 h-4" />
            <span>MUMBAI COMMUTER ONDC PREVIEW</span>
          </div>
          <h3 className="text-base font-bold text-white">
            {stationName.split(' (')[0]} Concourse
          </h3>
        </div>
        <div className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#3DB87E]/10 text-[#3DB87E] border border-[#3DB87E]/30 font-bold">
          ONDC PROTOCOL
        </div>
      </div>

      {/* Realistic Mobile Device Frame */}
      <div className="relative w-full max-w-[340px] rounded-[36px] bg-[#0B1612] p-3 shadow-2xl border-4 border-[#1E3A2C] ring-1 ring-white/10">
        
        {/* Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full bg-[#11231B] flex items-center justify-center gap-2 z-20">
          <div className="w-2 h-2 rounded-full bg-[#0B1612]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#3DB87E] animate-pulse" />
        </div>

        {/* Mobile Screen */}
        <div className="rounded-[26px] bg-[#0B1612] text-white p-3.5 pt-8 overflow-hidden flex flex-col justify-between min-h-[520px] border border-[#1E3A2C]">
          
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>9:41 AM</span>
              <span className="text-[#3DB87E] font-bold">5G • Namma Yatri / Chalo</span>
            </div>

            {/* Station Exit Banner */}
            <div className="p-2.5 rounded-xl bg-[#11231B] border border-[#1E3A2C] text-left">
              <div className="flex items-center gap-1 text-[10px] font-mono text-[#3DB87E] font-bold uppercase">
                <MapPin className="w-3 h-3 text-[#3DB87E]" />
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
                      ? 'bg-[#3DB87E]/15 border-[#3DB87E] ring-1 ring-[#3DB87E]/30'
                      : 'bg-[#11231B] border-[#1E3A2C] hover:border-[#2C523F]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        <span>Shared EV Auto</span>
                        <span className="text-[9px] px-1 rounded bg-[#3DB87E]/20 text-[#3DB87E] font-mono font-bold">
                          Pool
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400">Mahindra Treo • 2 seats left</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black font-mono text-[#3DB87E]">₹20</div>
                      <div className="text-[9px] text-slate-400">2 min wait</div>
                    </div>
                  </div>
                </div>

                {/* Option 2: BEST Feeder Bus */}
                <div
                  onClick={() => setSelectedFeeder('bus')}
                  className={`p-2.5 rounded-xl border transition cursor-pointer ${
                    selectedFeeder === 'bus'
                      ? 'bg-[#C4829E]/20 border-[#C4829E] ring-1 ring-[#C4829E]/30'
                      : 'bg-[#11231B]/60 border-[#1E3A2C] hover:border-[#2C523F]'
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
                      <div className="text-sm font-black font-mono text-[#C4829E]">₹15</div>
                      <div className="text-[9px] text-slate-400">4 min wait</div>
                    </div>
                  </div>
                </div>

                {/* Option 3: Direct Auto */}
                <div
                  onClick={() => setSelectedFeeder('private')}
                  className={`p-2.5 rounded-xl border transition cursor-pointer ${
                    selectedFeeder === 'private'
                      ? 'bg-[#183327] border-[#3DB87E] ring-1 ring-[#3DB87E]/30'
                      : 'bg-[#11231B]/60 border-[#1E3A2C] hover:border-[#2C523F]'
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
              <div className="p-3.5 rounded-xl bg-[#3DB87E]/15 border border-[#3DB87E]/50 text-left space-y-2.5">
                <div className="flex items-center gap-1.5 text-[#3DB87E] font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Ride Confirmed on ONDC!</span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#0B1612] text-center border border-[#1E3A2C]">
                  <div className="text-[9px] font-mono text-slate-400 uppercase">Boarding OTP</div>
                  <div className="text-xl font-black font-mono text-[#3DB87E]">
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
                    <strong className="text-[#3DB87E] font-mono">MH-02-ER-4192</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fare:</span>
                    <strong className="text-[#3DB87E] font-mono">₹20 (Pre-paid)</strong>
                  </div>
                </div>

                <button
                  onClick={() => setIsBooked(false)}
                  className="w-full py-1.5 rounded-lg bg-[#183327] text-xs font-semibold text-slate-200 border border-[#1E3A2C] hover:bg-[#1E3A2C]"
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
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#3DB87E] to-[#34A074] hover:from-[#4EBA86] hover:to-[#3DB87E] text-[#0B1612] font-black text-xs tracking-wide shadow-md shadow-[#3DB87E]/20 transition active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 fill-[#0B1612]" />
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
