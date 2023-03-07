import { level } from "../Test";
import { Typography, ThemeProvider } from "@mui/material";
import theme from "../Theme";

const Dashboard = () => {
  return (
    <div>
    
      <ThemeProvider theme={theme}>
      <h2>{level[0]} + {level[1]} + {level[2]}</h2>
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
    </div>
  );
};

export default Dashboard;
