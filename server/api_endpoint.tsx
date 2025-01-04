export async function getAlltransac() {
  const res = await fetch("http://localhost:3002/data");
  const data = await res.json();
  return data;
}

export async function getBalance() {
    const token = "f0d857b588c0b8acff8861c89bbaeb06";
    const res = await fetch(
    "https://apis.truemoneyservices.com/account/v1/balance",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data
}
