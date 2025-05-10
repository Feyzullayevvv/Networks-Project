import React from "react";

export default function TopicSelector({
  selectedTopic,
  setSelectedTopic,
  visible,
}) {
  if (!visible) return null;

  return (
    <div className="mt-4 flex items-center gap-3 px-4 py-2 bg-[rgba(99,102,241,0.1)] rounded-xl">
      <label
        className="text-[#6366f1] font-medium text-sm"
        htmlFor="topic-select"
      >
        Topic:
      </label>
      <select
        id="topic-select"
        value={selectedTopic}
        onChange={(e) => setSelectedTopic(e.target.value)}
        className="rounded-md border border-indigo-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <option value="networks">Networks</option>
        <option value="os">Operating Systems</option>
        <option value="security">Security</option>
      </select>
    </div>
  );
}
