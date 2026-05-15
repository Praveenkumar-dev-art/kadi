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