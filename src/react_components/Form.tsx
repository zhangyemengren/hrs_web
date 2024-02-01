import React, {useState} from "react";

interface FormProps {
    onFinish?: (values: any) => void;
    children: React.ReactNode;
}

function Form(props:FormProps){
    const [values, setValues] = useState({});
    const {onFinish = () => {}, children} = props;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = {};
        // formData.forEach((value, key) => (data[key] = value));

        // 现在你可以使用 data 对象
        console.log(children, e.target);
        onFinish(values);
    }
    return <form onSubmit={handleSubmit} name="form">
        {children}
    </form>
}
interface FormItemProps {
    children: React.ReactNode;
}
Form.Item = function (props:FormItemProps) {
    const {children} = props;
    return <>
        {children}
    </>
}
export default Form;