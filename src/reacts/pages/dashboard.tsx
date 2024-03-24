import React, { useEffect } from "react";
import { ScrollShadow } from "@nextui-org/react";
import { Logo } from "@/reacts/components/sidebar/logo.tsx";
import Sidebar from "@/reacts/components/sidebar";
import { items } from "@/reacts/components/sidebar/sidebar-items";
import { request } from "@/utils";

export default function Dashboard() {
    useEffect(() => {
        const fn = async () => {
            try {
                const data = await request({
                    method: "GET",
                    url: "/api/modules",
                });
                console.log(data);
            } catch (error) {
                window.location.href = "/login";
            }
        };
        fn();
    }, []);

    return (
        <div className="h-full">
            <div className="h-full w-72 border-r-small border-divider p-6">
                <div className="flex items-center gap-2 px-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full">
                        <Logo />
                    </div>
                    <span className="text-small font-bold uppercase">Hrs</span>
                </div>
                <ScrollShadow className="max-h-full py-[10vh]">
                    <Sidebar defaultSelectedKey="home" items={[]} isLoading />
                </ScrollShadow>
            </div>
        </div>
    );
}
