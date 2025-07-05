import EditEventPage from "./EditEventPage";
import { getSingleEvent } from "../../../../../lib/eventApi";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const event = await getSingleEvent(params.id);
  if (!event) return notFound();

  return <EditEventPage event={event} />;
}
