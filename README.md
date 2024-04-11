This is a Crypto Dashboard developed using NextJs, API, Cookies and queue. Also added search functionalities. This application uses latest NextJs version and new methodologies.

Working:

Caching with Cookies:

1. The code utilizes the js-cookie library to manage cookies for data storage.
2. When the component loads (using useEffect with an empty dependency array), it first checks for cached data within a cookie.
3. If cached data exists, it's retrieved and used to populate the application state, effectively bypassing the API call and utilizing the cached information.

Queuing API Requests:

1.A state variable named requestQueue is used to maintain a list of pending API requests.
2.The fetchData function verifies if data is already being fetched (using isLoading state). If it is, the function exits to prevent redundant API calls.
3. When no cached data is found, the addToQueue function is called, adding a marker (usually a boolean value set to true) to the requestQueue, indicating a pending request.
4. Another useEffect hook monitors changes in the requestQueue. If the queue has pending requests (indicated by a non-empty queue), the fetchQueue function is triggered.
5. Inside fetchQueue, the first request from the queue is retrieved. Then, the API call is made, the response is processed, and the fetched data updates the application state. This fetched data is also cached in a cookie for future use.
6. Finally, the processed request is removed from the queue.

  Overall, this setup ensures that API requests are made sequentially, preventing concurrent requests, and uses cookies for caching responses to avoid unnecessary API calls for repeated requests.




This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
