"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client"; //import the auth client

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  const onSubmit = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name,
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          window.alert("Successfully signed up");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      },
    );
  };

  const onLogin = async () => {
    const { data, error } = await authClient.signIn.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          window.alert("Successfully signed in");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      },
    );
  };

  if (session) {
    return (<div className="flex flex-col p-4 gap-y-4">
      <p>Already session exists for user {session?.user.name}</p>
      <Button
        variant={"outline"}
        onClick={async () => {
          await authClient.signOut();
        }}
      >
        Sign Out
      </Button>
    </div>);
  }

  return (
    <div className="p-4 flex flex-col gap-y-10">
      <div className="p-4 flex flex-col gap-y-4">
        <p>Sign Up</p>
        <Input
          placeholder="enter your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          placeholder="enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          placeholder="enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button variant={"outline"} onClick={onSubmit}>
          Submit
        </Button>
      </div>
      <div className="p-4 flex flex-col gap-y-4">
        <p>Sign In</p>
        <Input
          placeholder="enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          placeholder="enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button variant={"outline"} onClick={onLogin}>
          Login In
        </Button>
      </div>
    </div>
  );
}
