import { useState } from "react";
import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import bot from "../images/bot.svg"


const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSend = async () => {
    const userMessage = { sender: "User", message: userInput };

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: userInput }],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = {
        sender: "Bot",
        message: response.data.choices[0].message.content,
      };
      setChatHistory([...chatHistory, userMessage, botMessage]);
      setUserInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  console.log(chatHistory.length)

  return (
    <>
      <div className='mt-8 flex flex-col items-center'>
        <img src={bot} className="w-20"></img>
        <span className='font-bold text-3xl'>
          Ask TBD any financial question
        </span>

        <div className='w-full flex flex-col items-center'>
        {chatHistory.length ? 
         ( <div className='bg-gray-100  p-2 mt-4 rounded shadow  flex flex-col items-start xl:1/3 lg:w-1/2 md:3/4 sm:w-3/4 max-h-80 overflow-y-scroll'> 
            {chatHistory.map((chat, index) => (
              <div key={index} className='p-2 text-start bg-cyan-500 text-white m-2 rounded '>
                <strong className="text-gray-700">{chat.sender}:</strong> {chat.message}
              </div>
            ))}       <div className='flex justify-center w-full mt-4'>
            <textarea
              type='textArea'
              value={userInput}
            onChange={handleInputChange}
            className="p-2 shadow-sm rounded w-full h-20 resize-none border border-gray-300" 
            placeholder="Type your message here..."
            />
            <button
              className='ml-4 rounded-full h-10 mt-4 bg-cyan-500 hover:bg-cyan-400 pt-2 pb-2 pl-6 pr-6 text-white  '
              onClick={handleSend}
            >
              Send
            </button>
          </div>
          </div>
          
        )
          :      ( <div className='flex justify-center mt-4'>
          <textarea
            type='textArea'
            value={userInput}
          onChange={handleInputChange}
          className="p-2 shadow-sm rounded w-full h-20 resize-none border border-gray-300" 
          placeholder="Type your message here..."
          />
          <button
            className='ml-4 rounded-full h-10 mt-4 bg-cyan-500 hover:bg-cyan-400 pt-2 pb-2 pl-6 pr-6 text-white  '
            onClick={handleSend}
          >
            Send
          </button>
        </div>)}

    
        </div>

        <div className='mt-10 w-1/2'>
          <Accordion type='single' collapsible>
            <AccordionItem value='item-1'>
              <AccordionTrigger className='rounded bg-white pt-2 pb-2 pl-3 pr-3 m-2 text-lg'>
                What is good debt?
              </AccordionTrigger>
              <AccordionContent>
                Good debt is debt that can be leveraged strategically...
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-2'>
              <AccordionTrigger className='rounded bg-white pt-2 pb-2 pl-3 pr-3 m-2 text-lg'>
                What is bad debt?
              </AccordionTrigger>
              <AccordionContent>Bad debt is debt that...</AccordionContent>
            </AccordionItem>
            <AccordionItem value='item-3'>
              <AccordionTrigger className='rounded bg-white pt-2 pb-2 pl-3 pr-3 m-2 text-lg'>
                How can I save money with no job?
              </AccordionTrigger>
              <AccordionContent>Step 1. Get a job!</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
