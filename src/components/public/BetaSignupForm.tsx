"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";

export function BetaSignupForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userType: "individual",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/beta-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 rounded-2xl border border-[#C89B3C]/20 shadow-xl text-center space-y-4 max-w-lg mx-auto"
      >
        <div className="w-16 h-16 bg-[#C89B3C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-[#C89B3C]" />
        </div>
        <h3 className="text-2xl font-bold text-[#1A1A1A]">Welcome to the Pilot!</h3>
        <p className="text-[#1A1A1A]/60 leading-relaxed">
          Thanks for your interest in Diano Careers. We've received your application and will reach out shortly with next steps.
        </p>
        <Button onClick={() => setStatus("idle")} variant="link" className="text-[#C89B3C] pt-4">
          Submit another entry
        </Button>
      </motion.div>
    );
  }

  return (
    <section id="beta" className="py-24 px-6 md:px-12 bg-white flex justify-center">
      <Card className="w-full max-w-2xl bg-white border-[#1A1A1A]/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#C89B3C]"></div>
        <CardHeader className="p-8 md:p-12 text-center">
          <CardTitle className="text-3xl font-bold text-[#1A1A1A] mb-2">Join the Beta Phase</CardTitle>
          <CardDescription className="text-[#1A1A1A]/60 text-base">
            Be the first to experience the future of career intelligence.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 md:px-12 pb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#1A1A1A]/80 font-medium">Full Name</Label>
                <Input
                  id="name"
                  required
                  placeholder="Jane Doe"
                  className="bg-[#F5F2E9]/30 border-[#1A1A1A]/10 focus:border-[#C89B3C] focus:ring-[#C89B3C]/20 h-12"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#1A1A1A]/80 font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="jane@example.com"
                  className="bg-[#F5F2E9]/30 border-[#1A1A1A]/10 focus:border-[#C89B3C] focus:ring-[#C89B3C]/20 h-12"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="userType" className="text-[#1A1A1A]/80 font-medium">I am an...</Label>
              <select
                id="userType"
                className="w-full h-12 rounded-md bg-[#F5F2E9]/30 border border-[#1A1A1A]/10 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89B3C]/20 focus:border-[#C89B3C]"
                value={formData.userType}
                onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
              >
                <option value="individual">Individual Professional</option>
                <option value="employer">Employer / Organization</option>
                <option value="educator">Educator</option>
                <option value="partner">Workforce Partner</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-[#1A1A1A]/80 font-medium">Message (Optional)</Label>
              <textarea
                id="message"
                placeholder="Tell us a little about your goals..."
                className="w-full h-32 rounded-md bg-[#F5F2E9]/30 border border-[#1A1A1A]/10 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89B3C]/20 focus:border-[#C89B3C]"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <Button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-white h-14 text-lg font-bold rounded-lg transition-all"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Request Beta Access"
              )}
            </Button>
            
            {status === "error" && (
              <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
            )}
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
