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
        colors: ['#DC2626', '#2563EB'],
      });
    } catch (e) {}
  };

  return (
    <div className="p-5 rounded-md bg-[#F4F5F7] border border-[#CED2DA] flex flex-col items-center">
      
      {/* Top Header */}
      <div className="w-full max-w-sm flex items-center justify-between pb-3 mb-4 border-b border-[#CED2DA]">
        <div>
          <div className="text-xs font-mono text-[#2563EB] font-bold uppercase">
            MUMBAI COMMUTER ONDC PREVIEW
          </div>
          <h3 className="text-base font-bold text-[#0E1015]">
            {stationName.split(' (')[0]} Concourse
          </h3>
        </div>
        <div className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#DFE2E7] text-[#475060] border border-[#CED2DA] font-bold">
          ONDC PROTOCOL
        </div>
      </div>

      {/* Mobile Device Frame */}
      <div className="relative w-full max-w-[340px] rounded-md bg-[#DFE2E7] p-3 border border-[#CED2DA]">
        
        {/* Notch Header */}
        <div className="w-full pb-2 mb-2 border-b border-[#CED2DA] flex items-center justify-between text-[10px] font-mono text-[#6B7280]">
          <span>9:41 AM</span>
          <span className="text-[#2563EB] font-bold">ONDC Feeder App</span>
        </div>

        {/* Mobile Screen */}
        <div className="rounded-md bg-[#F4F5F7] text-[#0E1015] p-3.5 overflow-hidden flex flex-col justify-between min-h-[460px] border border-[#CED2DA]">
          
          <div className="space-y-2.5">
            {/* Station Exit Banner */}
            <div className="p-2.5 rounded-md bg-[#EBECEF] border border-[#CED2DA] text-left">
              <div className="text-[10px] font-mono text-[#2563EB] font-bold uppercase">
                Exiting {stationName.split(' (')[0]}
              </div>
              <div className="text-xs font-bold text-[#0E1015] mt-0.5">
                Take {gateName}
              </div>
            </div>

            {/* Feeder Options */}
            {!isBooked ? (
              <div className="space-y-2 pt-1 text-left">
                <div className="text-[10px] font-mono text-[#6B7280] uppercase font-bold">
                  Available Feeder Rides
                </div>

                {/* Option 1: Shared EV Auto */}
                <div
                  onClick={() => setSelectedFeeder('shared_ev')}
                  className={`p-2.5 rounded-md border transition cursor-pointer ${
                    selectedFeeder === 'shared_ev'
                      ? 'bg-[#EBECEF] border-[#059669]'
                      : 'bg-[#F4F5F7] border-[#CED2DA] hover:bg-[#EBECEF]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#0E1015] flex items-center gap-1">
                        <span>Shared EV Auto</span>
                        <span className="text-[9px] px-1 rounded bg-[#059669]/10 text-[#059669] font-mono font-bold">
                          Pool
                        </span>
                      </div>
                      <div className="text-[10px] text-[#475060]">Mahindra Treo • 2 seats left</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold font-mono text-[#059669]">₹20</div>
                      <div className="text-[9px] text-[#6B7280]">2 min wait</div>
                    </div>
                  </div>
                </div>

                {/* Option 2: BEST Feeder Bus */}
                <div
                  onClick={() => setSelectedFeeder('bus')}
                  className={`p-2.5 rounded-md border transition cursor-pointer ${
                    selectedFeeder === 'bus'
                      ? 'bg-[#EBECEF] border-[#2563EB]'
                      : 'bg-[#F4F5F7] border-[#CED2DA] hover:bg-[#EBECEF]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#0E1015]">
                        BEST Feeder Bus (A-12)
                      </div>
                      <div className="text-[10px] text-[#475060]">AC Electric Minibus</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold font-mono text-[#2563EB]">₹15</div>
                      <div className="text-[9px] text-[#6B7280]">4 min wait</div>
                    </div>
                  </div>
                </div>

                {/* Option 3: Direct Auto */}
                <div
                  onClick={() => setSelectedFeeder('private')}
                  className={`p-2.5 rounded-md border transition cursor-pointer ${
                    selectedFeeder === 'private'
                      ? 'bg-[#EBECEF] border-[#D97706]'
                      : 'bg-[#F4F5F7] border-[#CED2DA] hover:bg-[#EBECEF]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#0E1015]">
                        Direct Auto (Metered)
                      </div>
                      <div className="text-[10px] text-[#475060]">Doorstep drop</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold font-mono text-[#0E1015]">₹40</div>
                      <div className="text-[9px] text-[#6B7280]">1 min wait</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Booking Confirmed State */
              <div className="p-3.5 rounded-md bg-[#EBECEF] border border-[#059669]/50 text-left space-y-2.5">
                <div className="text-[#059669] font-bold text-xs">
                  Ride Confirmed on ONDC
                </div>

                <div className="p-2.5 rounded-md bg-[#F4F5F7] text-center border border-[#CED2DA]">
                  <div className="text-[9px] font-mono text-[#6B7280] uppercase">Boarding OTP</div>
                  <div className="text-xl font-bold font-mono text-[#059669]">
                    {bookingPin}
                  </div>
                </div>

                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Driver:</span>
                    <strong className="text-[#0E1015]">Sachin Shinde</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Vehicle:</span>
                    <strong className="text-[#0E1015] font-mono">MH-02-ER-4192</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Fare:</span>
                    <strong className="text-[#059669] font-mono">₹20 (Pre-paid)</strong>
                  </div>
                </div>

                <button
                  onClick={() => setIsBooked(false)}
                  className="w-full py-1.5 rounded-md bg-[#F4F5F7] text-xs font-bold text-[#475060] border border-[#CED2DA] hover:text-[#0E1015] cursor-pointer"
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
                className="w-full py-2.5 rounded-md bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs tracking-wide transition flex items-center justify-center cursor-pointer"
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
