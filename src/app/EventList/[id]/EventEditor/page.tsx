import EditEventPage from "./EditEventPage";
import { getSingleEvent } from "../../../../../lib/eventApi";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const event = await getSingleEvent(params.id);
  if (!event) return notFound();

  return <EditEventPage event={event} />;
}
