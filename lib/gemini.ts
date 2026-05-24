export const geminiApiUrl =
  process.env.GEMINI_API_URL ?? 'https://api.gemini.ai/v1';
export const geminiApiKey = process.env.GEMINI_API_KEY ?? '';

export async function generateText(prompt: string) {
  const response = await fetch(geminiApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${geminiApiKey}`,
    },
    body: JSON.stringify({ prompt }),
  });

  return response.json();
}
