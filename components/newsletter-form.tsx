import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

const subscribeUrl = "https://buttondown.email/api/emails/embed-subscribe/steipete";

export default function NewsletterForm() {
  return (
    <div className="w-full max-w-md mx-auto">
      <form action={subscribeUrl} method="post" className="space-y-4">
        <input type="hidden" name="tag" value="demark" />
        <input type="hidden" name="embed" value="1" />
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
      <p className="mt-3 text-xs text-center text-demark-symbol-blue">
        2× per month, pure signal, zero fluff.
      </p>
    </div>
  );
}
