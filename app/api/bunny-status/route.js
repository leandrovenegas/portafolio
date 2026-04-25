import { NextResponse } from 'next/server';

export async function GET() {
  const libraryId = process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID;
  const apiKey = process.env.BUNNY_API_KEY;
  const cdnHostname = process.env.NEXT_PUBLIC_BUNNY_CDN_HOSTNAME;

  const configured = !!(libraryId && apiKey && cdnHostname);

  return NextResponse.json({
    configured,
    libraryId: libraryId || null,
    cdnHostname: cdnHostname || null,
  });
}