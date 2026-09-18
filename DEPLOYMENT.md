# Deployment - StoryboardAI

## Vercel production

Production URL:

```text
https://storyboardai-top1server.vercel.app/
```

The repository now includes Vercel-compatible routes:

- `POST /api/lesson-meta` - suggests lesson title, learning goal, audience and duration from pasted lesson text.
- `POST /api/storyboard` - generates storyboard data for 3-5 scenes.

The Vercel project must have this environment variable configured for AI calls:

```text
OPENAI_API_KEY=<the team key>
```

Do not commit `.env` or the actual key. `.env.example` is safe to commit.

## Local

```powershell
copy .env.example .env
# edit .env and add OPENAI_API_KEY
npm start
```

Without the key, the UI still loads and metadata fields remain editable, but AI calls return a clear configuration error.

## Verify after deploy

1. Open the production URL in an incognito window.
2. Choose `Dán lời đọc` and paste 3-10 sentences.
3. Continue to step 2 and check that the metadata request completes.
4. Continue to the storyboard board and click `AI tạo storyboard cho 3 cảnh`.
5. Confirm the badge changes to `AI thật` and the output includes learning point, visual intent, on-screen text, trigger and risk flag.
6. Check that the browser Network panel shows calls to `/api/lesson-meta` and `/api/storyboard`, not a client-side API key.
