"use client";

import TicketSummaryCard from "@/components/TicketSummaryCard";
import TicketPreviewModal from "@/components/TicketPreviewModal";
import { useTheme } from "@/context/ThemeContext";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import TextareaAutosize from "react-textarea-autosize";
import { UploadCloud, X } from "lucide-react";

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
  const [attachments, setAttachments] = useState<File[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMentor((prev) => !prev);
    }, 3000);
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
    setQuery("");
    setAttachments([]);
    setTicketFields({
      title: "",
      description: "",
      tags: "",
      category: "",
    });
  };

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
            <form
              onSubmit={handleTicketSubmit}
              className="bg-white dark:bg-[#222] shadow-md rounded p-5"
            >
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                ✨
                <span className="text-xl flex items-center gap-1">
                  Ask your
                  <span className="relative w-16 h-6 perspective text-orange-500 ml-1">
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

              {/* Attachment Upload */}
              <div className="mb-4">
               

                <div className="relative flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    Upload attachments{" "}
                    <span className="text-gray-400 font-normal">
                      (optional)
                    </span>
                  </label>

                  {/* File Input Styled as Dropzone */}
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-[#1e1e1e] hover:border-orange-500 transition"
                  >
                    <UploadCloud className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Click or drag files here
                    </span>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      onChange={(e) => {
                        const files = e.target.files
                          ? Array.from(e.target.files)
                          : [];
                        if (files.length > 0) {
                          setAttachments((prev) => [
                            ...prev,
                            ...files.filter(
                              (file) =>
                                !prev.some(
                                  (f) =>
                                    f.name === file.name &&
                                    f.size === file.size &&
                                    f.lastModified === file.lastModified
                                )
                            ),
                          ]);
                        }
                      }}
                      className="hidden"
                    />
                  </label>

                  {/* File List */}
                  {attachments.length > 0 && (
                    <ul className="mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      {attachments.map((file, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between px-3 py-2 bg-orange-50 dark:bg-orange-950 rounded text-orange-800 dark:text-orange-200"
                        >
                          <span className="truncate text-xs font-medium">
                            {file.name}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setAttachments((prev) =>
                                prev.filter((_, i) => i !== index)
                              )
                            }
                            className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition"
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="flex gap-3 items-center">
                <button
                  type="submit"
                  disabled={!query.trim()}
                  className={`px-4 py-2 rounded text-white transition-all ${
                    query.trim()
                      ? "bg-orange-500"
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
