import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/index"; // your drizzle instance
import * as Schema from "@/db/schema";

export const auth = betterAuth({
    emailAndPassword: { 
        enabled: true, 
      }, 
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            ...Schema
        }
    }),
});
