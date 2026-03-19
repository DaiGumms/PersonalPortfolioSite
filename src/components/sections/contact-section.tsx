'use client';

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, Loader2, CheckCircle2, AlertTriangle, Mail, MapPin } from 'lucide-react';
import { isValidEmail } from '@/lib/contact-utils';

const contactFormSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name is too long.")
    .refine(val => /^[a-zA-Z\s.\-']+$/.test(val), {
      message: "Name can only contain letters, spaces, hyphens, apostrophes, and periods."
    }),
  email: z.string()
    .email("Invalid email address.")
    .refine(isValidEmail, {
      message: "Please enter a valid email address."
    }),
  message: z.string()
    .min(10, "Message must be at least 10 characters.")
    .max(1000, "Message is too long (maximum 1000 characters).")
    .refine(val => !/(<script|javascript:|onclick=)/i.test(val), {
      message: "Message contains invalid content."
    }),
  honeypot: z.string().max(0, "This field should be empty.").optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [submissionTime, setSubmissionTime] = useState<Date | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  useEffect(() => {
    const lastSubmission = localStorage.getItem('lastSubmission');
    if (lastSubmission) {
      const timeSince = Date.now() - parseInt(lastSubmission);
      if (timeSince < 60000) {
        setSubmitCount(prev => Math.min(prev + 1, 5));
      } else {
        setSubmitCount(0);
      }
    }
  }, []);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      honeypot: '',
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    const subscription = form.watch(() => {
      if (formStatus !== 'idle') {
        setFormStatus('idle');
      }
    });
    return () => subscription.unsubscribe();
  }, [form, formStatus]);

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    if (isSubmitting) return;

    if (data.honeypot) {
      console.log("Bot submission detected");
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitting(false);
      setFormStatus('success');
      return;
    }

    if (submitCount >= 3) {
      toast({
        title: "Too Many Attempts",
        description: "Please wait before sending another message.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }

    const now = new Date();
    if (submissionTime && now.getTime() - submissionTime.getTime() < 3000) {
      console.log("Suspicious rapid submission detected");
      return;
    }

    setIsSubmitting(true);
    setSubmissionTime(now);
    setSubmitCount(prev => prev + 1);
    localStorage.setItem('lastSubmission', Date.now().toString());

    try {
      const { honeypot, ...submitData } = data;

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json() as { success: boolean; message?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to send message.');
      }

      setFormStatus('success');
      toast({
        title: "Message Sent Successfully!",
        description: "Thanks for reaching out. I'll get back to you soon.",
        variant: "default",
        duration: 5000,
      });
      form.reset();
    } catch (error) {
      console.error("Error sending contact form:", error);
      setFormStatus('error');
      toast({
        title: "Message Could Not Be Sent",
        description: error instanceof Error ? error.message : "There was a problem sending your message. Please try again later.",
        variant: "destructive",
        duration: 7000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-24 bg-surface-low">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Left Column: Intro text & direct contact */}
          <div className="lg:w-5/12 space-y-8 lg:pr-12">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold font-display text-foreground leading-tight mb-4">
                Get In Touch
              </h3>
              <p className="text-lg text-secondary font-sans leading-relaxed">
                Have a project in mind or just want to chat about the future of tech? Drop me a line and let&apos;s create something remarkable.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-surface flex items-center justify-center text-primary shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-foreground font-medium">davidmorgangumm@gmail.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-surface flex items-center justify-center text-primary shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-foreground font-medium">Manchester, UK</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:w-7/12">
            <Card className="border-0 shadow-ambient-lg bg-surface-lowest rounded-3xl p-6 md:p-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent className="space-y-6 p-0">
                    <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                      <FormField
                        control={form.control}
                        name="honeypot"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input tabIndex={-1} autoComplete="off" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-secondary">Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John Doe"
                                className="bg-surface-low border-0 h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-secondary">Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john@example.com"
                                className="bg-surface-low border-0 h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-secondary">Your Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell me about your vision..."
                              rows={5}
                              className="bg-surface-low border-0 rounded-xl resize-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 p-4"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {formStatus === 'success' && (
                      <div className="p-4 bg-green-500/10 rounded-xl text-green-600 flex items-center text-sm">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Message sent successfully!
                      </div>
                    )}

                    {formStatus === 'error' && (
                      <div className="p-4 bg-red-500/10 rounded-xl text-red-600 flex items-center text-sm">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Failed to send message. Please try again.
                      </div>
                    )}

                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={isSubmitting || submitCount >= 3}
                        className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 shadow-ambient transition-all"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : submitCount >= 3 ? (
                          <>
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Limit Reached
                          </>
                        ) : (
                          <>
                            Send Message <Send className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </form>
              </Form>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
