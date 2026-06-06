import { db } from "@/src/index";
import { usersTable } from "@/src/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const [existingUser] = await db.select().from(usersTable).where(eq(usersTable.email, email));
  if (existingUser) {
    return NextResponse.json({ error: "Email already exists" }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const [user] = await db.insert(usersTable).values({
    name,
    email,
    password: hashedPassword,
  }).returning();

  if (!user) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
  return NextResponse.json({ message: "Account created successfully" }, { status: 200 });
}