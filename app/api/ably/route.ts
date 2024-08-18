import * as Ably from "ably";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST() {
  const cookieStore = cookies();

  let clientId = cookieStore.get("ably_clientId");

  if (!clientId || !clientId.value || clientId.value === "") {
    const newClientId = uuidv4();
    let res = cookieStore.set("ably_clientId", newClientId, {
      path: "/",
      secure: true,
    });
    clientId = res.get("ably_clientId");
  }

  const client = new Ably.Rest(process.env.ABLY_API_KEY!);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: clientId?.value,
  });

  return NextResponse.json(tokenRequestData, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
    },
  });
}
