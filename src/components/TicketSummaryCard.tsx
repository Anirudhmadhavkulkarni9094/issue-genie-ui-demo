import React, { useEffect, useState } from "react";

interface TicketSummaryCardProps {
  ticket_id?: number;
  title: string;
  description: string;
  date?: string; // optional, defaults to current date or a fixed date
}

function TicketSummaryCard({
  ticket_id,
  title,
  description,
  date = "May 2, 2025",
}: TicketSummaryCardProps) {
  const [showMentor, setShowMentor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMentor((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Ticket Summary */}
      <div className="bg-white p-4 rounded shadow-md border-l-4 border-[#2C66BA]">
        <p className="text-sm text-gray-500">{date}</p>
        {ticket_id && (
          <p className="text-xs text-gray-400 mb-1">Ticket ID: {ticket_id}</p>
        )}
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-700 mt-1">{description}</p>

        <button className="mt-3 w-fit px-4 py-1 cursor-pointer bg-[#2C66BA] text-white rounded text-sm flex items-center justify-center gap-1">
          <span>Ask your&nbsp;</span>

          <span className="relative w-10 text-yellow-400 h-5 inline-block perspective">
            <span className={`flip-word ${showMentor ? "flipped" : ""}`}>
              <span className="flip-front text-yellow-400 absolute inset-0 flex items-center justify-center">
                mentor
              </span>
              <span className="flip-back text-yellow-400 absolute inset-0 flex items-center justify-center">
                Genie
              </span>
            </span>
          </span>

          <span>&nbsp;→</span>

          <style jsx>{`
            .perspective {
              perspective: 400px;
              display: inline-block;
              position: relative;
              height: 20px;
              color: yellow;
            }
            .flip-word {
              display: inline-block;
              width: 100%;
              height: 100%;
              transition: transform 0.6s;
              color: yellow;
              transform-style: preserve-3d;
              position: relative;
            }
            .flipped {
              transform: rotateX(180deg);
              color: yellow;
            }
            .flip-front,
            .flip-back {
              color: #fd8817;

              backface-visibility: hidden;
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              font-weight: 600;
              user-select: none;
            }
            .flip-back {
              transform: rotateX(180deg);
            }
          `}</style>
        </button>
      </div>
    </div>
  );
}

export default TicketSummaryCard;
