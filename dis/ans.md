# Guide: Running "Talk Tanglish" Locally

Welcome! It's fantastic that you want to run this application on your local machine and take full ownership of the codebase. This is a very common and important step for developers. Since you already have the code pushed to GitHub, you've taken the first big step!

Here is a simple, step-by-step guide on how exactly to get this React+Vite application running on your own computer and how to securely plug in your Gemini API keys locally.

---

## Step 1: Install Prerequisites (The Basics)
Before bringing the code to life, your computer needs a few basic tools:
1.  **Node.js & npm:** This is the environment that runs JavaScript projects.
    *   Download and install it from [nodejs.org](https://nodejs.org/). (We recommend the "LTS" version).
    *   To verify it installed correctly, open your computer's terminal (Command Prompt on Windows, or Terminal on Mac) and type: `node -v` and `npm -v`.
2.  **A Code Editor:** We highly recommend **VS Code (Visual Studio Code)**. It is free and the industry standard for web development.

## Step 2: Clone the GitHub Repository
You need to pull the code from GitHub down to your local computer.
1.  Open your Terminal (or Command Prompt).
2.  Navigate to where you want to keep the folder (e.g., `cd Desktop`).
3.  Run the clone command with your repository link:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```
    *(Replace the URL with your actual GitHub repository URL)*
4.  Navigate into your newly created project folder:
    ```bash
    cd your-repo-name
    ```

## Step 3: Install Dependencies
When you push code to GitHub, the heavy `node_modules` folder full of libraries (like React, Tailwind CSS, Google GenAI SDK, etc.) is intentionally left out (thanks to the `.gitignore` file). You need to tell your computer to download them.

In your terminal, inside the project folder, run:
```bash
npm install
```
*(This might take a minute or two as it downloads all the required packages from the internet.)*

## Step 4: Setting up the API Keys Locally (.env file)
This is the most crucial part! Your app needs the Gemini API key to run, but we **never** put API keys directly into public code files (otherwise, bots on GitHub could steal and abuse it). Instead, we use "Environment Variables".

1.  Open the project in VS Code.
2.  Create a brand new file in the root directory (the main folder alongside `package.json`) and name it exactly: `.env` 
    *(Make sure it has the dot at the beginning!)*
3.  Inside this `.env` file, add your API key. Because this app is built with **Vite**, your local variables need to start with `VITE_`:
    ```env
    VITE_GEMINI_API_KEY=AIzaSyYourActualApiKeyGoesHere...
    ```
    *(Note: If you don't have an API key, you can generate a free one at Google AI Studio: https://aistudio.google.com/app/apikey)*

**Important Code Adjustment for Local Execution:**
In the cloud editor (where we built this), the API key was injected directly into Node.js space. However, standard **Vite** (what you run locally) requires using `import.meta.env` to expose variables to the browser. 

To make it run perfectly on your laptop without crashing, you should adjust the line in `src/App.tsx` (or `App.tsx`) when you pull the code.

Change this:
```typescript
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
// (or whatever variable name is currently there)
```
To this:
```typescript
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
```

## Step 5: Run the Local Development Server
Now your code is downloaded, libraries are installed, and your API key is hooked up safely.

1.  In your VS Code terminal, run the following command:
    ```bash
    npm run dev
    ```
2.  Your terminal will quickly boot up the server and show a message with a local link, usually: `http://localhost:5173/` or `http://localhost:3000/`.
3.  Hold "Ctrl" (or "Cmd" on Mac) and click that link, or copy and paste it into your browser.

**Boom! 🚀** 
The app is now running directly off your own computer! Try recording some audio or uploading a file. If you make changes to the code in VS Code and hit save, the browser will update instantly reflecting your changes.

---
*Feel free to add any more questions in your `dis.md` file, and I will be happy to explain further!*

## q2.) Invalid Path Error during Git Clone on Windows (Checkout failed)

**What exactly went wrong here?**
You are trying to download (clone) the project onto a Windows computer (as seen by `PS D:\VOICE>`). The Windows operating system strictly forbids filenames from containing colons (`:`). 

When the project was originally exported from AI Studio, it automatically created a history log file named `prompt_2026-02-19T15:35:04.764Z.json` inside the `migrated_prompt_history` folder. Git successfully downloaded everything from GitHub into a hidden `.git` folder, but when it tried to physically create that specific JSON file in your visible directory, Windows blocked it. This triggered the `invalid path` and `fatal: unable to checkout working tree` error!

**How I solved it:**
Because you used the **"yes"** codeword, I went ahead and changed the files directly. I accessed the `migrated_prompt_history` folder in our current environment and **renamed** the conflicting file completely, replacing all the colons with underscores (`prompt_2026-02-19T15_35_04_764Z.json`). 

**What you need to do immediately to fix this locally:**
1. Now that I have safely renamed the file in our environment, go to the top right of your Google AI Studio window and perform an **Export to GitHub** again. This pushes my fix to your repository.
2. In your Windows PowerShell terminal, delete the broken (half-cloned) folder by typing:
   ```powershell
   rm -Recurse -Force kadi
   ```
3. Run your clone command again perfectly!
   ```powershell
   git clone https://github.com/Praveenkumar-dev-art/kadi.git
   ```
It will now copy successfully without any errors!
--/

## q3.) Detailed Step-by-Step for Setting up `.env` and API Key

This step can definitely feel tricky the first time because `.env` files are meant to be hidden! Here is the exact, fail-proof process to do it inside Visual Studio Code (VS Code):

### A. How to get your Gemini API Key
1. Open your web browser and go to **[Google AI Studio](https://aistudio.google.com/app/apikey)**. 
2. You will be asked to log in with your Google account.
3. On the left side menu, click the **"Get API key"** button (or it might say "Create API key").
4. Click the blue button that says **"Create API key in new project"**.
5. Once it generates a long string of letters and numbers (something like `AIzaSyB1...`), click the **Copy** icon next to it and keep it on your clipboard.

### B. Creating the `.env` file in VS Code
1. Open **Visual Studio Code**.
2. Go to **File > Open Folder...** and select your `kadi` folder that you just successfully cloned.
3. On the left side of your screen, you'll see the "Explorer" panel listing all your files (`package.json`, `App.tsx`, etc.).
4. Look at the very top of that left panel. Next to the word "KADI" (your project name), click the **"New File"** icon (it looks like a document with a plus `+` sign).
5. A tiny input box will appear. Type exactly:
   `.env`
   *(Crucial: Make sure you put the dot `.` at the absolute beginning, and there is no `.txt` at the end).*
6. Press **Enter**. The file should open up on the right side of your screen, completely blank.

### C. Adding the Key to the File
1. Inside the blank `.env` file, type the following variable name exactly:
   `VITE_GEMINI_API_KEY=`
2. Instantly paste the API key you copied from Google AI Studio right after the equals sign. **Do not use any quotes or spaces.**
   *It should look EXACTLY like this:*
   `VITE_GEMINI_API_KEY=AIzaSyABCD1234efgh5678ijkl90`
3. Save the file by pressing `Ctrl + S` (Windows) or `Cmd + S` (Mac).

### D. Final Code Check
Just remember (as mentioned in Step 4 of the main guide), if your code says:
`apiKey: process.env.API_KEY`
You must manually change it to:
`apiKey: import.meta.env.VITE_GEMINI_API_KEY`
for the local React application to actually "see" the key from the `.env` file!

Now you can run `npm run dev` in your terminal!
--/

## q4.) Fixing the `npm warn deprecated node-domexception@1.0.0` Warning

**What exactly is this warning?**
When you run `npm install`, you might notice a yellow warning text popping up: 
`npm warn deprecated node-domexception@1.0.0: Use your platform's native DOMException instead`.

This warning occurs because of a **transitive dependency**. The `@google/genai` library relies on a network package called `gaxios`, which eventually trickles down to a package called `node-fetch` and then `fetch-blob`. In older versions of Node.js, `DOMException` didn't exist natively, so developers used the `node-domexception` package as a "polyfill" (a synthetic replacement). Today, modern Node.js has this feature built right in, so the creators marked the package as "deprecated", leading to this warning.

**How to solve it:**
Since you used the **"yes"** codeword, I have gone ahead and looked deeply into resolving this. The truth is, **you don't actually need to change anything in your code because it is purely a harmless warning, not a breaking error.** Your application uses modern features, and `npm` is just notifying you that deep inside one of the thousands of background files, an old package was downloaded.

Because this relies on the official Google AI SDK (`@google/genai`), the true "fix" will automatically happen when Google updates their internal `gaxios` dependency in the future.

However, if the yellow warning deeply annoys your local terminal experience, you can technically force npm to silence it by explicitly running:
```bash
npm install --no-warnings
```
Or, you can simply ignore it! It handles its own work silently at runtime and behaves perfectly.
--/

## q5.) Why am I getting a White Page? & Plan for Robust Error Handling

**Why is there a white page?**
A completely blank white page in a React application is known as the "White Screen of Death". This happens when a JavaScript/TypeScript error occurs during rendering. When React encounters an error it doesn't know how to handle, it completely unmounts (removes) the entire application from the screen to prevent displaying corrupted data, leaving you with just a blank white screen!

**The "Wait" Action Plan:**
Since you used the **wait** keyword and asked for a plan highlighting error handling and TypeScript conversion, here is exactly how we are going to fix this and protect the app moving forward:

1.  **Implement an Error Boundary:** 
    Currently, when an error hits, the app breaks invisibly. We will create a React `ErrorBoundary` wrapper. This acts like a safety net around our app. If a component crashes, the Error Boundary catches it and displays a clean, user-friendly "Oops, something went wrong!" UI *with* the exact error details, rather than a blank white screen. 
2.  **TypeScript Verification & Strict Typing:**
    You made a great point about converting to TypeScript! The good news is, our files (`App.tsx` and `index.tsx`) are already technically TypeScript files. However, we will review them heavily. We will ensure we aren't using lazy `any` types. By enforcing strict interfaces and types, the compiler will catch 90% of bugs (like reading properties of `undefined`) *before* you even run the code.
3.  **Local Network (192.168.x.x) Access Warning:**
    I noticed your Vite output showed a Network URL (`192.168.1.3`). Sometimes, accessing via the network URL creates strict CORS (Cross-Origin Resource Sharing) or secure context (HTTPS) issues depending on how the APIs are called, leading to failures and a white screen. We will make sure the Error Boundary is equipped to capture these network-level crashes too!

**Next Steps:**
If you agree with this plan, simply reply with **"yes"**, and I will immediately open the codebase, build the Error Boundary component, wrap our application in it, and tighten up the TypeScript definitions!
--/

## q6.) The `key.env` Mistake and The White Screen

**What went wrong here?**
You have just found the exact reason for the white screen! You mentioned that you created a file named `key.env`. 

In the world of Vite and React, the system is strictly programmed to look for a file named exactly **`.env`** (with nothing before the dot). Because your file was named `key.env`, Vite completely ignored it. 

**How this caused the White Screen of Death:**
1. Because Vite ignored `key.env`, your variable `import.meta.env.VITE_GEMINI_API_KEY` was empty (or `undefined`).
2. Your application tried to start the Gemini AI features using an `undefined` API key.
3. The Gemini library immediately crashed because it needs a valid key to work.
4. Because we don't have our Error Boundary setup yet (from our plan above), this unhandled crash caused React to panic and delete the whole UI—leaving you with a blank white page!

**How to fix this right now locally:**
1. Go back to VS Code.
2. Right-click your `key.env` file and select **Rename**.
3. Erase the word "key" so the filename is exclusively: `.env`
4. Make sure inside the file it still says: `VITE_GEMINI_API_KEY=abcd` (but replace `abcd` with your real key from Google AI Studio).
5. **Very Important**: Whenever you change your `.env` file, you must stop your local server (`Ctrl + C` in the terminal) and start it again with `npm run dev`.

Once you rename that file and restart the server, the white screen should disappear! We should still proceed with our Error Boundary and TypeScript plan to prevent this from ever happening invisibly again. Tell me **"yes"** if you're ready to proceed with those code protections!
--/
--~

## q7.) Executing Error Handling and TypeScript Plan

**What exactly I did to the code:**
You gave the **"yes"** codeword, so I accessed the codebase directly and applied the protections we planned:

1.  **Created `ErrorBoundary.tsx`:** I built a robust Error Boundary component (a standalone React class). Now, instead of the terrifying White Screen of Death, any fatal application crash will be peacefully caught and displayed as a clean, user-friendly error UI block explaining exactly what went wrong internally. It even provides a convenient "Reload Application" button!
2.  **Wrapped the Application in `index.tsx`:** I imported the new `ErrorBoundary` into our root `index.tsx` file and wrapped it entirely around our main `<App />`. 
3.  **Strict Typing:** I fixed a lazy `catch (e: any)` bug in our localStorage history logic (`App.tsx`), upgrading it to `unknown` and applying structural safety checks (`e instanceof Error`) to prevent silent TypeScript issues from slipping through.
4.  **Lazy Loaded Gemini Initialization:** Our original codebase eagerly crashed when Vite didn't find the `process.env.API_KEY` on first load. I constructed a `getGeminiClient()` safety function that checks both `import.meta.env` (for local Vite network) and `process.env` (for cloud deployment), and it only pulls the key exactly when the transcribe/translate button is clicked. If it fails, it throws an elegantly worded error rather than a catastrophic silent crash!

The code successfully compiled, the white screen vulnerabilities are completely handled, and the local `.env` vs cloud API Key conflict is permanently resolved! 

What should we work on next?
--/
--~

## Final Note
Awesome! I'm really glad to hear that everything is running perfectly now. We’ve successfully navigated through Git cloning issues on Windows, properly set up hidden `.env` files for secure API keys, and built an enterprise-grade Error Boundary with TypeScript to keep the app totally bulletproof.

Whenever you're ready to add new features or run into any other hurdles, just let me know. I'm right here! Happy coding!
--/