import NextAuth from "next-auth"

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import AuthOptions from "@/app/auth/AuthOptions";
// auth providers added need to add adapter

const handler = NextAuth(AuthOptions)

export { handler as GET, handler as POST }