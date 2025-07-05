"use client";

import { useState } from "react";
import { signUpWithEmail } from "../../../lib/supabase";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      await signUpWithEmail(email, password);
      alert("登録成功！メールを確認してね！");
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
      <h2 className="text-xl font-bold">アカウント登録</h2>
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
        onClick={handleSignUp}
        className="bg-blue-500 text-white px-4 py-2"
      >
        登録
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
