interface InputProps {
    name?: string;
    type?: string;
}
export default function (props:InputProps){
    const {type = "text", name = ""} = props;
    return <input type={type} name={name} />
}