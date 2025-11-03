
'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const commandToType = "sql -mcp";

export function MiniTerminalDemo() {
  const [typedCommand, setTypedCommand] = React.useState('');
  const [output, setOutput] = React.useState<string | null>(null);

  React.useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < commandToType.length) {
        setTypedCommand((prev) => prev + commandToType[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
        const commandOutput = `---------- MCP SERVER STARTUP ----------
MCP Server started successfully on ${format(new Date(), 'E MMM dd HH:mm:ss OOOO yyyy')}
Press Ctrl+C to stop the server
----------------------------------------`;
        setOutput(commandOutput);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="font-code w-full h-full bg-[#1e1e1e] rounded-lg shadow-lg border border-border/20 text-sm overflow-hidden"
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
          <div>{`> ${typedCommand}`}</div>
          {output && <div>{output}</div>}
        </div>
        <div className="flex items-center gap-2">
            {!output && (
                 <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-4 bg-green-400"
                />
            )}
          </div>
      </div>
    </div>
  );
}
