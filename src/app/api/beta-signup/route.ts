import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // In a real application, save to Supabase or other DB
    // const { error } = await supabase.from('beta_signups').insert([data]);
    
    console.log("New Beta Signup Request:", data);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
