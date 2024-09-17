import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";

export const insertEmbeddings = internalMutation({
  args: {
    userId: v.string(),
    embedding: v.array(v.float64()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("userEmbeddings", {
      userId: args.userId,
      embedding: args.embedding,
    });
  },
});

export const fetchEmbeddings = internalQuery({
  args: { ids: v.array(v.id("userEmbeddings")) },
  handler: async (ctx, args) => {
    const embeddings = await Promise.all(args.ids.map((id) => ctx.db.get(id)));
    console.log("Embeddings before filtering:");
    console.log(JSON.stringify(embeddings, null, 2));

    const filteredEmbeddings = embeddings.filter(Boolean);
    console.log("Filtered embeddings:");
    console.log(JSON.stringify(filteredEmbeddings, null, 2));

    return filteredEmbeddings;
  },
});
