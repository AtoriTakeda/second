"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { User } from "@supabase/supabase-js";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <p>ログイン中：{user.email}</p>
          <p>UID：{user.id}</p>
        </div>
      ) : (
        <p>ログインしてへん</p>
      )}
    </div>
  );
}
