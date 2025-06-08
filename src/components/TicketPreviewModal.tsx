"use client";

import { Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { CheckCircle2, X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
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
  return (
    <Dialog as={Fragment} open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center p-4">
        <Dialog.Panel className="bg-white dark:bg-[#1d1f2b] p-6 rounded-2xl w-full max-w-lg shadow-xl text-black dark:text-white relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-black dark:hover:text-white transition"
          >
            <X size={20} />
          </button>

          <Dialog.Title className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2 className="text-green-500" /> Preview Ticket
          </Dialog.Title>

          <div className="space-y-4 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Title</p>
              <p className="font-medium">{title}</p>
            </div>

            <div>
              <p className="text-gray-500 dark:text-gray-400">Description</p>
              <p className="font-medium">{description}</p>
            </div>

            <div>
              <p className="text-gray-500 dark:text-gray-400">Tags</p>
              <p className="font-medium">{tags}</p>
            </div>

            <div>
              <p className="text-gray-500 dark:text-gray-400">Category</p>
              <p className="font-medium">{category}</p>
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
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 flex gap-2 rounded-lg bg-[#2C66BA] text-white hover:bg-[#1b4c97] transition"
            >
              <CheckCircle2></CheckCircle2> Confirm & Submit
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
