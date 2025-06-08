"use client";

import { Dialog } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: {
    title: string;
    description: string;
    tags: string;
    category: string;
  }) => void;
  title: string;
  description: string;
  tags: string;
  category: string;
}

export default function TicketPreviewModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  tags,
  category,
}: Props) {
  const [editableTitle, setEditableTitle] = useState(title);
  const [editableDescription, setEditableDescription] = useState(description);
  const [editableTags, setEditableTags] = useState(tags);
  const [editableCategory, setEditableCategory] = useState(category);

  useEffect(() => {
    setEditableTitle(title);
    setEditableDescription(description);
    setEditableTags(tags);
    setEditableCategory(category);
  }, [title, description, tags, category]);

  return (
    <Dialog as={Fragment} open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center p-4">
        <Dialog.Panel className="bg-white dark:bg-[#1d1f2b] p-6 rounded-2xl w-full max-w-lg shadow-xl text-black dark:text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-black dark:hover:text-white transition"
          >
            <X size={20} />
          </button>

          <Dialog.Title className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2 className="text-green-500" /> Preview & Edit Ticket
          </Dialog.Title>

          <div className="space-y-4 text-sm">
            <div>
              <label className="text-gray-500 dark:text-gray-400">Title</label>
              <input
                value={editableTitle}
                onChange={(e) => setEditableTitle(e.target.value)}
                className="w-full p-2 rounded border bg-white dark:bg-[#333] text-black dark:text-white"
              />
            </div>

            <div>
              <label className="text-gray-500 dark:text-gray-400">Description</label>
              <textarea
                value={editableDescription}
                onChange={(e) => setEditableDescription(e.target.value)}
                className="w-full p-2 rounded border bg-white dark:bg-[#333] text-black dark:text-white"
              />
            </div>

            <div>
              <label className="text-gray-500 dark:text-gray-400">Tags</label>
              <input
                value={editableTags}
                onChange={(e) => setEditableTags(e.target.value)}
                className="w-full p-2 rounded border bg-white dark:bg-[#333] text-black dark:text-white"
              />
            </div>

            <div>
              <label className="text-gray-500 dark:text-gray-400">Category</label>
              <input
                value={editableCategory}
                onChange={(e) => setEditableCategory(e.target.value)}
                className="w-full p-2 rounded border bg-white dark:bg-[#333] text-black dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-[#2a2d3d] transition"
            >
              Cancel
            </button>
            <button
              onClick={() =>
                onConfirm({
                  title: editableTitle,
                  description: editableDescription,
                  tags: editableTags,
                  category: editableCategory,
                })
              }
              className="px-4 py-2 flex gap-2 rounded-lg bg-[#2C66BA] text-white hover:bg-[#1b4c97] transition"
            >
              <CheckCircle2 /> Confirm & Submit
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
