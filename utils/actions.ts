import { revalidatePath } from "next/cache"

export async function getData() {
    const res = await fetch('http://localhost:3000/api/hello')
    const data = await res.json()
    return data
}

export async function name() {
  const response = await fetch("http://localhost:3000/api/hello", {
    method: "DELETE", // Specify the HTTP method
  });
    const data = await response.json()
    return data
}