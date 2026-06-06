"use server"
import { cookies } from "next/headers"

export const getProfile = async () => {
    const cookieStore = await cookies();
    const sessionData = cookieStore.get("session");
    if (!sessionData) {
        return null;
    }
    const { userName, userEmail } = JSON.parse(sessionData.value);
    return { userName, userEmail };
}