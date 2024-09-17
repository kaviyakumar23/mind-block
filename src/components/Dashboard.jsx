import React, { useState } from "react";
import { DashboardHeader } from "./DashboardHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";

export const Dashboard = () => {
  const { user } = useUser();
  const [thoughts, setThoughts] = useState("");
  const [file, setFile] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isAddingToSecondBrain, setIsAddingToSecondBrain] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const { toast } = useToast();
  const uploadContent = useAction(api.mindBlock.createEmbeddings);
  const chat = useAction(api.mindBlock.chatAndEmbed);

  const handleAddToSecondBrain = async () => {
    setIsAddingToSecondBrain(true);
    try {
      const result = await uploadContent({
        userId: user.id,
        content: thoughts,
      });
      toast({
        title: "Success",
        description: "Successfully added to your Second Brain!",
      });
      setThoughts(""); // Clear the textarea after successful upload
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add to Second Brain. Please try again.",
        variant: "destructive",
      });
      console.error("Error adding to Second Brain:", error);
    } finally {
      setIsAddingToSecondBrain(false);
    }
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message before sending.",
        variant: "destructive",
      });
      return;
    }
    setIsSendingMessage(true);
    try {
      const response = await chat({ userId: user.id, message: userInput });
      if (response?.success === true) {
        const aiResponse = response?.answer;
        setChatMessages([...chatMessages, { user: userInput, ai: aiResponse }]);
        setUserInput("");
        toast({
          title: "Success",
          description: "Message sent successfully!",
        });
      } else {
        throw new Error("Response was not successful");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      console.error("Error sending message:", error);
    } finally {
      setIsSendingMessage(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <DashboardHeader />
      <div className="mb-8 mt-16">
        <h2 className="text-2xl font-bold mb-4">
          Expand Your Brain with Mind Block
        </h2>
        <Textarea
          placeholder="Pour your thoughts here... Let your mind wander and your ideas flow!"
          value={thoughts}
          onChange={(e) => setThoughts(e.target.value)}
          className="mb-4"
        />
        <div className="flex items-center space-x-4 mb-4">
          <Input type="file" accept=".pdf" onChange={handleFileUpload} />
          <span className="text-sm text-gray-500">
            {file ? file.name : "No PDF selected"}
          </span>
        </div>
        <Button
          onClick={handleAddToSecondBrain}
          className="w-full"
          disabled={isAddingToSecondBrain}
        >
          {isAddingToSecondBrain && (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          {isAddingToSecondBrain ? "Adding..." : "Add to Mind Block 🧠✨"}
        </Button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Chat with Mind Block, your Second Brain
        </h2>
        <Card className="p-6 h-[400px] overflow-y-auto mb-4 flex flex-col">
          {chatMessages.length === 0 ? (
            <div className="flex-grow flex items-center justify-center text-center text-gray-500">
              <p>
                Your chat is empty. Start by asking a question about your Second
                Brain!
                <br />
                For example: "What are my recent thoughts on productivity?"
              </p>
            </div>
          ) : (
            chatMessages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${index === chatMessages.length - 1 ? "mb-0" : ""}`}
              >
                <p className="font-bold text-blue-600 mb-1">
                  You: {message.user}
                </p>
                <p className="bg-gray-100 p-3 rounded-lg">
                  Mind Block: {message.ai}
                </p>
              </div>
            ))
          )}
        </Card>
        <div className="flex space-x-2">
          <Input
            placeholder="Ask MindBlock anything you've shared..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-grow"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isSendingMessage}
            className="whitespace-nowrap"
          >
            {isSendingMessage && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isSendingMessage ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
};
