"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export const createEmbeddings = action({
  args: {
    userId: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    console.log(`Creating embeddings for user: ${args.userId}`);

    const openAIApiKey = process.env.OPENAI_API_KEY;
    if (!openAIApiKey) {
      throw new Error("OpenAI API key is not configured");
    }

    try {
      // Split the document into chunks
      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });
      const texts = await textSplitter.createDocuments([args.content]);

      // Create embeddings and vector store
      const embeddings = new OpenAIEmbeddings({ apiKey: openAIApiKey });
      const vectorStore = new ConvexVectorStore(embeddings, {
        ctx,
        table: "userEmbeddings",
      });

      // Add documents to the vector store
      await vectorStore.addDocuments(
        texts.map((doc) => ({
          pageContent: doc.pageContent,
          metadata: { ...doc.metadata, userId: args.userId },
        }))
      );

      console.log(`Embeddings created successfully for user: ${args.userId}`);
      return { success: true };
    } catch (error) {
      console.error(
        `Error creating embeddings for user: ${args.userId}`,
        error
      );
      throw error;
    }
  },
});

export const chatAndEmbed = action({
  args: {
    userId: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    console.log(`Chat and embed request from user: ${args.userId}`);
    console.log(`Question received: ${args.message}`);

    const openAIApiKey = process.env.OPENAI_API_KEY;
    if (!openAIApiKey) {
      throw new Error("OpenAI API key is not configured");
    }

    try {
      const embeddings = new OpenAIEmbeddings({ apiKey: openAIApiKey });

      console.log("Initializing vector store");
      const vectorStore = new ConvexVectorStore(embeddings, {
        ctx,
        table: "userEmbeddings",
        index: "by_embedding",
      });

      console.log("Creating retriever");
      const retriever = vectorStore.asRetriever({
        filter: { userId: args.userId },
        k: 5,
      });

      console.log("Initializing model");
      const model = new ChatOpenAI({
        apiKey: openAIApiKey,
        modelName: "gpt-4o-mini",
        temperature: 0,
      });

      console.log("Creating chain");
      const chain = RetrievalQAChain.fromLLM(model, retriever);

      console.log("Calling chain");
      const response = await chain.call({
        query: args.message,
      });

      console.log(`Response generated for user: ${args.userId}`);
      console.log(`Response content: ${response.text}`);
      return {
        success: true,
        answer: response.text,
      };
    } catch (error) {
      console.error(`Error in chatAndEmbed for user: ${args.userId}`, error);
      throw error;
    }
  },
});
