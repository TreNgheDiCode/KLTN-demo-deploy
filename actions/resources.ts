"use server";

import {
  NewResourceParams,
  insertResourceSchema,
  resources,
} from "@/lib/db/schema/resources";
import { generateEmbeddings } from "./embedding";
import { embeddings as embeddingsTable } from "@/lib/db/schema/embeddings";
import { drizzle_db } from "@/lib/db/drizzle";

export const createResource = async (input: NewResourceParams) => {
  try {
    const { content } = insertResourceSchema.parse(input);

    const [resource] = await drizzle_db
      .insert(resources)
      .values({ content })
      .returning();

    const embeddings = await generateEmbeddings(content);
    await drizzle_db.insert(embeddingsTable).values(
      embeddings.map((embedding) => {
        if (!resource) {
          throw new Error("Resource not created.");
        }
        return {
          resourceId: resource.id,
          ...embedding,
        };
      })
    );

    return "Resource successfully created and embedded.";
  } catch (error) {
    return error instanceof Error && error.message.length > 0
      ? error.message
      : "Error, please try again.";
  }
};
