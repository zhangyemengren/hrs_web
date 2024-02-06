import React, { useRef } from "react";
import {
	Input,
	Text,
	Switch,
	Button,
	Label,
	Fieldset,
	Field,
	TextLink,
} from "@/reacts/components";
import { todo, getEnv } from "@/utils";

export default function Login() {
	const formRef = useRef<HTMLFormElement>(null);
	const handleLogin = () => {
		const fromData = new FormData(formRef.current as HTMLFormElement);
		const values = Object.fromEntries(fromData.entries());
		const { REQUEST_URL } = getEnv();
		console.log(values);
		fetch(REQUEST_URL + "/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username: "x", password: "xx" }),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<form ref={formRef}>
			<Fieldset>
				<Text>Username</Text>
				<Input name="username" />
				<Text>password</Text>
				<Input type="password" name="password" />
				<Field className="flex justify-between mt-6 flex-wrap gap-2">
					<Field className="flex items-center gap-4">
						<Switch name="allow_embedding" />
						<Label className="cursor-pointer">Remember me</Label>
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
	);
}
