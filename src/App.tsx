import { useCallback } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import {  
  useSendTransaction,  
  useWaitForTransactionReceipt  
} from "@permissionless/wagmi"

// function App() {
//   const account = useAccount()
//   const { connectors, connect, status, error } = useConnect()
//   const { disconnect } = useDisconnect()

//   return (
//     <>
//       <div>
//         <h2>Account</h2>

//         <div>
//           status: {account.status}
//           <br />
//           addresses: {JSON.stringify(account.addresses)}
//           <br />
//           chainId: {account.chainId}
//         </div>

//         {account.status === 'connected' && (
//           <button type="button" onClick={() => disconnect()}>
//             Disconnect
//           </button>
//         )}
//       </div>

//     </>
//   )
// }


function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  const {
    sendTransaction,
    data: transactionReference,
    isPending
  } = useSendTransaction()
  
  const { data: receipt, isPending: isReceiptPending } =
    useWaitForTransactionReceipt({
      id: transactionReference
    })
 
  const sendTransactionCallback = useCallback(async () => {
    console.log("Sending transaction...")
    sendTransaction({
      to: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
      data: "0x1234"
    })
  }, [sendTransaction])
 


  return (
    <>
        <h2>Account</h2>
        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>
        <div style={{ marginTop: 60 }}>

         {account.status === 'connected' && (
           <button type="button" onClick={() => disconnect()}>
             Disconnect
           </button>
         )}

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>


      <h2>Send test transaction</h2>

 
      {isPending && <div>Sending transaction...</div>}
 
      {transactionReference && (
        <div>Awaiting confirmation: {transactionReference}</div>
      )}
 
      {receipt && <div>{receipt.status}</div>}
 
      <button onClick={sendTransactionCallback} type="button">
        Send Transaction
      </button>
    </div>
    </>
  )
}

export default App