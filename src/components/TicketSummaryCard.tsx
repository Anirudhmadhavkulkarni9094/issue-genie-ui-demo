import React from "react";

interface TicketSummaryCardProps {
  ticket_id?: number;
  title: string;
  description: string;
  date?: string; // optional, defaults to current date or a fixed date
  history? : boolean;
}

function TicketSummaryCard({
  ticket_id,
  title,
  description,
  date = "May 2, 2025",
  history = false, // default to false if not provided
}: TicketSummaryCardProps) {
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
        {!history && <button className="mt-3 px-4 py-1 bg-[#2C66BA] text-white rounded text-sm ">
          Connect with mentor →
        </button>}
      </div>
    </div>
  );
}

export default TicketSummaryCard;
