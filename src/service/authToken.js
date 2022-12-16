const TOKEN_ENDPOINT =
  "https://prod-in2.100ms.live/hmsapi/betterworld.app.100ms.live/api/token";

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json();
}

export const generateAuthToken = async ({ role }) => {
  const data = await postData(TOKEN_ENDPOINT, {
    room_id: "63917412aee54625da65387f",
    role: role,
  });
  return data;
};
