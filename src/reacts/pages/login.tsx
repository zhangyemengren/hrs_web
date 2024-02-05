import React from "react";
import {Input, Text, Switch, Button, Label, Fieldset, Link, Field} from "@/reacts/components";
import {clsx} from "clsx";

export default function Login() {
    return (
        <form>
            <Fieldset>
            <Text>Username</Text>
            <Input />
            <Text>password</Text>
            <Input type="password" />
            <Field className="flex justify-between">
                <Field className="flex items-center gap-4">
                    <Switch name="allow_embedding" />
                    <Label>Allow embedding</Label>
                </Field>
                <div>123</div>
            </Field>
            <Button className={clsx("w-full")}>
                submit
            </Button>
            </Fieldset>
            <Text>
                Don’t have an account?
                <Link href="#">123</Link>
            </Text>
        </form>
    );
}