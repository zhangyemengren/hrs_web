export function todo(): void {
    alert("FUTURE");
}

type Env = {
    REQUEST_URL: string;
};
export function getEnv(): Env {
    return {
        REQUEST_URL:
            import.meta.env.PUBLIC_REQUEST_URL ?? "http://localhost:8000",
    };
}

type Request = {
    url: string;
    payload?: Object;
};
type SuccessResponse = {
    data: object;
    status: string;
    msg: string;
};

export async function post({url, payload}: Request): Promise<SuccessResponse> {
    const {REQUEST_URL} = getEnv();
    try {
        const res = await fetch(REQUEST_URL + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        if (!res.ok) {
            throw new Error("http code error",{
                cause: {
                    status: res.status,
                    statusText: res.statusText,
                    msg: "Failed to fetch",
                }
            });
        }
        const json = await res.json();
        return Promise.resolve(json);
    } catch (err) {
        return Promise.reject(err);
    }
}


