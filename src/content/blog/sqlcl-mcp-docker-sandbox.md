---
title: "Running SQLcl MCP Safely: How to Sandbox Your Filesystem Using Docker"
description: "Running SQLcl MCP Safely: How to Sandbox Your Filesystem Using Docker"
date: "2025-10-19"
views: 2840
likes: 150
---

Once you’ve got your SQLcl MCP server up and running and start enjoying how LLMs can interact with your database securely, you’ll soon begin pushing SQLcl to its limits. You might experiment with what the LLM can do using the wide range of SQLcl internal tools /commands— AWR, Data Pump, Liquibase, Project, MLE, and more.

But as soon as you start invoking commands that interact with your file system, new questions will pop up.
How much access should the LLM really have?
Is it safe to let it read and write to your host machine?
Can we restrict its access to a specific workspace or directory?

This post explores these questions and looks at how to control file system access when integrating LLMs with SQLcl MCP.

## Understanding How PWD Works Inside SQLcl

Before we get too far, let’s first understand how the current working directory (PWD) behaves inside SQLcl, and how it’s different from your host’s PWD.

When you launch SQLcl, it starts in the directory where you ran it from — unless you have an implicitCD command sitting inside your login.sql.
So at that point, both are the same:
> 👉 SQLcl PWD = Host PWD

But here’s the catch: once you change directories inside SQLcl (using cd), the SQLcl PWD changes, while your host PWD stays exactly where it was.
Makes sense, right? SQLcl lives in its own little world.

## Where Are My Files Going?

Now, let’s say you run a command that generates a file — for example, an AWR report.
Where does it go?

It always lands inside SQLcl’s current PWD, not your host’s.
So if you didn’t change anything, you’ll find your AWR report in the same directory where you launched SQLcl MCP.
If you did change directories inside SQLcl (using the run-sqlcl tool), it’ll be wherever SQLcl’s PWD is pointing to at that moment.

## Letting the LLM Read the File

Alright, now you’ve got a report — but how do you get your LLM to read and summarize it?
You’ve got a couple of options here:

Use another MCP server that can handle file system operations, or
Use host commands like cat .
If you’d rather stay entirely inside SQLcl MCP, good news — SQLcl has a host command that lets you run any host-level command right from within SQLcl.

## ⚠️ The Security Catch

But hold on…
Giving the LLM access to your host commands basically means giving it full control over your machine.
Yup — that includes deleting, moving, or overwriting your files if something goes wrong. 😅

Thankfully, SQLcl team has thought about this.
It comes with five restriction levels (from 0 to 4):

Level 4 (the default) is the safest — it blocks host command access.
Level 0 is the wild west — it gives full permissions, including host command access.
So, if you start SQLcl like this:

```bash
sql -r 0 -mcp

---------- MCP SERVER STARTUP ----------
MCP Server started successfully on Tue Oct 14 19:49:10 WEST 2025
Press Ctrl+C to stop the server
----------------------------------------
```

then your LLM can freely use commands like cat to read and analyze your AWR reports — all within SQLcl, no extra server needed.

## The Trade-Off

Sure, this is super convenient… but also a bit risky.
Running SQLcl MCP in restriction level 0 means you’re basically giving your LLM the keys to your entire system.

That might be fine for a local sandbox or demo setup — but definitely not something to do in production systems.

Don’t worry though — there’s a safer way to handle this.
👉 We’ll talk about that in the next chapter.

## Sandbox Your System Using Docker

If you really want to keep your host machine safe while experimenting with SQLcl MCP, the best approach is to run it inside a Docker container.

> `Long story short:
Run SQLcl MCP in a Docker container, and mount a specific folder from your host machine (your “sandbox”) into that container.`

By doing this, the LLMs running inside SQLcl MCP will only have access to what’s inside the container — and to the specific directory you decide to share.
In other words, you control exactly what the LLM can see or modify.

This setup gives you the freedom to push SQLcl MCP to its limits — generate files, run host commands, test restrictions — all without worrying about messing up your real system.

## Hands-On Lab

Let’s get our hands dirty and see how to set this up in practice.

First, make sure you have Docker (or Podman) installed on your machine.
Next, pull the official SQLcl image from the Oracle Container Registry.

Once that’s ready, pick your preferred MCP client — in my case, I’ll be using the MCP Inspector for this demo.

All set? Great 🙌

Let’s move on to the next steps and see it in action!

#### Open the MCP Inspector
  
```bash 
npx @modelcontextprotocol/inspector
```
#### Run SQLcl MCP inside docker

```bash
docker run -i --rm -v /home/.dbtools:/root/.dbtools -v /path/to/sandbox:/opt/oracle/sql_scripts container-registry.oracle.com/database/sqlcl:latest -r 0 -mcp
```

> Note: I am mounting also the .dbtools so I can have access to all my connections inside the container

#### Start playing with the tools

After connecting to my database using the connect tool, I run awr create html to generate the AWR report.

Press enter or click to view image in full size
Connect SQLcl MCP with the MCP Inspector Client
The report is created inside the container but is mounted to my host machine in the sandbox at /path/to/sandbox

my host sandbox

```bash
➜  sandbox ll
total 640
-rw-r--r--@ 1 heraoui  staff   280K Oct 15 14:38 awr_EXTPDB23_2025-10-15-10.58.57_2025-10-15-12.58.09.htmlb
````

my container

```bash
➜ docker exec -it hardcore_almeida bash
bash-5.1# ls -al
total 292
drwxr-xr-x 1  501 games     96 Oct 15 13:38 .
drwxr-xr-x 1 root root    4096 Oct  8 20:29 ..
-rw-r--r-- 1  501 games 287108 Oct 15 13:38 awr_EXTPDB23_2025-10-15-10.58.57_2025-10-15-12.58.09.html
bash-5.1#
So this way I can read the content of this file using host cat command
```
