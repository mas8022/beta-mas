import { parse } from "cookie";
import { prisma } from "./prisma";
import { verifyAccessToken } from "./jwt";

export async function getMe(rawCookies: string) {
  try {
    const { access_token } = parse(rawCookies || "");

    if (!access_token) {
      throw new Error("Access token is missing");
    }

    const { id } = verifyAccessToken(access_token) as { id: number };

    const me = await prisma.user.findUnique({ where: { id } });
    return me;
  } catch (error) {
    return null;
  }
}
