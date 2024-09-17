import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  userEmbeddings: defineTable({
    embedding: v.array(v.float64()),
    metadata: v.object({
      loc: v.object({
        lines: v.object({
          from: v.float64(),
          to: v.float64(),
        }),
      }),
      userId: v.string(),
    }),
    text: v.string(),
  }).vectorIndex("by_embedding", {
    vectorField: "embedding",
    dimensions: 1536,
    filterFields: ["metadata.userId"],
  }),
});
