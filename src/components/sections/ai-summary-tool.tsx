"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { improveSummary, type ImproveSummaryInput, type ImproveSummaryOutput } from '@/ai/flows/improve-summary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Wand2, Sparkles } from 'lucide-react';

const formSchema = z.object({
  summary: z.string().min(50, "Summary must be at least 50 characters long.").max(1000, "Summary must be at most 1000 characters long."),
  industryKeywords: z.string().min(3, "Please provide some industry keywords.").max(200, "Keywords are too long."),
  skills: z.string().min(3, "Please list some skills.").max(200, "Skills list is too long."),
});

type FormData = z.infer<typeof formSchema>;

export default function AISummaryToolSection() {
  const [improvedSummaryResult, setImprovedSummaryResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      summary: "",
      industryKeywords: "",
      skills: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setImprovedSummaryResult(null);
    try {
      const result: ImproveSummaryOutput = await improveSummary(data);
      setImprovedSummaryResult(result.improvedSummary);
      toast({
        title: "Summary Improved!",
        description: "AI has enhanced your summary.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error improving summary:", error);
      toast({
        title: "Error",
        description: "Failed to improve summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-tool" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-3xl mx-auto bg-card shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader className="text-center">
             <div className="flex justify-center mb-4">
                <Wand2 className="h-12 w-12 text-accent" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold text-foreground">AI Self-Summary Enhancer</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              Let AI help you craft a more impactful self-summary. Provide your current summary, relevant industry keywords, and key skills to get an improved version.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="summary" className="text-md font-semibold text-foreground">Your Current Self-Summary</FormLabel>
                      <FormControl>
                        <Textarea
                          id="summary"
                          placeholder="Paste your current self-summary paragraph here..."
                          rows={6}
                          className="bg-input focus:ring-accent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="industryKeywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="industryKeywords" className="text-md font-semibold text-foreground">Target Industry Keywords</FormLabel>
                      <FormControl>
                        <Input
                          id="industryKeywords"
                          placeholder="e.g., SaaS, Machine Learning, Fintech"
                          className="bg-input focus:ring-accent"
                          {...field}
                        />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="skills" className="text-md font-semibold text-foreground">Skills to Highlight (comma-separated)</FormLabel>
                      <FormControl>
                        <Input
                          id="skills"
                          placeholder="e.g., Python, Agile, Product Management"
                          className="bg-input focus:ring-accent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                <Button type="submit" size="lg" disabled={isLoading} className="bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Enhancing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Improve My Summary
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
          {improvedSummaryResult && (
            <div className="px-6 pb-6 mt-6 border-t pt-6">
              <h3 className="text-xl font-semibold mb-3 text-center text-foreground">✨ AI-Enhanced Summary ✨</h3>
              <div className="p-4 bg-primary/10 rounded-md border border-primary">
                <p className="text-foreground whitespace-pre-line">{improvedSummaryResult}</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
