import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSubmitting(true)
    if(formData.password.trim().length < 8) {
      toast.error("Password must be at least 8 characters long", {duration: 4000})
      setSubmitting(false)
      return
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", {duration: 4000})
      setSubmitting(false)
      return
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
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
      toast.success("Account created successfully", {duration: 4000});
      router.push("/sign-in");
    } catch (error) {
      toast.error("Failed to create account", {duration: 4000})
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <Toaster position="bottom-left"/>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            id="name"
            type="text"
            placeholder="John Doe"
            required
            className="bg-background"
          />
        </Field>
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
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            id="password"
            type="password"
            required
            className="bg-background"
            minLength={8}
            maxLength={128}
          />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            id="confirm-password"
            type="password"
            required
            className="bg-background"
          />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>
        <Field>
          <Button 
            disabled={submitting} 
            type="submit"
            onClick={handleSubmit}
          >
              Create Account
          </Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href="/sign-in">Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
