export async function POST() {
  return Response.json({ 
    response: "AI Coach not configured yet. Add ANTHROPIC_API_KEY to enable." 
  })
}
