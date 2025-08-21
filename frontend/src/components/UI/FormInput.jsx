export default function FormInput({ label,
  placeholder = null,
  type = "text",
  required = true,
  id,
  ...props }) {
  return <>
    <label htmlFor={id}>{label}</label>
    <input id={id} name={id} placeholder={placeholder} type={type} required={required} {...props}></input>
  </>
}