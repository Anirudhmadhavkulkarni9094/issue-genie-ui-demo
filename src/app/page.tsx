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
  date?: string;
}

export default function Home() {
  const [showTicketSummary, setShowTicketSummary] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [apiResponse, setApiResponse] = useState<Ticket | null>(null);

  const { theme } = useTheme();

  // Now history is an array for multiple tickets
  const [history, setHistory] = useState<Ticket[]>([]);

  // Fake API to fetch previous tickets (history)
  const fetchPreviousTickets = (): Promise<Ticket[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            ticket_id: 101,
            title: "Previous Ticket 1",
            description: "Description for previous ticket 1",
            date: "2025-06-01",
          },
        ]);
      }, 1500); // 1.5 seconds delay to simulate network
    });
  };

  useEffect(() => {
    // Fetch previous tickets on mount and set to history
    fetchPreviousTickets()
      .then((tickets) => {
        setHistory(tickets);
      })
      .catch(() => {
        // Optionally handle fetch error
        toast.error("Failed to load previous tickets");
      });
  }, []);

  const handleTicketSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !query.trim()) return;
    setPreviewOpen(true);
  };

  const fakeApiCall = (): Promise<Ticket> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ticket_id: Math.floor(Math.random() * 1000) + 200, // random new id
          title: title,
          description: "AI enhanced description",
          date: new Date().toLocaleDateString(),
        });
      }, 1000);
    });
  };

  const handleConfirm = async () => {
    setPreviewOpen(false);
    try {
      const response = await fakeApiCall();
      setApiResponse(response);
      setShowTicketSummary(true);
      toast.success("🎉 Ticket Confirmed & Submitted!");
    } catch (error) {
      toast.error("❌ Something went wrong submitting the ticket.");
    }
  };

  return (
    <div className="flex w-full">
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
              <h1 className="text-2xl font-semibold ">
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
              <h2 className="font-semibold text-lg mb-3">✨ Ask Your Mentor</h2>

              <input
                type="text"
                className="w-full border p-3 rounded mb-4 bg-white dark:bg-[#333] text-black dark:text-white"
                placeholder="Ticket Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <TextareaAutosize
                minRows={4}
                className="w-full border p-3 rounded mb-4 bg-white dark:bg-[#333] text-black dark:text-white"
                placeholder="Describe your issue or question in detail."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <input
                type="text"
                className="w-full border p-3 rounded mb-4 bg-white dark:bg-[#333] text-black dark:text-white"
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />

              <div className="flex gap-3 items-center">
                <select
                  className="border rounded px-3 py-2 bg-white dark:bg-[#333] text-black dark:text-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="Technical">Technical</option>
                  <option value="Career">Career</option>
                </select>
                <button
                  type="submit"
                  disabled={!title.trim() || !query.trim()}
                  className={`px-4 py-2 rounded text-white transition-all ${
                    title.trim() && query.trim()
                      ? "bg-[#2C66BA]"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Generate Ticket
                </button>
              </div>
            </form>

            {showTicketSummary && apiResponse && (
              <TicketSummaryCard
                ticket_id={apiResponse.ticket_id}
                title={apiResponse.title}
                description={apiResponse.description}
                date={apiResponse.date}
              />
            )}

            {/* Render previous ticket history */}
            {history.length > 0 && (
              <>
                <h3 className="mt-10 mb-2 text-lg font-semibold">
                  Your Previous Tickets:
                </h3>
                <div className="space-y-4">
                  {history.map((ticket) => (
                    <TicketSummaryCard
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
          title={title}
          description={query}
          tags={tags}
          category={category}
        />
      </div>
    </div>
  );
}
