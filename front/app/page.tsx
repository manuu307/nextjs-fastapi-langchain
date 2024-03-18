"use client"
import { RemoteRunnable } from "@langchain/core/runnables/remote";
import TextField from '@mui/material/TextField';
import React from "react";
import ButtonGroup from '@mui/material/ButtonGroup';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/navigation';

type Prompt = {
  from:string;
  content:string;
}

type User = {
  authenticated: boolean;
  username: string;
}

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [authVerifying, setAuthVerifying] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string | null>()
  const [messages, setMessages] = React.useState<any>([])
  const [prompt, setPrompt] = React.useState<string>("")
  const [user, setUser] = React.useState<User | null>(null);
  console.log(user)
 
  React.useEffect(() => {
    verifyAuth();
  }, [router]);

  async function verifyAuth() {
    setAuthVerifying(true)
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/verify-auth`, {
      headers: {
        'Authorization': token ?? '',
      }
    });
    const json = await res.json();
    if (json?.authenticated === true) {
      setUser(json);
      setAuthVerifying(false)
    } else {
      router.push('sign-in');
    }
  }
  
  if (authVerifying) {
    return <div>Verifying user...</div>;
  }

  const handleKeyDown = (event:any) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handlePrompt();
    } else if (event.key === 'Enter' && event.shiftKey) {
      setPrompt((prevValue:string) => prevValue + "\n");
  }
  };

  const handlePrompt = async () => {
    setPrompt("")
    setMessages((prevMessages:Prompt[]) => [...prevMessages, {from: user?.username, content: prompt}])
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/chat-here/invoke`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ?? '',
        },
        body: JSON.stringify({input:{prompt}, config: {}}),
      });

      if (!response.ok) {
        verifyAuth()
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();

      setMessages((prevMessages:Prompt[]) => [...prevMessages, {from:"PromptiorBot", content:result.output}]);
    } catch (error:any) {
      setError(error.message);
      alert("Ups! Error...") 
    } finally {
      setIsLoading(false)
    }
  };

  return (
  <>
    <Stack spacing={{ xs: 1, sm: 2 }} pb={20} direction="column" useFlexGap flexWrap="wrap">
      {messages.length === 0 && (
          <Box sx={{paddingY:20}}>
          <h1>Hi, I&apos;m PromptiorBot!</h1>
          <h3>You can ask me about Promptior...</h3>
          <p>Type your answers in the text field on the bottom of the screen</p>
          </Box>
        )}
      {!isLoading?(
        <List>
        {messages?.map((message:Prompt, index:number) => (
          <ListItem key={index}>
            <ListItemAvatar>
                { message.from !== "PromptiorBot" ? (
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                ): <Avatar src="https://www.promptior.ai/assets/promptior-icon-f9f2bdd1.webp" />}
            </ListItemAvatar>
            <ListItemText primary={`${message.from}:`} secondary={message.content} />
          </ListItem> 
        ))}
      </List>
      ):(<h3>Loading...</h3>)
      }
     </Stack>
      <Stack component={Paper} elevation={0} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: "35px" }} spacing={2} direction="row">
      <TextField 
          value={prompt} 
          fullWidth
          multiline
          onChange={(e) => setPrompt(e.target.value)} 
          id="" 
          label="Ask something about Promptior" 
          variant="outlined" 
          onKeyDown={handleKeyDown}
        />   
      <ButtonGroup variant="outlined">
        <LoadingButton onClick={() => handlePrompt()} loading={isLoading} loadingPosition="start" startIcon={<SendIcon />}>
          Send
        </LoadingButton>
      </ButtonGroup>
    </Stack>
    </>
  );
}
