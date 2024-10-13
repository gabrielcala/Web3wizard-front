import React, { useState } from 'react';
import './App.css'; // Importando o CSS

const Dojo = () => {
    const [texto, setTexto] = useState('');
    const [output, setOutput] = useState('');

    const mostrarTexto = () => {
        setOutput(texto);
    };

    return (
        <div className="papel">
            <div className="output" id="outputText">{output}</div>
            <input
                type="text"
                id="campo"
                name="campo"
                style={{ height: '30px' }}
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
            />
            <br /><br />
            <button onClick={mostrarTexto} type="button">Update</button>
        </div>

    );

    
};

export default Dojo;
