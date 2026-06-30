import type { VercelRequest, VercelResponse } from '@vercel/node'

const DC = 'us15'
const LIST_ID = '1605e546ba'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' })
  }

  const apiKey = process.env.MAILCHIMP_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Server misconfigured' })
  }

  const response = await fetch(
    `https://${DC}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        tags: ['chronicl-web'],
      }),
    }
  )

  const data = await response.json() as any

  // 400 with title "Member Exists" is fine — they're already subscribed
  if (response.ok || data.title === 'Member Exists') {
    return res.status(200).json({ success: true })
  }

  return res.status(400).json({ error: data.detail ?? 'Subscription failed' })
}
