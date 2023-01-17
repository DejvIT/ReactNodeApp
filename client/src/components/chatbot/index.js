import React, { useContext } from 'react';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import Fab from '@material-ui/core/Fab';
import Snackbar from '@material-ui/core/Snackbar';
import SendIcon from '@material-ui/icons/Send';
import InputBase from '@material-ui/core/InputBase';

import ChatbotMessage from "./ChatbotMessage";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import {useSelector} from "react-redux";
import {WebSocketContext} from "../../sockets/chatbot";

export default function Chatbot({currentUser}) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    vertical: 'bottom',
    horizontal: 'right',
  });
  const [newMessage, setNewMessage] = React.useState("");
  const chats = useSelector(state => state.chatbot.chatLog);
  const ws = useContext(WebSocketContext);

  const { vertical, horizontal } = state;

  React.useEffect(() => {
    console.log('zmenili se inputy', document.getElementById('chatbotMessageBox'))
    const chatWindow = document.getElementById('chatbotMessageBox');
    if (chatWindow !== null) {
      chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight;
    }
  }, [chats])

  const handleClose = () => {
    setOpen(false);
  }

  const onChangeNewMessage = (e) => {
    setNewMessage(e.target.value)
  }

  const sendMessage = () => {
    if (newMessage && newMessage !== "" && currentUser) {
      ws.sendMessage(currentUser.id, { message: newMessage });
      setNewMessage("");
    }
  }

  return (
    <div className="d-inline-block">
      <Fab
        color="primary"
        size="small"
        aria-label="add"
        aria-controls="chatbot-menu"
        onClick={() => setOpen(!open)}
        style={{ position: "fixed", bottom: 10 + "px", right: 25 + "px" }}
      >
        <SpeakerNotesIcon />
      </Fab>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical, horizontal }}
        style={{ bottom: 55 + 'px' }}
        className="chatbot"
        message={
          (<div className="container-fluid">
            <div className="row">
              <div className="col-6">
                <span style={{ verticalAlign: "sub" }}>Chatbot</span>
              </div>
              <div className="col-6 text-right">
                <IconButton aria-label="delete" onClick={handleClose} className="p-0 text-white" style={{ verticalAlign: "super" }}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <div id="chatbotMessageBox" className="row mx-0 messages">
              <div className="col-12">
                <ChatbotMessage key={0} type="bot" message="Dobrý den, jak vám můžu pomoci?" />
                {chats.map(chat => (
                  <ChatbotMessage key={chat.id} type={chat.user_id ? "user" : "bot"} message={chat.message} />
                ))}
              </div>
            </div>
            <div className="row">
              <div className="col-12 pr-0">
                <InputBase
                  placeholder="Poslat zprávu..."
                  multiline={true}
                  inputProps={{ 'aria-label': 'search google maps' }}
                  className="text-white"
                  style={{ width: "calc(100% - 48px)" }}
                  value={newMessage}
                  onChange={onChangeNewMessage}
                />
                <IconButton
                  type="submit"
                  aria-label="search"
                  className="text-white"
                  onClick={sendMessage}
                >
                  <SendIcon />
                </IconButton>
              </div>
            </div>
          </div>)
        }
      />
    </div>
  );
}

//<Fab color="secondary" className={classes.fab}>
//           <AddIcon />
//         </Fab>
//         <Snackbar
//           open
//           autoHideDuration={6000}
//           message="Archived"
//           action={
//             <Button color="inherit" size="small">
//               Undo
//             </Button>
//           }
//           className={classes.snackbar}
//         />