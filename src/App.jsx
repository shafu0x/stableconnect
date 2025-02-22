import { useAccount } from "wagmi";
import { base } from "viem/chains";
import "./App.css";
import { usePrivy } from "@privy-io/react-auth";
import { useSmartWallets } from "@privy-io/react-auth/smart-wallets";

function App() {
  const { login, logout, ready, authenticated, user } = usePrivy();

  const { address } = useAccount();
  const { client } = useSmartWallets();

  const handleSign = async () => {
    const uiOptions = {
      title: "Sample title text",
      description: "Sample description text",
      buttonText: "Sample button text",
    };
    const request = {
      message: "Hello world",
    };
    const signature = await client.signMessage(request, { uiOptions });
    console.log("Signature:", signature);
  };

  const handleSendTransaction = async () => {
    const uiOptions = {
      title: "Sample title text",
      description: "Sample description text",
      buttonText: "Sample button text",
    };
    const transactionRequest = {
      chain: base,
      to: "0xa94927442F5E8d313e7a8199f862D0C5D1c4E76C",
      value: 10000000000000000,
    };
    const txHash = await client.sendTransaction(transactionRequest, {
      uiOptions,
    });
    console.log("Transaction hash:", txHash);
  };

  console.log("address", address);
  console.log("ready", ready);
  console.log("authenticated", authenticated);
  console.log("user", user);
  const disableLogin = !ready || (ready && authenticated);

  return (
    <div>
      {!authenticated ? (
        <button disabled={disableLogin} onClick={login}>
          Log in
        </button>
      ) : (
        <>
          <button onClick={logout}>Log out</button>
          <button onClick={handleSign}>Sign Message</button>
          <button onClick={handleSendTransaction}>Send Tx</button>
        </>
      )}
    </div>
  );
}

export default App;
