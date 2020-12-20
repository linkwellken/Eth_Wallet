import React, {useEffect, useState} from 'react';
import { getWallet, getWeb3 } from './utils';
import Header from './Header'
import NewTransfer from './NewTransfer'
import TransferList from './TransferList'
import Approvals from './ApproverList'

function App() {
  const [web3, setWeb3] = useState(undefined)
  const [accounts, setAccounts] = useState(undefined)
  const [wallet, setWallet] = useState(undefined)
  const [approvers, setApprovers] = useState([])
  const [quorum, setQuorum] = useState(undefined)
  const [transfers, setTransfers] = useState([])
  const [approver, setApprover] = useState([])


  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await getWallet(web3);
      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();
      const transfers = await wallet.methods.getTransfers().call()
      const approver = await wallet.methods.ApproverList().call()
      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet)
      setApprovers(approvers)
      setQuorum(quorum);
      setTransfers(transfers)
      setApprover(approver)
    } 
    init();

  }, [])

  const createTransfer =  (transfer) =>  {
    wallet.methods 
      .createTransfer(transfer.amount, transfer.to)
      .send({from: accounts[0]}).on('transactionHash', (hash) => {
        window.location.reload()
      })
  }

  const approveTransfer = (transferId) => {
    wallet.methods
      .approveTransfer(transferId)
      .send({from: accounts[0]}).on('transactionHash', (hash) => {
        window.location.reload()
      })
  }

  const ApproverList = (approver) => {
    wallet.methods.ApproverList(approver).call();
  }


  if(
    typeof web3 === 'undefined' 
    || typeof accounts === 'undefined' 
    || typeof wallet === 'undefined'
    || typeof approvers === 'undefined'
    || typeof quorum === 'undefined') 
  {
    return <div>Loading...</div>
  
  }
  console.log(approver);
  return (
    <div>   
      <h3 >Multisig Dapp</h3>
      <Header approvers={approvers} quorum={quorum} />
      <NewTransfer createTransfer={createTransfer} />
      <TransferList transfers={transfers} approveTransfer={approveTransfer} approvers={approvers} ApproverList={ApproverList} approver={approver}/>
      <Approvals approvers={approvers} ApproverList={ApproverList} approver={approver}/>
    </div>
  );
}

export default App;

