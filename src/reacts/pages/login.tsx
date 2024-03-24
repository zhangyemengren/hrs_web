import React, { useRef, useState } from "react";
import { Button, Input, Checkbox, Link } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import BaseModal from "@/reacts/components/modal";
import { request } from "@/utils";

export default function Login() {
    const formRef = useRef<HTMLFormElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleLogin = async () => {
        const fromData = new FormData(formRef.current as HTMLFormElement);
        const values = Object.fromEntries(fromData.entries());
        try {
            const data = await request({
                url: "/api/login",
                payload: values,
            });
            console.log(data, 'data');
            if (data.status === "Success") {
                localStorage.setItem("token", data.data as string);
                window.location.href = "/dashboard";
            } else {
                setIsOpen(true);
                setError(data.msg);
            }
        } catch (error) {
            setIsOpen(true);
            setError("请求失败");
        }
    };
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-500 p-2 sm:p-4 lg:p-8">
            <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-large">
                <p className="pb-2 text-xl font-medium">Log In</p>
                <form className="flex flex-col gap-3" ref={formRef}>
                    <Input
                        label="Username"
                        name="username"
                        placeholder="Enter your username"
                        type="text"
                        variant="bordered"
                    />
                    <Input
                        endContent={
                            <button type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <Icon
                                        className="pointer-events-none text-2xl text-default-400"
                                        icon="solar:eye-closed-linear"
                                    />
                                ) : (
                                    <Icon
                                        className="pointer-events-none text-2xl text-default-400"
                                        icon="solar:eye-bold"
                                    />
                                )}
                            </button>
                        }
                        label="Password"
                        name="password"
                        placeholder="Enter your password"
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                    />
                    <div className="flex items-center justify-between px-1 py-2">
                        <Checkbox name="remember" size="sm">
                            Remember me
                        </Checkbox>
                        <Link className="text-default-500" href="#" size="sm">
                            Forgot password?
                        </Link>
                    </div>
                    <Button color="primary" onClick={handleLogin}>
                        Log In
                    </Button>
                </form>

                <p className="text-center text-small">
                    Need to create an account?&nbsp;
                    <Link href="#" size="sm">
                        Sign Up
                    </Link>
                </p>
            </div>
            <BaseModal
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                content={error}
            />
        </div>
    );
}
