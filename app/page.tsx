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
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type Prompt = {
  from:string;
  content:string;
}

export default function Home() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [messages, setMessages] = React.useState<any>([])
  const [prompt, setPrompt] = React.useState<string>("")

 const handlePrompt = async () => {
    setPrompt("")
    setMessages((prevMessages:Prompt[]) => [...prevMessages, {from:"You", content:prompt}])
    setIsLoading(true);

    try {
      const chain = new RemoteRunnable({
        url: `${process.env.NEXT_PUBLIC_API}/chat-here/`,
      });

      const result = await chain.invoke({ input: prompt, config: {} });

      setMessages((prevMessages:Prompt[]) => [...prevMessages, {from:"Promptior", content:result}]);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <>
    <Stack spacing={{ xs: 1, sm: 2 }} pb={20} direction="column" useFlexGap flexWrap="wrap">  
      {!isLoading?(
        <List>
        {messages?.map((message:Prompt, index:number) => (
          <ListItem key={index}>
            <ListItemAvatar>
                { message.from === "You" ? (
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
      <TextField value={prompt} fullWidth multiline onChange={(e) => setPrompt(e.target.value)} id="" label="Ask something about Promptior" variant="outlined" />   
      <ButtonGroup variant="outlined">
        <LoadingButton onClick={() => handlePrompt()} loading={isLoading} loadingPosition="start" startIcon={<SendIcon />}>
          Send
        </LoadingButton>
      </ButtonGroup>
    </Stack>
    </>
  );
}
