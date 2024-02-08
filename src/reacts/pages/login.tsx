import React, { useRef, useState } from "react";
import {
    Input,
    Text,
    Switch,
    Button,
    Label,
    Fieldset,
    Field,
    TextLink,
    Alert,
    AlertTitle,
    AlertDescription,
    AlertActions,
} from "@/reacts/components";
import { todo, request } from "@/utils";

// enum LoginStatus {
//     A = "A",
// }
export default function Login() {
    const formRef = useRef<HTMLFormElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const handleLogin = async () => {
        const fromData = new FormData(formRef.current as HTMLFormElement);
        const values = Object.fromEntries(fromData.entries());
        console.log(values);
        try {
            const data = await request({
                url: "/api/login",
                payload: values,
            });
            console.log(data);
            if (data.status === "Success") {
                localStorage.setItem("token", data.data as string);
                window.location.href = "/dashboard";
            } else {
                setIsOpen(true);
            }
        } catch (error) {
            console.log(error);
            setIsOpen(true);
        }
    };
    return (
        <>
            <form ref={formRef}>
                <Fieldset>
                    <Text>Username</Text>
                    <Input name="username" />
                    <Text>password</Text>
                    <Input type="password" name="password" />
                    <Field className="flex justify-between mt-6 flex-wrap gap-2">
                        <Field className="flex items-center gap-4">
                            <Switch name="allow_embedding" />
                            <Label className="cursor-pointer">
                                Remember me
                            </Label>
                        </Field>
                        <Label onClick={todo} className="cursor-pointer">
                            forget password?
                        </Label>
                    </Field>
                    <Button className="w-full mt-6" onClick={handleLogin}>
                        submit
                    </Button>
                </Fieldset>
                <Text className="flex mt-6">
                    Don’t have an account?
                    <TextLink href="" onClick={todo} className="ml-1">
                        Sign in
                    </TextLink>
                </Text>
            </form>
            <Alert open={isOpen} onClose={setIsOpen}>
                <AlertTitle>Login failed</AlertTitle>
                <AlertDescription>Something went wrong.</AlertDescription>
                <AlertActions>
                    <Button onClick={() => setIsOpen(false)}>OK</Button>
                </AlertActions>
            </Alert>
        </>
    );
}
