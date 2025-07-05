"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEvent, hasOwnEvent } from "../../../lib/eventApi";

export default function EventForm() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [datetime, setDatetime] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const alreadyCreated = await hasOwnEvent();
      if (alreadyCreated) {
        alert("すでに作成したイベントがあります。編集・削除してください。");
        return;
      }
      await createEvent({ title, location, datetime });
      alert("イベント作成成功!");
      router.push("/EventList");
    } catch (e) {
      alert("イベント作成失敗!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タイトル"
        className="border p-2 w-full"
      />
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="場所"
        className="border p-2 w-full"
      />
      <input
        value={datetime}
        onChange={(e) => setDatetime(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        作成
      </button>
    </form>
  );
}
