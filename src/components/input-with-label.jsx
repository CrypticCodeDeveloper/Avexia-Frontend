import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputWithLabel({type, label, id, placeholder, className, register}) {
  return (
    <div className={`${className} grid w-full max-w-sm items-center gap-3 text-black`}>
      <Label htmlFor={id}>{label}</Label>
      <Input type={type} id={id} placeholder={placeholder} {...register} />
    </div>
  )
}
