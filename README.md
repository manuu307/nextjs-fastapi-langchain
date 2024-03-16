# Prerequisites
- Python and Node.js: Ensure that Python (with poetry) and Node.js are installed on your system.

- Git: Install Git for cloning repositories if you haven't already.

## Installing and Running the FastAPI LangChain Service
1. Clone the Repository: Clone THIS repository.

2. Navigate to the Directory: Change your current directory to the Langchain service folder.

```cd server```

3. Install Dependencies: Install the Python dependencies using poetry.

```poetry install```

4. Configure Environment Variables: Set up environment variables required by the app. Create a .env.local file in the root of your langchain service and add the OpenAI api key:

```OPENAI_API_KEY="key value"```

5. Start the FastAPI Service: Run the FastAPI LangChain service.

```poetry run langchain serve```

Done!

# Installing and Running the Next.js App

1. Navigate to the Directory: Change your current directory to the Next.js app repository in the "front" folder.

2. Install Dependencies: Install the Node.js dependencies.

```npm install```

3. Configure Environment Variables: Set up environment variables required by the app. Create a .env.local file in the root of your Next.js app and add the following:

```NEXT_PUBLIC_API=http://localhost:8000```

Replace http://localhost:8000 with the URL of your FastAPI LangChain service if it's hosted elsewhere.

4. Start the Next.js App: Run the Next.js app.

```npm run dev```

This command starts the Next.js development server, which will be available at http://localhost:3000.

# Accessing the App
Once both the FastAPI service and the Next.js app are running, you can access the app by visiting http://localhost:3000 in your web browser. The app should be able to communicate with the FastAPI LangChain service for language processing tasks.

# Conclusion
You have now successfully installed and run both the FastAPI LangChain service and the Next.js app. You can further customize and extend these components according to your requirements.
