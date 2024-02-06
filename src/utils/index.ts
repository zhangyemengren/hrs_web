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
