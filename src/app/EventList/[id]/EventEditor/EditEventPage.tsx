"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateEvent, deleteEvent } from "../../../../../lib/eventApi";

type Event = {
  id: string;
  title: string;
  location: string;
  datetime: string;
};

export default function EditEventPage({ event }: { event: Event }) {
  const [title, setTitle] = useState(event.title);
  const [location, setLocation] = useState(event.location);
  const [datetime, setDatetime] = useState(event.datetime);
  const router = useRouter();

  const handleUpdate = async () => {
    await updateEvent({ id: event.id, title, location, datetime });
    router.push("/EventList");
  };

  const handleDelete = async () => {
    const confirm = window.confirm("本当に削除しますか？");
    if (!confirm) return;

    await deleteEvent(event.id);
    router.push("/EventList");
  };

  return (
    <div className="space-y-2 border p-4 rounded">
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input value={location} onChange={(e) => setLocation(e.target.value)} />
      <input
        type="datetime-local"
        value={datetime}
        onChange={(e) => setDatetime(e.target.value)}
      />
      <button
        onClick={handleUpdate}
        className="bg-green-500 text-white px-2 py-1"
      >
        更新
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-2 py-1"
      >
        削除
      </button>
    </div>
  );
}
