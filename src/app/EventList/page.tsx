"use client";

import { useEffect, useState } from "react";
import { getAllEvents } from "../../../lib/eventApi";
import Link from "next/link";

type Event = {
  id: string;
  title: string;
  location: string;
  datetime: string;
  creator_id: string;
};

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
      } catch (err) {
        console.error("読み込み失敗", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>読み込み中...</p>;

  return (
    <div className="p-4 space-y-4">
      {events.map((event) => (
        <div key={event.id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-bold">{event.title}</h2>
          <p className="text-gray-600">{event.location}</p>
          <p className="text-gray-500">
            {new Date(event.datetime).toLocaleString()}
          </p>
          <Link href={`/EventList/${event.id}/EventEditor`}>
            <button className="bg-blue-500 text-white px-2 py-1 rounded">
              編集
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
