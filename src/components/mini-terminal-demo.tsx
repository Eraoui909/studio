
'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const commandToType = "run-sql 'SELECT * FROM employees WHERE ROWNUM <= 3;'";
const commandOutput = `
SQLcl: Release 25.2 Production on Tue Oct 22 14:32:01 2025

Copyright (c) 1982, 2025, Oracle.  All rights reserved.

Connected to:
Oracle Database 23c Free, Release 23.0.0.0.0 - Developer-Release

  EMPLOYEE_ID FIRST_NAME           LAST_NAME                 EMAIL
_____________ ____________________ _________________________ _________________________
          100 Steven               King                      SKING
          101 Neena                Kochhar                   NKOCHHAR
          102 Lex                  De Haan                   LDEHAAN
`;

export function MiniTerminalDemo() {
  const [inputValue, setInputValue] = React.useState('');
  const [history, setHistory] = React.useState<string[]>([]);
  const [isCommandRunning, setIsCommandRunning] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim() === commandToType) {
        setHistory((prev) => [...prev, `> ${inputValue}`]);
        setIsCommandRunning(true);
        setTimeout(() => {
          setHistory((prev) => [...prev, commandOutput]);
          setIsCommandRunning(false);
          setInputValue('');
        }, 800);
      } else {
        setHistory((prev) => [
          ...prev,
          `> ${inputValue}`,
          `command not found: ${inputValue}`,
          `Hint: Try typing the suggested command.`,
        ]);
        setInputValue('');
      }
    }
  };

  React.useEffect(() => {
    // Auto-type the command for the user to see
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < commandToType.length) {
        setInputValue(commandToType.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div
      className="font-code w-full h-full bg-[#1e1e1e] rounded-lg shadow-lg border border-border/20 text-sm overflow-hidden cursor-text"
      onClick={focusInput}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-[#333] border-b border-border/20">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500"></span>
          <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
          <span className="h-3 w-3 rounded-full bg-green-500"></span>
        </div>
        <span className="text-xs text-muted-foreground">bash</span>
      </div>
      <div className="p-4 h-full overflow-y-auto text-[#d4d4d4]">
        <div className="whitespace-pre-wrap">
          {history.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        {!isCommandRunning && (
          <div className="flex items-center gap-2">
            <span className="text-green-400">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-[#d4d4d4] p-0"
              spellCheck="false"
            />
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-4 bg-green-400"
            />
          </div>
        )}
        {isCommandRunning && (
          <div className="flex items-center gap-2">
            <span className="text-green-400">&gt;</span>
            <span>Executing query...</span>
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-4 bg-green-400"
            />
          </div>
        )}
      </div>
    </div>
  );
}
