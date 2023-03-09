import { level } from "../Test";
import { Typography, ThemeProvider, Modal, Box, Button, Container } from "@mui/material";
import theme from "../Theme";
import * as React from 'react';
import {useAuth0} from '@auth0/auth0-react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

let firstRun = true;

const Dashboard = () => {

  const [account, setAccount] = React.useState(false);
  const [openNew, setOpenNew] = React.useState(false);
  const [openTested, setOpenTested] = React.useState(false);
  const handleOpenNew = () => {setOpenNew(true)};
  const handleOpenTested = () => {setOpenTested(true)};
  const handleCloseNew = () => {
    setOpenNew(false);
    setAccount(true);
  };
  const handleCloseTested = () => {
    setOpenTested(false);
    setAccount(true);
  }

  const CreateAccount = () => {
    const {loginWithRedirect} = useAuth0();
    return(
      <div>

    <Typography variant="h3">
      We're all set to get you on your chess improvement journey. To save your results and keep the training personalized, please create an account.
    </Typography>
    <Button variant="contained" onClick={() => loginWithRedirect()}>Create Account</Button>
    </div>
    )
  }

  if(level[0]===0 && firstRun) {
    handleOpenNew();
    
  }
  else if(level[0]===1 && firstRun) {
    handleOpenTested();
  }
  firstRun=false;

  return (
    <div>
  <Box sx={{bgcolor: '#cfe8fc', height: '100vh'}}>
    {account ? <CreateAccount /> : null}
      <Modal
        open={openNew}
        onClose={handleCloseNew}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Welcome, new player!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Click out of this to open your dashboard and start learning!
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={openTested}
        onClose={handleCloseTested}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Thanks for completing the test! Here are your results: 
          </Typography>
        <ThemeProvider theme={theme}>

        {level[0] === 0 ? (
          <Typography>You are new to chess.</Typography>
        ) : (
          <Typography>You know the rules of chess.</Typography>
        )}
        <Typography>You got {level[1]} puzzles correct in the test.</Typography>
        {level[2][0] === 0 ? (
          <Typography>Mate in one level: 0/10</Typography>
        ) : (
          <Typography>Mate in one level: 10/10</Typography>
        )}
        {level[2][1] === 0 ? (
          <Typography>Fork/Double Attack Level: 0/10</Typography>
        ) : (
          <Typography>Fork/Double Attack Level: 10/10</Typography>
        )}
        {level[2][2] === 0 ? (
          <Typography>Discovered attack level: 0/10</Typography>
        ) : (
          <Typography>Discovered attack level: 10/10</Typography>
        )}
        {level[2][3] === 0 ? (
          <Typography>Discovered check level: 0/10</Typography>
        ) : (
          <Typography>Discovered check level: 10/10</Typography>
        )}
      </ThemeProvider> 
        </Box>
      </Modal>
    </Box>
    </div>
  );
};

export default Dashboard;
