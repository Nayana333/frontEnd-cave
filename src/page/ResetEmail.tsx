import { useState } from "react"
import { motion } from "framer-motion"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../components/ui/form"
import { verifyMail } from "../services/api/user/apiMethods" // Ensure this path is correct

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

type FormValues = z.infer<typeof formSchema>

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useNavigate()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
  
    verifyMail(values.email)
      .then((response: any) => {
        if (response.status === 200) {
          toast.success(response.data.message);
          localStorage.setItem("userEmail", values.email); 
          router("/otpreset"); 
        } else {
          toast.error(response.data.message || "Something went wrong");
        }
      })
      .catch((error: Error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white flex justify-center items-center">
      <motion.div
        className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-[#ff9800]">Reset Password</h2>
        <p className="text-gray-300 text-center mb-8">
          Enter your email address for verification.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-xs space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 rounded-lg font-medium bg-gray-200 border border-gray-400 text-gray-900 placeholder-gray-600 focus:outline-none focus:border-gray-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send your Email"}
              </Button>
            </motion.div>
          </form>
        </Form>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-sm text-gray-300">Remember your password? </span>
          <a href="/login" className="text-orange-400 hover:underline font-semibold">
            Sign In
          </a>
        </motion.div>
      </motion.div>
    </div>
  )
}
