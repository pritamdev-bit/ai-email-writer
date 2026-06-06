import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSubmitting(true)
    if(formData.password.trim().length < 8) {
      toast.error("Password must be at least 8 characters long", {duration: 4000})
      setSubmitting(false)
      return
    }
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(error.error, {duration: 4000})
        setSubmitting(false)
        return
      }
      toast.success("Login successful", {duration: 4000});
      router.push("/");
    } catch (error) {
      toast.error("Failed to login", {duration: 4000})
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <Toaster position="bottom-left"/>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="bg-background"
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            id="password"
            type="password"
            required
            className="bg-background"
          />
        </Field>
        <Field>
          <Button disabled={submitting} onClick={handleSubmit} type="submit">Login</Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
