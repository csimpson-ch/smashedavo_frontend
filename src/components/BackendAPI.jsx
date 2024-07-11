

export default async function BackendLoader(url) {
    const res = await fetch(url, {
        method: 'GET',
        modes: 'cors',
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.status !== 200) {
        throw new Response("Error in fetch RIP BOZO")
    }
    const data = await res.json();
    // console.log('response', response)
    return data;
}