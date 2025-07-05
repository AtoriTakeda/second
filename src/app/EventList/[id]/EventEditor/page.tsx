"use client";

import { useState, useEffect } from "react";
import { useRouter, notFound } from "next/navigation";
import {
  updateEvent,
  deleteEvent,
  getSingleEvent,
} from "../../../../../lib/eventApi";

export default function EditEventPage({ params }: { params: { id: string } }) {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [datetime, setDatetime] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      const data = await getSingleEvent(params.id);
      if (data) {
        setId(data.id);
        setTitle(data.title);
        setLocation(data.location);
        setDatetime(data.datetime);
      } else {
        notFound();
      }
    };
    fetchEvent();
  }, [params.id]);

  const handleUpdate = async () => {
    await updateEvent({ id, title, location, datetime });
    router.push("/EventList");
  };

  const handleDelete = async () => {
    const confirm = window.confirm("本当に削除しますか？");
    if (!confirm) return;

    await deleteEvent(id);
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
