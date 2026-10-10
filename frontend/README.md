# Expense Tracker Frontend

## Development

Install dependencies and start the Vite development server:

```sh
npm install
npm run dev
```

The frontend uses `http://localhost:5000` as its API by default. To use a different
backend locally, set `VITE_API_URL` in a `.env.local` file. See `.env.example`.

## Vercel deployment

The production build uses the URL in `.env.production`. If you configure
`VITE_API_URL` in Vercel instead, set it to the public origin of the deployed
backend (for example, `https://your-api.example.com`). Do not include
`/api/expenses` in the value. Redeploy the frontend after changing the variable;
Vite embeds it into the production build.

The backend must also allow requests from the deployed frontend origin.
