"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react"
import { useState } from "react"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage("Subscribing...")

    try {
      const response = await fetch("https://buttondown.email/api/emails/embed-subscribe/steipete", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email: email,
          tag: "demark",
          embed: "1",
        }),
      })

      if (response.ok) {
        setMessage("Success! Check your inbox to confirm.")
        setEmail("")
      } else {
        const errorData = await response.json()
        setMessage(`Error: ${errorData.detail || "Could not subscribe. Please try again."}`)
      }
    } catch (_error) {
      setMessage("Error: Could not connect to the subscription service.")
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="bd-email" className="sr-only">
            Enter your email
          </Label>
          <div className="flex space-x-2">
            <Input
              type="email"
              name="email"
              id="bd-email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-slate-800 border-slate-700 text-demark-light-blue placeholder-slate-500 focus:ring-demark-cyan focus:border-demark-cyan"
            />
            <Button
              type="submit"
              variant="default"
              className="bg-demark-cyan hover:bg-opacity-80 text-demark-bg font-semibold"
            >
              <Mail className="mr-2 h-4 w-4" /> Subscribe
            </Button>
          </div>
        </div>
      </form>
      {message && <p className="mt-3 text-sm text-center text-demark-light-blue">{message}</p>}
      <p className="mt-3 text-xs text-center text-demark-symbol-blue">2× per month, pure signal, zero fluff.</p>
    </div>
  )
}
