"use client";

import TicketSummaryCard from "@/components/TicketSummaryCard";
import TicketPreviewModal from "@/components/TicketPreviewModal";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import TextareaAutosize from "react-textarea-autosize";

interface Ticket {
  ticket_id: number;
  title: string;
  description: string;
  tags?: string;
  category?: string;
  date?: string;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [ticketFields, setTicketFields] = useState({
    title: "",
    description: "",
    tags: "",
    category: "",
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [showTicketSummary, setShowTicketSummary] = useState(false);
  const [savedTicket, setSavedTicket] = useState<Ticket | null>(null);
  const [history, setHistory] = useState<Ticket[]>([]);
  const { theme } = useTheme();
  const [showMentor, setShowMentor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMentor((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("submittedTickets");
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        toast.error("⚠️ Failed to load ticket history");
      }
    }
  }, []);

const fakeHistoryCall = (): Promise<Ticket[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          ticket_id: 201,
          title: "Issue with React Hooks",
          description: "Having trouble with useEffect dependencies.",
          tags: "React, Hooks",
          category: "Technical",
          date: "May 1, 2025",
        },
      ]);
    }, 1000);
  });
};

const [historyTickets, setHistoryTickets] = useState<Ticket[]>([]);


useEffect(() => {
  const fetchHistory = async () => {
    try {
      const tickets = await fakeHistoryCall();
      setHistoryTickets(tickets);
    } catch {
      toast.error("⚠️ Failed to load ticket history");
    }
  };
  fetchHistory();
}, []);

  const fakeApiCall = (
    query: string
  ): Promise<{
    title: string;
    description: string;
    tags: string;
    category: string;
  }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          title: "User Submitted Ticket",
          description: "AI generated description based on user query",
          tags: "AI, React, Ticketing",
          category: "Technical",
        });
      }, 1000);
    });
  };

  const handleTicketSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const result = await fakeApiCall(query);
      setTicketFields(result);
      setPreviewOpen(true);
    } catch {
      toast.error("❌ Failed to generate ticket");
    }
  };

  const handleConfirm = (data: {
    title: string;
    description: string;
    tags: string;
    category: string;
  }) => {
    const confirmedTicket: Ticket = {
      ...data,
      ticket_id: Math.floor(Math.random() * 1000) + 200,
      date: new Date().toLocaleDateString(),
    };

    const existing: Ticket[] = JSON.parse(
      localStorage.getItem("submittedTickets") || "[]"
    );
    const updated = [confirmedTicket, ...existing];
    localStorage.setItem("submittedTickets", JSON.stringify(updated));

    setSavedTicket(confirmedTicket);
    setShowTicketSummary(true);
    setPreviewOpen(false);
    toast.success("🎉 Ticket Confirmed & Saved!");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMentor((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);



  return (
    <div className="flex w-full">
      <style>{`
        .perspective {
          perspective: 600px;
        }
        .flip-word {
          position: relative;
          width: 100%;
          height: 100%;
          display: inline-block;
          transform-style: preserve-3d;
          transition: transform 0.7s ease-in-out;
        }
          
        .flip-word.flipped {
          transform: rotateX(180deg);
        }
        .flip-front, .flip-back {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .flip-back {
          transform: rotateX(180deg);
        }
      `}</style>
      <div className="flex-1 min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300 text-black dark:text-white">
        <div
          className={`w-full left-0 absolute h-1/2 ${
            theme === "light" ? "bg-white" : "bg-[#28304E]"
          } z-0`}
        ></div>
        <div className="relative z-20">
          <div className="p-6 space-y-6">
            <div
              className={`${theme === "light" ? "text-black" : "text-white"}`}
            >
              <h1 className="text-2xl font-semibold">
                Hi, John <span className="inline-block">👋</span>
              </h1>
              <p>
                Ready to learn and grow? Ask your mentor anything or track your
                progress below.
              </p>
            </div>

            <form
              onSubmit={handleTicketSubmit}
              className="bg-white dark:bg-[#222] shadow-md rounded p-5"
            >
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                ✨
                <span className="text-xl flex items-center gap-1">
                  Ask your
                  <span className="relative w-16 h-6 perspective text-yellow-400 ml-1">
                    <span
                      className={`flip-word ${showMentor ? "flipped" : ""}`}
                    >
                      <span className="flip-front absolute inset-0">
                        Mentor
                      </span>
                      <span className="flip-back absolute inset-0">Genie</span>
                    </span>
                  </span>
                  →
                </span>
              </h2>

              <TextareaAutosize
                minRows={4}
                className="w-full border p-3 rounded mb-4 bg-white dark:bg-[#333] text-black dark:text-white"
                placeholder="e.g. Having trouble managing React state across components using useState hook."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <div className="flex gap-3 items-center">
                <button
                  type="submit"
                  disabled={!query.trim()}
                  className={`px-4 py-2 rounded text-white transition-all ${
                    query.trim()
                      ? "bg-[#2C66BA]"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Generate Ticket
                </button>
              </div>
            </form>

            {showTicketSummary && savedTicket && (
              <TicketSummaryCard
                ticket_id={savedTicket.ticket_id}
                title={savedTicket.title}
                description={savedTicket.description}
                date={savedTicket.date}
              />
            )}

            {history.length > 0 && (
              <>
                <h3 className="mt-10 mb-2 text-lg font-semibold">
                  Your Previous Tickets:
                </h3>
                <div className="space-y-4">
                  {history.map((ticket) => (
                    <TicketSummaryCard
                      history={true}
                      key={ticket.ticket_id}
                      ticket_id={ticket.ticket_id}
                      title={ticket.title}
                      description={ticket.description}
                      date={ticket.date}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <TicketPreviewModal
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
          onConfirm={handleConfirm}
          title={ticketFields.title}
          description={ticketFields.description}
          tags={ticketFields.tags}
          category={ticketFields.category}
        />
      </div>
    </div>
  );
}
