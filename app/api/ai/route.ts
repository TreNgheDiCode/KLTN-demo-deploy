import { findRelevantContent } from "@/actions/embedding";
import { createResource } from "@/actions/resources";
import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText, tool } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {messages} = await req.json();

  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    messages: convertToCoreMessages(messages),
    system: `You are a helpful assistant. Check your knowledge base before answering any questions.
    Only respond to questions using information from tool calls after calling summarize the knowledge first.
    Only respond to users using the user's language.
    Ask users for feedback after answering their questions.
    If there are attachments, use the information in the attachments to answer the question.
    If the user's request forces into multiple choices, respond to the user "I'm sorry, but I'm only able to provide one answer at a time. For more information, please look at the site: https://kltn-demo-deploy.vercel.app/chatbot". 
    if no relevant information is found in the tool calls, respond, you don't know with the user's language.`,
    tools: {
      addResource: tool({
        description: `add a resource to your knowledge base.
          If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation. If the user asks a question, ask for confirmation before adding the information to the knowledge base.`,
        parameters: z.object({
          content: z
            .string()
            .describe("the content or resource to add to the knowledge base"),
        }),
        execute: async ({ content }) => {
          try {
            return await createResource({ content });
          } catch (error) {
            console.log("Failed to add resource to knowledge base", error);

            throw new Error("Failed to add resource to knowledge base");
          }
        },
      }),
      getInformation: tool({
        description: `get information from your knowledge base to answer questions.`,
        parameters: z.object({
          question: z.string().describe("the users question"),
        }),
        execute: async ({ question }) => findRelevantContent(question),
      }),
      summarizeContent: tool({
        description: `Summarize content from the knowledge base before presenting it to the user.`,
        parameters: z.object({
          content: z.string().describe("The content to summarize"),
        }),
      })
    },
  });

  return result.toDataStreamResponse();
}
