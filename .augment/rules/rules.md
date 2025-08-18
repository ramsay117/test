---
type: "always_apply"
---

# Rules for AI Agent

1. **General Development Philosophy**
   - Write clean, maintainable, and scalable code.
   - Always favor readability over raw performance.
   - Plan first with detailed pseudocode or a step-by-step outline.
   - Follow SOLID principles and DRY (Don't Repeat Yourself).
   - Use early returns to simplify logic; avoid deep nesting.
   - Handle edge cases and error conditions before the main logic flow.

2. **Code Style and Structure**
   1. **File and Folder Organization**
      - Use lowercase with dashes for directories and file names (e.g., `user-profile.ts`).
      - Group related items (e.g., components, services, tests) by domain/feature.
      - Keep one main export per file to improve clarity.
   2. **Naming Conventions**
      - `PascalCase`: Classes, React Components, Type/Interface names (e.g., `UserProfile`).
      - `camelCase`: Variables, functions, methods, hooks, props, states (e.g., `isLoading`, `handleClick`).
      - `kebab-case`: Filenames, directory names (e.g., `user-profile`, `auth-service`).
      - `UPPER_CASE`: Environment variables or constants (e.g., `API_KEY`).
   3. **Syntax and Formatting**
      - Prefer single quotes for strings (except to avoid escaping).
      - Add trailing commas in multiline objects, arrays, and function parameters when allowed.

3. **JavaScript and TypeScript Specifics**
   1. **TypeScript Usage**
      - Avoid `any` and `unknown` unless absolutely necessary.
      - Prefer `interface` over `type` for object shapes when you intend to extend.
   2. **Function Conventions**
      - Use the `function` keyword for top-level or pure utility functions; arrow functions for inline callbacks.
      - Name functions with verbs (`handleX`, `isX`, `fetchX`, `executeX`).
      - When multiple parameters are needed, pass them in an options object ("RO‑RO": receive an object, return an object).
   3. **Error Handling**
      - Use `try/catch` for expected errors; throw custom errors or re-throw with added context if needed.
      - Log or handle unexpected errors globally (e.g., an error boundary in React or a global handler in Node.js).

4. **React / Next.js**
   - Default to Server Components in Next.js where possible.
   - Use Client Components only for stateful logic, event listeners, or browser APIs.
   - Follow Next.js data fetching best practices (e.g., server-side data retrieval).
   - Implement metadata and `<head>` tags properly for SEO.
   - For global state, prefer Zustand, React Context, or Redux Toolkit if needed.
   - Use React Hook Form or Zod for form handling and validation.

5. **UI and Styling**
   1. **Tailwind CSS**
      - Use Tailwind utility classes first. Avoid large custom CSS.
      - Follow a mobile-first approach (e.g., `class="text-sm sm:text-base ..."`).
      - Implement dark mode using `.dark` or Tailwind’s built-in dark mode configuration.
   2. **Accessibility (a11y)**
      - Always add `aria-*` attributes, manage focus, and support keyboard navigation.
      - Use semantic HTML elements properly.
      - Provide `alt` text for images and labels for interactive elements.

6. **Node.js / NestJS / Express**
   - Structure apps in modules (NestJS) or routes/controllers (Express).
   - Use DTOs with validation libraries (class-validator, Zod).
   - Implement error filters or global exception handlers.
   - Keep controllers thin—put business logic in services or separate modules.

7. **Commit Message Standards**
   - Follow the Conventional Commits specification.
   - Format: `<type>: <short-description>` (≤ 30 chars).
   - Allowed types: `feat` | `fix` | `docs` | `style` | `refactor` | `test` | `chore`.
   - Use imperative mood (e.g., "Add" not "Added").
   - Abbreviate common terms (btn, cfg, svc).
   - Omit articles (a, an, the).

8. **Date and Time Handling**
   - Always use `moment-timezone` for date/time handling.
   - Perform all calculations and comparisons in UTC.
   - Store, retrieve, and send date/times as UTC ISO strings. Example:
     ```js
     moment.tz(eventTimestamp, 'UTC').toISOString();
     ```

9. **Postgres Connection and Transaction Management**
   - Use the following snippet for transaction handling in your `PostgresConnection` class:
     ```js
     static async beginTransaction() {
       const client = await PostgresConnection.instance.pool.connect();
       await client.query('BEGIN');

       return {
         execute: async (sql, params) => {
           logger.info(`Executing query with client processID: ${client.processID}`);
           await client.query(sql, params);
         },
         commit: async () => {
           try {
             await client.query('COMMIT');
             logger.info(`Committing transaction with client processID: ${client.processID}`);
           } finally {
             client.release();
           }
         },
         rollback: async () => {
           try {
             await client.query('ROLLBACK');
             logger.info(`Rolling back transaction with client processID: ${client.processID}`);
           } finally {
             client.release();
           }
         }
       };
     }
     ```

10. **Logging**
    - Always use Winston for logging. Example configuration:
      ```js
      import winston from 'winston';

      const logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({ filename: 'app.log' })
        ],
      });

      export default logger;
      ```

11. **AI Agent Response Guidelines**
    - **No Documentation**: Never create README files or test files unless explicitly specified.
    - **Simplicity First**: Prioritize simplicity, reliability, and readability over raw performance optimization.
    - **Visual Aids**: Use Mermaid diagrams (flowcharts, sequence diagrams) to provide visual explanations when helpful.
