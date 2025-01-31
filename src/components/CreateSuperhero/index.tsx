import React, { useState } from "react";
import { TextField, Button, Slider, Typography, Container, Paper } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./style.css";

const comic = createTheme({
  typography: {
    fontFamily: '"Bangers", cursive, sans-serif',
  },
});

interface Superhero {
  name: string;
  superpower: string;
  humility: number;
}

const AddSuperhero: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [superpower, setSuperpower] = useState<string>("");
  const [humility, setHumility] = useState<number>(5);

  const handleSubmit = () => {
    const newHero: Superhero = { name, superpower, humility };
    console.log("New Superhero:", newHero);
    setName("");
    setSuperpower("");
    setHumility(5);
  };

  return (
    <ThemeProvider theme={comic}>
      <Container maxWidth="sm" style={{ marginTop: "20px" }}>
        <Paper elevation={0} className="form-container" style={{ padding: "20px", borderRadius: "16px"  }}>
          <Typography variant="h5" gutterBottom>
            Add a New Superhero
          </Typography>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Superpower"
            value={superpower}
            onChange={(e) => setSuperpower(e.target.value)}
            margin="normal"
          />
          <Typography gutterBottom>Humility Score</Typography>
          <Slider
            value={humility}
            onChange={(_, newValue) => setHumility(newValue as number)}
            step={1}
            marks
            min={1}
            max={10}
            valueLabelDisplay="auto"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginTop: "20px" }}
            fullWidth
          >
            Add Superhero
          </Button>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default AddSuperhero;
