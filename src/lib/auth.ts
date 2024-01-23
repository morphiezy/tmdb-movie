export const requestToken = async (): Promise<void> => {
  const response = await fetch(
    `${import.meta.env.VITE_TMDB_ENDPOINT_URI}/4/auth/request_token`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
      body: JSON.stringify({
        redirect_to: "http://localhost:5173",
      }),
    },
  );

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.status_message);
  }

  if (typeof window !== "undefined") {
    window.sessionStorage.setItem("req_token", data.request_token);
    window.location.replace(
      `https://www.themoviedb.org/auth/access?request_token=${data.request_token}`,
    );
  }
};
