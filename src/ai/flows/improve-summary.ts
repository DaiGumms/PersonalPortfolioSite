'use server';
/**
 * @fileOverview An AI tool that analyzes a self-summary paragraph and suggests improvements based on relevant industry keywords and skills.
 *
 * - improveSummary - A function that handles the self-summary improvement process.
 * - ImproveSummaryInput - The input type for the improveSummary function.
 * - ImproveSummaryOutput - The return type for the improveSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImproveSummaryInputSchema = z.object({
  summary: z
    .string()
    .describe('The self-summary paragraph to be improved.'),
  industryKeywords: z
    .string()
    .describe('Relevant industry keywords to consider for improvements.'),
  skills: z
    .string()
    .describe('A comma-separated list of skills to highlight in the summary.'),
});
export type ImproveSummaryInput = z.infer<typeof ImproveSummaryInputSchema>;

const ImproveSummaryOutputSchema = z.object({
  improvedSummary: z
    .string()
    .describe('The improved self-summary paragraph with industry keywords and skills.'),
});
export type ImproveSummaryOutput = z.infer<typeof ImproveSummaryOutputSchema>;

export async function improveSummary(input: ImproveSummaryInput): Promise<ImproveSummaryOutput> {
  return improveSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveSummaryPrompt',
  input: {schema: ImproveSummaryInputSchema},
  output: {schema: ImproveSummaryOutputSchema},
  prompt: `You are an AI assistant that helps improve self-summary paragraphs based on industry keywords and skills.\n\nAnalyze the following self-summary paragraph and suggest improvements by incorporating the provided industry keywords and skills. The improved summary should be concise, engaging, and tailored to the specified industry.\n\nSelf-Summary:\n{{summary}}\n\nIndustry Keywords:\n{{industryKeywords}}\n\nSkills:\n{{skills}}\n\nImproved Summary:`,
});

const improveSummaryFlow = ai.defineFlow(
  {
    name: 'improveSummaryFlow',
    inputSchema: ImproveSummaryInputSchema,
    outputSchema: ImproveSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
