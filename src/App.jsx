import React, { useState } from "react";
import "./App.css"; // Importando o CSS
import { getMetamaskProvider } from "./metamaskService";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Box, Button, Input, InputGroup, Stack } from "@chakra-ui/react";

const Dojo = () => {
  const [texto, setTexto] = useState("");
  const [output, setOutput] = useState("");

  const mostrarTexto = () => {
    setOutput(texto);
  };

  return (
    <div className="papel">
      <Box
        bg="white"
        w="50%"
        h="20%"
        p={4}
        marginTop={10}
        id="outputText"
        color="black"
        rounded={10}
      >
        {output}
      </Box>
      <Stack spacing={2}>
        <InputGroup>
          <Input
            placeholder="Send text"
            onChange={(e) => setTexto(e.target.value)}
            value={texto}
            bg="white"
          />
        </InputGroup>
        <Button size="lg" onClick={mostrarTexto}>
          Update
        </Button>
      </Stack>
      <Stack>
        <ConnectButton />
      </Stack>
    </div>
  );
};

export default Dojo;
