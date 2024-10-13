import Web3 from "web3";

export async function getMetamaskProvider() {
    if(!window.ethereum) throw new Error(`Metamask not detected`);

    const web3 = new Web3(window.ethereum);

    const accounts = await web3.eth.requestAccounts();
    if(!accounts || !accounts.length) throw new Error(`Permission required`);

    return web3;
}