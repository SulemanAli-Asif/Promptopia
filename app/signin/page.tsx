"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BuiltInProviderType } from "next-auth/providers/index";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";

const Login = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGoogleSignin = async () => {
    signIn("google", { callbackUrl: "/" });
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="login-container">
      <h1 className="head_text text-center">Sign In</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Email
          </span>
          <input
            type="email"
            placeholder="Enter your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Password
          </span>
          <input
            type="password"
            placeholder="Enter your Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <button
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>

      <button
        onClick={handleGoogleSignin}
        className="px-5 py-1.5 mt-8  text-sm bg-red-500 rounded-full text-white"
      >
        Sign In Using Google
      </button>

      <button
        onClick={handleSignUp}
        className="px-5 py-1.5 ml-5 mt-8  text-sm bg-slate-900 rounded-full text-white"
      >
        Sign Up
      </button>

      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default Login;
