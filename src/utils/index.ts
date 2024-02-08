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
    method?: string;
};
type SuccessResponse = {
    data: any;
    status: string;
    msg: string;
};

export async function request({
    url,
    payload,
    method = "POST",
}: Request): Promise<SuccessResponse> {
    const { REQUEST_URL } = getEnv();
    try {
        let token: string = localStorage.getItem("token") ?? "";
        const res = await fetch(REQUEST_URL + url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: method === "POST" ? JSON.stringify(payload) : undefined,
        });
        if (!res.ok) {
            throw new Error("http code error", {
                cause: {
                    status: res.status,
                    statusText: res.statusText,
                    msg: "Failed to fetch",
                },
            });
        }
        const json = await res.json();
        return Promise.resolve(json);
    } catch (err) {
        return Promise.reject(err);
    }
}
