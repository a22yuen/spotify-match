export const loginUsers = async () => {
  const url =
    "https://vhb0e07ykd.execute-api.us-east-2.amazonaws.com/spotify-login";
  const response = await fetch(url, {
    method: "GET",
    mode: "cors", // or "no-cors"
    headers: {
      "Content-Type": "application/json",
    },
  });

  const parsed = await response.json();

  console.log("==response", parsed);

  window.open(parsed.auth_url, "_self");
};
