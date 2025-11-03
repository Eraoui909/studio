
"use client";

import * as React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalData, skills as skillsData, hobbies as hobbiesData } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { type ContactFormInput, ContactFormInputSchema } from "@/lib/types";


type HistoryItem = {
  id: number;
  type: "input" | "output" | "error";
  prefix?: string;
  content: string;
};

const commands: Record<string, string> = {
  help: "Available commands: whoami, contact, echo, help, email, skills, hobbies, clear",
  email: personalData.contact.email,
  skills: skillsData.map(s => s.items).flat().join(", "),
  hobbies: hobbiesData.join(", "),
};

const formSteps = [
  {
    prefix: "whoami:",
    field: "name" as keyof ContactFormInput,
    placeholder: "Your name...",
  },
  {
    prefix: "contact --email",
    field: "email" as keyof ContactFormInput,
    placeholder: "Your email...",
  },
  {
    prefix: `echo "..." > inbox.txt`,
    field: "message" as keyof ContactFormInput,
    placeholder: "Your message...",
    isTextarea: true,
  },
];

export function TerminalContactForm() {
  const [step, setStep] = React.useState(0);
  const [history, setHistory] = React.useState<HistoryItem[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [isInputFocused, setIsInputFocused] = React.useState(false);

  const { register, handleSubmit, trigger, formState: { errors }, reset, setValue } = useForm<ContactFormInput>({
    resolver: zodResolver(ContactFormInputSchema),
  });
  const { toast } = useToast();
  const inputRef = React.useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const endOfHistoryRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);


  React.useEffect(() => {
    endOfHistoryRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);
  
  const focusInput = () => {
    inputRef.current?.focus();
    setIsInputFocused(true);
  }

  const handleCommand = (command: string) => {
    const newHistory: HistoryItem[] = [
      ...history,
      { id: Date.now(), type: "input", prefix: ">", content: command },
    ];

    const commandKey = command.toLowerCase().trim();
    if (commandKey === "clear") {
      setHistory([]);
      setStep(0);
      reset();
      return;
    }
     if (commandKey === 'skills') {
      const allSkills = skillsData.map(cat => `${cat.title}: ${cat.items.join(', ')}`).join('\n');
      newHistory.push({ id: Date.now() + 1, type: "output", content: allSkills });
    } else if (commands[commandKey]) {
      newHistory.push({
        id: Date.now() + 1,
        type: "output",
        content: commands[commandKey],
      });
    } else {
      newHistory.push({
        id: Date.now() + 1,
        type: "output",
        content: `command not found: ${command}. Type 'help' for a list of commands.`,
      });
    }

    setHistory(newHistory);
  };

  const onFormSubmit: SubmitHandler<ContactFormInput> = (data) => {
    const finalHistory: HistoryItem[] = [
      ...history,
      { id: Date.now(), type: "input", prefix: `> echo "${data.message}" > inbox.txt`, content: "" },
    ];
    
    const linkedInUrl = personalData.contact.social.find(s => s.name === 'LinkedIn')?.url;

    const apologyMessage = "Apologies! This contact form is for demonstration purposes only, as I'm not running a backend email server just yet.";
    const contactInstructions = `In the meantime, feel free to connect with me on LinkedIn or send me an email directly:\n\nLinkedIn: ${linkedInUrl || 'N/A'}\nEmail: ${personalData.contact.email}`;

    finalHistory.push({ id: Date.now() + 1, type: "output", content: apologyMessage });
    finalHistory.push({ id: Date.now() + 2, type: "output", content: contactInstructions });
      
    toast({
      title: "Thanks for trying!",
      description: "Please use the contact info provided to get in touch.",
    });
    
    setHistory(finalHistory);
    setStep(0);
    reset();
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      // Allow newline in textarea with Shift+Enter
      if (formSteps[step]?.isTextarea && e.shiftKey) {
        return;
      }
      
      e.preventDefault();
      const value = inputValue.trim();

      const currentStepInfo = formSteps[step];

      // Handle built-in commands if not in a form step
      if (!currentStepInfo) {
         if (value) {
            handleCommand(value);
            setInputValue("");
         }
         return;
      }

      const newHistory: HistoryItem[] = [
        ...history,
        {
          id: Date.now(),
          type: "input",
          prefix: `> ${currentStepInfo.prefix.replace('...', '')}`,
          content: value,
        },
      ];
      
      const field = currentStepInfo.field;
      setValue(field, value);

      const isValid = await trigger(field);

      if (!isValid) {
        const errorMessage = errors[field]?.message;
        if(errorMessage) {
          newHistory.push({
            id: Date.now() + 1,
            type: "error",
            content: `Error: ${errorMessage}`,
          });
        }
        setHistory(newHistory);
        setInputValue("");
        return;
      }

      setHistory(newHistory);
      
      if (step < formSteps.length - 1) {
        setStep(step + 1);
      } else {
        handleSubmit(onFormSubmit)();
      }
      setInputValue("");
    }
  };

  const currentStepInfo = formSteps[step];

  return (
    <div
      ref={containerRef}
      className="font-code p-4 sm:p-6 md:p-8 bg-card border rounded-lg shadow-lg w-full max-w-3xl mx-auto cursor-text"
      onClick={focusInput}
    >
      <div className="h-64 overflow-y-auto">
        {history.map((item) => (
          <div key={item.id} className="mb-2 last:mb-0">
            {item.type === "input" ? (
              <div className="flex items-center gap-2">
                <span className="text-primary">{item.prefix}</span>
                <span>{item.content}</span>
              </div>
            ) : (
               <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={cn("whitespace-pre-wrap", {
                  "text-muted-foreground": item.type === "output",
                  "text-destructive": item.type === "error",
                })}
              >
                {item.content}
               </motion.div>
            )}
          </div>
        ))}
         <div ref={endOfHistoryRef} />
      </div>

      <div className="flex items-center gap-2 mt-4">
        {currentStepInfo && (
            <span className="text-primary">&gt; {currentStepInfo.prefix.replace('...', '')}</span>
        )}
        {!currentStepInfo && (
            <span className="text-primary">&gt;</span>
        )}
        
        {currentStepInfo?.isTextarea ? (
             <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder={currentStepInfo.placeholder}
                className="flex-1 bg-transparent border-none outline-none resize-none"
                rows={1}
            />
        ) : (
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder={currentStepInfo?.placeholder || "Type a command..."}
                className="flex-1 bg-transparent border-none outline-none"
                autoComplete="off"
            />
        )}
        {isInputFocused && (
            <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-2 h-4 bg-primary"
            />
        )}
      </div>
    </div>
  );
}
