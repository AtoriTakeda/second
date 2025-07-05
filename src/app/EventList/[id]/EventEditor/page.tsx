import EditEventPage from "./EditEventPage";
import { getSingleEvent } from "../../../../../lib/eventApi";
import { notFound } from "next/navigation";
import { Event, Params } from "@/app/types";

export default async function Page({ params }: Params) {
  const event: Event | null = await getSingleEvent(params.id);
  if (!event) return notFound();

  return <EditEventPage event={event} />;
}
