"use client";

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send, Mail, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { ContactFormResponse } from '@/lib/contact-utils';
import { isValidEmail } from '@/lib/contact-utils';

// Create a schema for form validation with more detailed rules
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
  honeypot: z.string().max(0, "This field should be empty."),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [submissionTime, setSubmissionTime] = useState<Date | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();
  
  // Rate limiting for client-side submissions
  useEffect(() => {
    const lastSubmission = localStorage.getItem('lastSubmission');
    if (lastSubmission) {
      const timeSince = Date.now() - parseInt(lastSubmission);
      if (timeSince < 60000) { // 1 minute cooldown
        setSubmitCount(prev => Math.min(prev + 1, 5)); // Cap at 5 for safety
      } else {
        setSubmitCount(0);
      }
    }
  }, []);
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      honeypot: "", // Hidden field to catch bots
    },
    mode: "onBlur", // Validate on blur for better UX
  });
  
  // Track form changes to reset status
  useEffect(() => {
    const subscription = form.watch(() => {
      if (formStatus !== 'idle') {
        setFormStatus('idle');
      }
    });
    return () => subscription.unsubscribe();
  }, [form, formStatus]);

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    // Check for honeypot field (bot detection)
    if (data.honeypot) {
      console.log("Bot submission detected");
      // Pretend to submit but don't actually send
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitting(false);
      setFormStatus('success'); // Fake success to not alert bots
      return;
    }
    
    // Check submission rate
    if (submitCount >= 3) {
      toast({
        title: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <span>Too Many Attempts</span>
          </div>
        ),
        description: "Please wait before sending another message.",
        variant: "destructive",
        duration: 5000,
      });
      return;
    }
    
    // Check if submission is too quick (likely a bot)
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
      // Remove honeypot field from submission
      const { honeypot, ...submissionData } = data;
      
      // Send the form data to our API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      // Parse the JSON response
      const result = await response.json() as ContactFormResponse;

      if (!response.ok || !result.success) {
        // If the server returned an error
        throw new Error(result.message || 'Failed to send message.');
      }

      // Update form status
      setFormStatus('success');
      
      // Show success message with checkmark icon
      toast({
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span>Message Sent Successfully!</span>
          </div>
        ),
        description: "Thanks for reaching out. I'll get back to you soon.",
        variant: "default",
        duration: 5000, // Show for 5 seconds
      });
      
      // Reset the form after successful submission
      form.reset();
    } catch (error) {
      console.error("Error sending contact form:", error);
      
      // Update form status
      setFormStatus('error');
      
      // Show error message with appropriate icon
      toast({
        title: (
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span>Message Could Not Be Sent</span>
          </div>
        ),
        description: error instanceof Error ? error.message : "There was a problem sending your message. Please try again later.",
        variant: "destructive",
        duration: 7000, // Show for 7 seconds
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-2xl mx-auto bg-card shadow-xl hover:shadow-2xl transition-shadow duration-300">          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Mail className="h-12 w-12 text-accent" aria-hidden="true" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold text-foreground">Get In Touch</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              Have a question, project idea, or just want to connect? Feel free to send me a message.
            </CardDescription>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>All fields are required. I'll respond to your message as soon as possible.</p>
            </div>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>              <CardContent className="space-y-6">
                {/* Honeypot field - hidden from real users but bots will fill it */}
                <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                  <FormField
                    control={form.control}
                    name="honeypot"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Do not fill this field</FormLabel>
                        <FormControl>
                          <Input 
                            tabIndex={-1}
                            autoComplete="off"
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name" className="text-md font-semibold text-foreground">Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          id="name" 
                          placeholder="John Doe" 
                          className="bg-input focus:ring-accent" 
                          aria-required="true"
                          aria-invalid={!!form.formState.errors.name}
                          aria-describedby="name-description"
                          autoComplete="name"
                          {...field} 
                        />
                      </FormControl>
                      <div id="name-description" className="text-xs text-muted-foreground">
                        Please enter your first and last name.
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email" className="text-md font-semibold text-foreground">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="john.doe@example.com" 
                          className="bg-input focus:ring-accent"
                          aria-required="true"
                          aria-invalid={!!form.formState.errors.email}
                          aria-describedby="email-description" 
                          autoComplete="email"
                          {...field} 
                        />
                      </FormControl>
                      <div id="email-description" className="text-xs text-muted-foreground">
                        I'll use this email address to respond to your message.
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="message" className="text-md font-semibold text-foreground">Your Message</FormLabel>
                      <FormControl>
                        <Textarea
                          id="message"
                          placeholder="Let's talk about..."
                          rows={5}
                          className="bg-input focus:ring-accent resize-y min-h-[100px]"
                          aria-required="true"
                          aria-invalid={!!form.formState.errors.message}
                          aria-describedby="message-description"
                          {...field}
                        />
                      </FormControl>
                      <div id="message-description" className="text-xs text-muted-foreground">
                        Please provide details about your inquiry (minimum 10 characters).
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>              <CardFooter className="flex flex-col gap-4 justify-center border-t pt-6">
                {/* Form status message */}
                {formStatus === 'success' && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-800 flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                    <div>
                      <p className="font-medium">Message sent successfully!</p>
                      <p className="text-sm">Thank you for reaching out. You'll receive a confirmation email shortly.</p>
                    </div>
                  </div>
                )}
                
                {formStatus === 'error' && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-800 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                    <div>
                      <p className="font-medium">Failed to send message</p>
                      <p className="text-sm">Please try again or contact me directly via email.</p>
                    </div>
                  </div>
                )}
                
                {/* Info about data privacy */}
                <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-md text-blue-800 flex items-start">
                  <Info className="h-5 w-5 mr-2 text-blue-500 mt-0.5" />
                  <p className="text-sm">Your contact information will only be used to respond to your inquiry and will never be shared with third parties.</p>
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting || !form.formState.isValid || submitCount >= 3} 
                  className={`
                    transition-all duration-300 transform 
                    ${isSubmitting ? 'bg-accent/70' : 'bg-accent hover:bg-accent/90 hover:scale-105'} 
                    text-accent-foreground w-full sm:w-auto
                    ${!form.formState.isValid && 'opacity-70 cursor-not-allowed'}
                  `}
                  aria-busy={isSubmitting}
                  aria-disabled={isSubmitting || !form.formState.isValid || submitCount >= 3}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending Message...
                    </>
                  ) : submitCount >= 3 ? (
                    <>
                      <AlertTriangle className="mr-2 h-5 w-5" />
                      Rate Limit Reached
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
                
                {isSubmitting && (
                  <div className="text-center text-sm text-muted-foreground animate-pulse">
                    Processing your message, please wait...
                  </div>
                )}
                
                {/* Subtle hint about required fields */}
                <div className="text-center text-xs text-muted-foreground mt-4">
                  All fields marked with a label are required
                </div>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </section>
  );
}
