import { supabase } from "./supabase";

export const createEvent = async ({
  title,
  location,
  datetime,
}: {
  title: string;
  location: string;
  datetime: string;
}) => {
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    throw new Error("ログインしていません");
  }

  const { error } = await supabase.from("events").insert({
    title,
    location,
    datetime,
    creator_id: user.id,
  });

  if (error) {
    console.error("イベント作成失敗:", error.message);
    throw error;
  }

  console.log("イベント作成成功！");
};

export const getAllEvents = async () => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("datetime", { ascending: true });

  if (error) throw error;

  return data;
};

export const getSingleEvent = async (id: string) => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (!data || error) throw error;

  return data;
};

export const updateEvent = async ({
  id,
  title,
  location,
  datetime,
}: {
  id: string;
  title: string;
  location: string;
  datetime: string;
}) => {
  const { error } = await supabase
    .from("events")
    .update({ title, location, datetime })
    .eq("id", id);

  if (error) throw error;
};

export const deleteEvent = async (id: string) => {
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw error;
};

export async function hasOwnEvent(): Promise<boolean> {
  const { data: user } = await supabase.auth.getUser();
  if (!user?.user) return false;

  const { data, error } = await supabase
    .from("events")
    .select("id")
    .eq("creator_id", user.user.id)
    .limit(1);

  if (error) {
    console.error("DBエラー：", error.message);
    return false;
  }

  return data && data?.length > 0;
}
