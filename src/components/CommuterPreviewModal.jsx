import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useSimulation } from '../context/SimulationContext';

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
        particleCount: 40,
        spread: 45,
        origin: { y: 0.6 },
        colors: ['#3DB87E', '#C4829E'],
      });
    } catch (e) {}
  };

  return (
    <div className="p-5 rounded-lg bg-[#0B1612] border border-[#1E3A2C] flex flex-col items-center">
      
      {/* Top Header */}
      <div className="w-full max-w-sm flex items-center justify-between pb-3 mb-4 border-b border-[#1E3A2C]">
        <div>
          <div className="text-xs font-mono text-[#3DB87E] font-bold uppercase">
            MUMBAI COMMUTER ONDC PREVIEW
          </div>
          <h3 className="text-base font-bold text-[#F3F7F4]">
            {stationName.split(' (')[0]} Concourse
          </h3>
        </div>
        <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#183327] text-[#3DB87E] border border-[#3DB87E]/30 font-bold">
          ONDC PROTOCOL
        </div>
      </div>

      {/* Mobile Device Frame */}
      <div className="relative w-full max-w-[340px] rounded-lg bg-[#0B1612] p-3 border border-[#1E3A2C]">
        
        {/* Notch Header */}
        <div className="w-full pb-2 mb-2 border-b border-[#1E3A2C] flex items-center justify-between text-[10px] font-mono text-[#6E8277]">
          <span>9:41 AM</span>
          <span className="text-[#3DB87E] font-bold">ONDC Feeder App</span>
        </div>

        {/* Mobile Screen */}
        <div className="rounded-md bg-[#11231B] text-[#F3F7F4] p-3.5 overflow-hidden flex flex-col justify-between min-h-[460px] border border-[#1E3A2C]">
          
          <div className="space-y-2.5">
            {/* Station Exit Banner */}
            <div className="p-2.5 rounded-md bg-[#0B1612] border border-[#1E3A2C] text-left">
              <div className="text-[10px] font-mono text-[#3DB87E] font-bold uppercase">
                Exiting {stationName.split(' (')[0]}
              </div>
              <div className="text-xs font-bold text-[#F3F7F4] mt-0.5">
                Take {gateName}
              </div>
            </div>

            {/* Feeder Options */}
            {!isBooked ? (
              <div className="space-y-2 pt-1 text-left">
                <div className="text-[10px] font-mono text-[#6E8277] uppercase font-bold">
                  Available Feeder Rides
                </div>

                {/* Option 1: Shared EV Auto */}
                <div
                  onClick={() => setSelectedFeeder('shared_ev')}
                  className={`p-2.5 rounded-md border transition cursor-pointer ${
                    selectedFeeder === 'shared_ev'
                      ? 'bg-[#183327] border-[#3DB87E]'
                      : 'bg-[#0B1612] border-[#1E3A2C]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#F3F7F4] flex items-center gap-1">
                        <span>Shared EV Auto</span>
                        <span className="text-[9px] px-1 rounded bg-[#183327] text-[#3DB87E] font-mono font-bold">
                          Pool
                        </span>
                      </div>
                      <div className="text-[10px] text-[#A0B0A6]">Mahindra Treo • 2 seats left</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold font-mono text-[#3DB87E]">₹20</div>
                      <div className="text-[9px] text-[#6E8277]">2 min wait</div>
                    </div>
                  </div>
                </div>

                {/* Option 2: BEST Feeder Bus */}
                <div
                  onClick={() => setSelectedFeeder('bus')}
                  className={`p-2.5 rounded-md border transition cursor-pointer ${
                    selectedFeeder === 'bus'
                      ? 'bg-[#183327] border-[#C4829E]'
                      : 'bg-[#0B1612] border-[#1E3A2C]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#F3F7F4]">
                        BEST Feeder Bus (A-12)
                      </div>
                      <div className="text-[10px] text-[#A0B0A6]">AC Electric Minibus</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold font-mono text-[#C4829E]">₹15</div>
                      <div className="text-[9px] text-[#6E8277]">4 min wait</div>
                    </div>
                  </div>
                </div>

                {/* Option 3: Direct Auto */}
                <div
                  onClick={() => setSelectedFeeder('private')}
                  className={`p-2.5 rounded-md border transition cursor-pointer ${
                    selectedFeeder === 'private'
                      ? 'bg-[#183327] border-[#3DB87E]'
                      : 'bg-[#0B1612] border-[#1E3A2C]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#F3F7F4]">
                        Direct Auto (Metered)
                      </div>
                      <div className="text-[10px] text-[#A0B0A6]">Doorstep drop</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold font-mono text-[#F3F7F4]">₹40</div>
                      <div className="text-[9px] text-[#6E8277]">1 min wait</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Booking Confirmed State */
              <div className="p-3.5 rounded-md bg-[#183327] border border-[#3DB87E]/50 text-left space-y-2.5">
                <div className="text-[#3DB87E] font-bold text-xs">
                  Ride Confirmed on ONDC
                </div>

                <div className="p-2.5 rounded-md bg-[#0B1612] text-center border border-[#1E3A2C]">
                  <div className="text-[9px] font-mono text-[#6E8277] uppercase">Boarding OTP</div>
                  <div className="text-xl font-bold font-mono text-[#3DB87E]">
                    {bookingPin}
                  </div>
                </div>

                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#6E8277]">Driver:</span>
                    <strong className="text-[#F3F7F4]">Sachin Shinde</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6E8277]">Vehicle:</span>
                    <strong className="text-[#3DB87E] font-mono">MH-02-ER-4192</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6E8277]">Fare:</span>
                    <strong className="text-[#3DB87E] font-mono">₹20 (Pre-paid)</strong>
                  </div>
                </div>

                <button
                  onClick={() => setIsBooked(false)}
                  className="w-full py-1.5 rounded-md bg-[#0B1612] text-xs font-bold text-[#A0B0A6] border border-[#1E3A2C] hover:text-[#F3F7F4]"
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
                className="w-full py-2.5 rounded-md bg-[#3DB87E] hover:bg-[#34A074] text-[#0B1612] font-bold text-xs tracking-wide transition flex items-center justify-center"
              >
                Reserve ONDC Seat (₹20)
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
