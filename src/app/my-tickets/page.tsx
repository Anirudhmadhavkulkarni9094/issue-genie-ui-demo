"use client";
import React, { useState } from "react";

const initialTasks = [
  { id: 1, title: "Review and update UI", status: "todo", date: "May 2, 2025" },
  { id: 2, title: "Review and update UI", status: "inprogress", date: "May 2, 2025" },
  { id: 3, title: "Review and update UI", status: "ready", date: "May 2, 2025" },
];

const completedTasks = [
  { id: 4, title: "Fix login bug", date: "Apr 28, 2025" },
  { id: 5, title: "Deploy v1.0.1", date: "Apr 27, 2025" },
  { id: 6, title: "Update terms & conditions", date: "Apr 25, 2025" },
  { id: 7, title: "Optimize image loading", date: "Apr 22, 2025" },
  { id: 8, title: "Add Google Analytics", date: "Apr 20, 2025" },
];

type Status = "todo" | "inprogress" | "ready" | "completed";

const statusStyles: Record<Status, string> = {
  todo: "border-l-4 border-l-red-600",
  inprogress: "border-l-4 border-l-yellow-600",
  ready: "border-l-4 border-l-green-600",
  completed: "border-l-4 border-l-gray-500",
};

const statusTitles: Record<Exclude<Status, "completed">, string> = {
  todo: "TO-DO",
  inprogress: "IN PROGRESS",
  ready: "Read for Review",
};

const TaskCard = ({ task, status }: { task: any; status: Status }) => (
  <div
    className={`rounded p-4 shadow bg-white ${statusStyles[status]}`}
  >
    <p className="text-sm text-gray-600 mb-2">{task.date}</p>
    <h3 className="text-md font-semibold mb-1">{task.title}</h3>
    <p className="text-sm text-gray-600 mb-3">
      This ticket involves updating UI ticket with mod...
    </p>
    <button
      className={`px-3 py-1 rounded text-white text-sm ${
        status === "todo"
          ? "bg-red-500"
          : status === "inprogress"
          ? "bg-yellow-500"
          : status === "ready"
          ? "bg-green-600"
          : "bg-gray-600"
      }`}
    >
      SEE MORE
    </button>
  </div>
);

const TodoBoard = () => {
  const [tasks] = useState(initialTasks);
  const [showActive, setShowActive] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);

  return (
    <div className="min-h-screen px-6 py-10 bg-white">
      {/* Active Tickets Accordion */}
      <div>
        <button
          onClick={() => setShowActive(!showActive)}
          className="flex justify-between items-center w-full text-left mb-4"
        >
          <h2 className="text-xl font-bold">
            Active Tickets ({tasks.length})
          </h2>
          <span className="text-2xl">{showActive ? "▴" : "▾"}</span>
        </button>

        {showActive && (
          <div className="flex gap-4 flex-wrap lg:flex-nowrap">
            {Object.keys(statusTitles).map((status) => (
              <div key={status} className="flex-1">
                <div className="bg-gray-50 rounded shadow p-4 min-h-[400px]">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">{statusTitles[status as keyof typeof statusTitles]}</h3>
                    <button>
                      {status === "todo"
                        ? "➕"
                        : status === "inprogress"
                        ? "⚠️"
                        : "📅"}
                    </button>
                  </div>
                  <div className="space-y-4">
                    {tasks
                      .filter((task) => task.status === status)
                      .map((task) => (
                        <TaskCard key={task.id} task={task} status={status as Status} />
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Tickets Accordion */}
      <div className="mt-10">
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className="flex justify-between items-center w-full text-left"
        >
          <h2 className="text-xl font-bold">Completed Tickets ({completedTasks.length})</h2>
          <span className="text-2xl">{showCompleted ? "▴" : "▾"}</span>
        </button>

        {showCompleted && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {completedTasks.map((task) => (
              <TaskCard key={task.id} task={task} status="completed" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoBoard;
