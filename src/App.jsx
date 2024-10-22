import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Box, Button, Input, InputGroup, Stack } from "@chakra-ui/react";
import ABI from "./abi.json";

const Dojo = () => {
  const [texto, setTexto] = useState("");
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const CONTRACT_ADDRESS = "0x0e736a5c39B7Cdf798cdd2A3fa7d88Cf4f07804e";

  // Função atualizada para formatar a mensagem com a estrutura específica
  const formatMessage = (blockchainMessage) => {
    try {
      // Verifica se é um array válido e tem a estrutura esperada
      if (Array.isArray(blockchainMessage) && 
          blockchainMessage.length > 0 && 
          Array.isArray(blockchainMessage[0]) && 
          blockchainMessage[0].length >= 3) {
        
        // A mensagem está na posição 2 do array interno
        return {
          address: blockchainMessage[0][0],
          timestamp: new Date(blockchainMessage[0][1] * 1000).toLocaleString(),
          message: blockchainMessage[0][2]
        };
      }
      return { message: "Nenhuma mensagem encontrada" };
    } catch (error) {
      console.error("Erro ao formatar mensagem:", error);
      return { message: "Erro ao formatar mensagem" };
    }
  };

  async function mostrarTexto() {
    if (!texto) return;
    setLoading(true);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.sendMessage(texto);
      await tx.wait(); // Espera a transação ser minerada

      // Busca a mensagem atualizada
      const getMessage = await contract.getLatestMessages(1);
      console.log("Mensagem recebida:", getMessage);
      
      const formattedMessage = formatMessage(getMessage);
      setOutput(formattedMessage.message); // Exibe apenas a mensagem
      setTexto(""); // Limpa o input após envio
    } catch (err) {
      console.error("Erro ao enviar mensagem:", err);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function getTexto() {
    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const messages = await contract.getLatestMessages(1);
      console.log("Mensagens recuperadas:", messages);
      
      const formattedMessage = formatMessage(messages);
      setOutput(formattedMessage.message); // Exibe apenas a mensagem
    } catch (err) {
      console.error("Erro ao buscar mensagens:", err);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        await getTexto();
      }
    };
    
    init();
  }, []);

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
        {loading ? "Carregando..." : output}
      </Box>
      <Stack spacing={2}>
        <InputGroup>
          <Input
            placeholder="Send text"
            onChange={(e) => setTexto(e.target.value)}
            value={texto}
            bg="white"
            disabled={loading}
          />
        </InputGroup>
        <Button 
          size="lg" 
          onClick={mostrarTexto}
          isLoading={loading}
          disabled={!texto || loading}
        >
          Update
        </Button>
      </Stack>
      {message && (
        <Box color="red" mt={2}>
          {message}
        </Box>
      )}
      <Stack>
        <ConnectButton />
      </Stack>
    </div>
  );
};

export default Dojo;