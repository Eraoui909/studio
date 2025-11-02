---
title: "SQLcl MCP Server: Tips, Tricks, and Use Cases"
description: "SQLcl MCP Server: Tips, Tricks, and Use Cases"
date: "2025-10-10"
views: 2840
likes: 150
---

SQLcl MCP is an MCP server designed for Oracle databases. It enables LLMs to interact with your Oracle database through prompts

* * *

### SQLcl MCP Server: Tips, Tricks, and Use Cases

![](https://cdn-images-1.medium.com/max/800/1*DkjZzDV9HC9MGenZRMl-ig.png)

### Model Context Protocol

Model Context Protocol (MCP) is an open standard created by Anthropic, the company behind Claude. While it may sound technical, the idea is straightforward: provide AI agents with a consistent way to interact with tools, services, and data — regardless of their environment or implementation.

Just search for MCP on Google and you’ll find more details :)

### SQLcl MCP

**SQLcl MCP** is an MCP server designed for Oracle databases. It enables LLMs to interact with your Oracle database through prompts using your preferred MCP client and model.

SQLcl MCP doesn’t just respond to SELECT or read-only prompts — it can also perform write operations on your database. This makes it a powerful tool for database developers, DBAs, consultants, and even non-technical users.

Granting an LLM write privileges to your database isn’t entirely risk-free. However, I will cover the necessary security precautions in a dedicated section of this article.

Install SQLcl: [https://www.oracle.com/uk/database/sqldeveloper/technologies/sqlcl/download/](https://www.oracle.com/uk/database/sqldeveloper/technologies/sqlcl/download/)

### Use Cases

Here are some examples of prompts that SQLcl MCP handles efficiently

#### Example 1

**Prompt:** Who are the highest-paid employees in the HR schema?

![Who are the highest-paid employees in the HR schema?](https://cdn-images-1.medium.com/max/800/1*rl8WMYv0k0gCDk4m7AWd9g.png)

#### Example 2

One of the best cases that I see a lot of potential on it. Is let the LLM do your tasks for you.

Lets say that I have this Jira task: JIRA-123

> **Title:**  
> Create New View and API Package for Department Table in HR Schema

> **Description:**

> Develop a new database view for the `DEPARTMENTS` table in the HR schema.

> Create a PL/SQL package to serve as an API for the `DEPARTMENTS` table with the following procedures:

> Select departments

> Insert a new department

> Delete a department

> Ensure all new objects follow company naming conventions and security best practices.

> **Acceptance Criteria:**

> A new view on the `DEPARTMENTS` table is created and validated.

> PL/SQL package exists with procedures for select, insert, and delete operations.

> All changes are tested and reviewed.

> Documentation is updated.

![](https://cdn-images-1.medium.com/max/800/1*TrjW3E4wPsZ4zzIkTWx35w.png)

### SQLcl MCP Tools

To achieve the results shown in the previous section, SQLcl exposes five main tools that LLMs use to access your database and orchestrates them to provide accurate answers to your prompts.

*   **list-connections:** Discovers and lists all saved Oracle Database connections on your machine.
*   **connect:** Establishes a connection to one of your specified named connections.
*   **disconnect:** Terminates the current, active Oracle Database connection.
*   **run-sql:** Executes standard SQL queries and PL/SQL code blocks against the connected database.
*   **run-sqlcl:** Executes SQLcl-specific commands and extensions.

### Configure your Client with SQLcl MCP

SQLcl MCP can be easily configured with any MCP Client on the market, as the setup steps are almost the same.

For SQL Developer in VSCode, the integration is handled automatically behind the scenes with Copilot.

If you want to work with Cline or Claude, check out the official documentation for a step-by-step guide on how to configure it: [https://docs.oracle.com/en/database/oracle/sql-developer-command-line/25.2/sqcug/starting-and-managing-sqlcl-mcp-server.html](https://docs.oracle.com/en/database/oracle/sql-developer-command-line/25.2/sqcug/starting-and-managing-sqlcl-mcp-server.html#GUID-5F916B5D-8670-42BD-9F8B-D3D2424EC47E)

### Monitoring the SQLcl MCP Server

For database connections in write mode, SQLcl MCP creates a table named DBTOOLS$MCP\_LOG that logs the actions performed by the LLMs during your connection, allowing you to audit their activity at any time.

SQL\> desc DBTOOLS$MCP\_LOG  
  
Name              Null?       Type  
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ \_\_\_\_\_\_\_\_\_\_\_ \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
ID                NOT NULL    NUMBER  
MCP\_CLIENT        NOT NULL    VARCHAR2(200)  
MODEL                         VARCHAR2(200)  
END\_POINT\_TYPE                VARCHAR2(12)  
END\_POINT\_NAME    NOT NULL    VARCHAR2(100)  
LOG\_MESSAGE                   CLOB  
CREATED\_ON        NOT NULL    TIMESTAMP(6)  
CREATED\_BY        NOT NULL    VARCHAR2(100)  
UPDATED\_ON                    TIMESTAMP(6)  
UPDATED\_BY                    VARCHAR2(100)  
SQL\>

SQL\> SELECT ID, MCP\_CLIENT, MODEL, END\_POINT\_TYPE, END\_POINT\_NAME, LOG\_MESSAGE  
  2\*      FROM DBTOOLS$MCP\_LOG;  
  
   ID MCP\_CLIENT    MODEL              END\_POINT\_TYPE    END\_POINT\_NAME    LOG\_MESSAGE  
\_\_\_\_\_ \_\_\_\_\_\_\_\_\_\_\_\_\_ \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
    3 Claude        claude\-sonnet\-4    tool              connect           Connect to HR  
    4 Claude        claude\-sonnet\-4    tool              run\-sql           select /\* LLM in use is Claude Sonnet 4 \*/ \* from employees  
    5 Claude        claude\-sonnet\-4    tool              run\-sqlcl         info employees  
    6 Claude        claude\-sonnet\-4    tool              disconnect        Disconnect from HR  
  
SQL\>

If you have database administrator (DBA) privileges, you can monitor active MCP connections and operations in real-time. The server integrates with Oracle’s V$SESSION view, allowing you to use standard Oracle monitoring tools to track current sessions, resource usage, and performance. To see the MCP client information, you can observe the MODULE and ACTION values in V$SESSION.

To view active sessions, query the V$SESSION view:

select \* from V$SESSION;

> **Note:** The `DBTOOLS$MCP_LOG` table does not include any automatic cleanup mechanism. Be sure to regularly purge or delete old records to prevent database saturation.

### Security Guidelines

When you allow LLMs access to your database through SQLcl’s MCP server, you introduce significant security risks — especially when using tools like `run-sql` or `run-sqlcl`

#### 1\. Use a Safe Non‑Production Environment

*   Never connect MCP to your production database.
*   Avoid accidental exposure of sensitive or business-critical data.

#### 2\. Apply Least Privilege Permissions

*   Grant the LLM’s database user **only the minimal permissions** required for its tasks.

#### 3\. Require Explicit Pre‑Execution Approval

*   Ensure your MCP client prompts the user **before** any tool invocation.
*   Confirm that the user reads and understands **exactly what SQL will run**, then explicitly **accept or decline** execution.
*   If unsure, always **decline**.

#### 4\. Enable Comprehensive Auditing & Monitoring

*   Monitor `V$SESSION.MODULE` for MCP client identity and `V$SESSION.ACTION` for the LLM name.
*   Review `DBTOOLS$MCP_LOG`, which records each interaction, including queries and inputs.
*   All executed SQL includes comments like `/* LLM in use … */` for easier traceability
*   Regularly review these logs for anomalies or unauthorized access attempts.

#### 5\. Guard Against MCP‑Specific Threats

*   Be cautious of **tool-poisoning**, **line-jumping**, **dynamic tool redefinition (rug‑pull)**, and **tool shadowing attacks**, where malicious servers inject hidden or overwritten functionality into tool descriptions before user approval. [see more details](https://stytch.com/blog/mcp-security?utm_source=chatgpt.com)
*   Only register MCP servers from trusted sources; avoid connecting to unknown or unvetted servers

### Auto‑Correction Capability

If something goes wrong and an error occurs, SQLcl MCP handles it automatically. Each error is wrapped in a standard format:

ERROR: <error message>  
Based on the error thrown, provide the user with a clear explanation   
of what went wrong. If possible, correct the issue and retry the request

Based on the error message, the system then provides the user with a clear explanation of what went wrong. Whenever possible, it attempts to correct the issue and retries the request using updated arguments.

This allows the LLM to refine the previous request iteratively in order to fulfill the original prompt’s goal.

To avoid infinite loops — when the LLM repeatedly fails to correct arguments — there’s a final step: either **accept** or **decline** the request. That way, the process always terminates cleanly. 😊

### Conclusion

I hope this gave you a clear overview of the new SQLcl MCP Server features introduced in version 25.2. With every release, more tools and enhancements are on the way.

I’d love to hear your prompt ideas and how you’re using SQLcl MCP to automate your DBA tasks — share them in the comments!

If you have any questions or want to connect, feel free to reach out to me on [LinkedIn](https://www.linkedin.com/in/hamza-eraoui/).