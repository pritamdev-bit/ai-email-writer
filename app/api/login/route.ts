import { db } from "@/src/index";
import { usersTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();

    if (!email || !password) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if the user exists
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if (!user) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Check if the password matches
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    // console.log("Did the password match?", isPasswordCorrect ? "Yes" : "No");

    if (!isPasswordCorrect) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Create a new session for the user
    const cookieStore = await cookies();
    const sessionId = crypto.randomUUID();
    const sessionData = {
        userName: user.name,
        userEmail: user.email,
        sessionId,
    };

    await db.update(usersTable).set({sessionId}).where(eq(usersTable.email, email));

    cookieStore.set("session", JSON.stringify(sessionData), {
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 24 hours
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json({ message: "Login successful"}, { status: 200 });
}