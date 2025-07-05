"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmail } from "../../../lib/supabase";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmail(email, password);
      router.push("/EventList");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("不明なエラーが発生しました");
      }
    }
  };

  return (
    <div className="space-y-2 p-4">
      <h2 className="text-xl font-bold">ログイン</h2>
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
      />
      <button
        onClick={handleLogin}
        className="bg-green-500 text-white px-4 py-2"
      >
        ログイン
      </button>
      {error && <p className="text-red-500">{error}</p>}
      <Link href={"/signup"}>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          サインアップがまだの場合はこちらから
        </button>
      </Link>
    </div>
  );

  //const handleLogin = async () => {
  //const { error } = await supabase.auth.signInWithOAuth({
  //  provider: "github",
  //});

  //if (error) console.error("ログイン失敗", error);
  //};

  //return <button onClick={handleLogin}>GitHubでログイン</button>;
}
