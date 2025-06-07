import React from 'react'

function TicketSummaryCard() {
  return (
    <div>
        {/* Ticket Summary */}
          <div className="bg-white p-4 rounded shadow-md border-l-4 bg-[#2C66BA]">
            <p className="text-sm text-gray-500">May 2, 2025</p>
            <h3 className="text-lg font-semibold">Issue with Java memory management</h3>
            <p className="text-sm text-gray-700 mt-1">
              Encountering issues with Java memory management, possibly due to memory leaks or inefficient garbage collection.
            </p>
            <button className="mt-3 px-4 py-1 bg-[#2C66BA] text-white rounded text-sm ">
              Connect with mentor →
            </button>
          </div>
    </div>
  )
}

export default TicketSummaryCard