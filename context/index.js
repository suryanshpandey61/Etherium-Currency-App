import React ,{useState} from  "react";
import { ethers } from "ethers";
import toast from "react-hot-toast";

import {
    CHECK_WALLET_CONNECTED,
    CONNECT_WALLET,
    changeNetwork,
    handleNetworkSwitch,
    TOKEN_ICO_CONTRACT,
    ERC20,
    ERC20_CONTRACT,
    GET_BALANCE,
    CHECK_ACCOUNT_BALANCE,
    addtokenToMetaMask,
    TOKEN_ADDRESS,
    } from "./constants";


    export const TOKEN_ICO_CONTEXT = React.createContext();

    export const TOKEN_ICO_Provider = ({children}) => {
        const DAPP_NAME = "Token ICO Dapp";
        const currency = "ETH";
        const network = "Holesky";

        const [loader,setLoader] = useState(false);
        const [account,setAccount] = useState();
        const [count,setCount] = useState(0);

        const notifySuccess = (msg) => toast.success(msg, {duration:2000});
        const notifyError = (msg) => toast.error(msg,{duration:2000});

        // Contract function 

        const TOKEN_ICO = async () => {
            try{
                 setLoader(true);
                 const address = await CHECK_WALLET_CONNECTED();
                 if(address){
                    
                    setAccount(address);

                    const contract = await TOKEN_ICO_CONTRACT();
                    const tokenDetails = await contract.getTokenDetails();

                    const contractOwner = await contract.owner();
                    const soldTokens = await contract.soldTokens();

                    const ethBal = await GET_BALANCE();

                    const token = {
                        tokenBal : ethers.utils.formatEther(tokenDetails.balance.toString()),
                        name:tokenDetails.name,
                        symbol:tokenDetails.symbol,
                        supply: ethers.utils.formatEther(tokenDetails.supply.toString()),
                        tokenPrice: ethers.utils.formatEther(tokenDetails.tokenPrice.toString()),
                        tokenAddr: tokenDetails.tokenAddr,
                        maticBal: ethBal,
                        address:address.toLowerCase(),
                        owner:contractOwner.toLowerCase(),
                        soldTokens:soldTokens.toNumber(),

                    }

                    setLoader(false);
                    return token;

                 }
            }
            catch(error){
                console.log(error);
            }
        }

        
        const BUY_TOKEN = async (amount) => { 
            try{
                setLoader(true);
                const address = await CHECK_WALLET_CONNECTED();
                if(address){
                  
                   
                   const tokenDetails = await contract.getTokenDetails();

                   const contract = await TOKEN_ICO_CONTRACT();
                   const availableToken = ethers.utils.formatEther(tokenDetails.balance.toString());

                   if(availableToken>1){
                    const price = ethers.utils.formatEther(tokenDetails.tokenPrice.toString());

                    const payAmount = ethers.utils.parseUnits(price.toString(),"ethers");

                    const transaction = await contract.buyToken(Number(account),{
                        value: payAmount.toString(),
                        gasLimit : ethers.utils.hexlify(8000000)

                    })

                    
                   await transaction.wait();
                   notifySuccess("Transcation completed successfully");
                   window.location.reload();
                   }


                  

                   setLoader(false);
                   return token;

                }
            }
            catch(error){
                console.log(error);
                notifyError("Error while buy the token");
                setLoader(false);
            }
        }

        
        const TOKEN_WITHDRAW = async () => {
            try{
                setLoader(true);
                const address = await CHECK_WALLET_CONNECTED();
                if(address){
                    const tokenDetails = await contract.getTokenDetails();

                    const contract = await TOKEN_ICO_CONTRACT();
                    const availableToken = ethers.utils.formatEther(tokenDetails.balance.toString());

                    if(availableToken>1){
    
                        const transaction = await contract.withdrawAllTokens();
    
                        
                       await transaction.wait();
                       notifySuccess("Token withdraw successfully");
                       window.location.reload();
                       }
                }
            }
            catch(error){
                console.log(error);
                notifyError("Error in token withdraw")
                setLoader(false);
            }
        }

        
        const UPDATE_TOKEN = async (_address) => {
            try{
                setLoader(true);
                const address = await CHECK_WALLET_CONNECTED();

                if(address){

                    const contract = await TOKEN_ICO_CONTRACT();
                    const transaction = await contract.updateToken(_address);
        
                    await transaction.wait();
                    notifySuccess("Update token  successfully");
                    window.location.reload();
                       
                }

            }
            catch(error){
                console.log(error);
                notifyError("Error to update the token")
            }
        }

        
        const UPDATE_TOKEN_PRICE = async (price) => {
            try{
                setLoader(true);
                const address = await CHECK_WALLET_CONNECTED();

                if(address){

                    const contract = await TOKEN_ICO_CONTRACT();
                    const payAmount = ethers.utils.parseUnits(price.toString(),"Ether");

                    const transaction = await contract.updateTokenSalePrice(payAmount);
        
                    await transaction.wait();
                    notifySuccess("Update token price  successfully");
                    window.location.reload();
                       
                }
            }
            catch(error){
                console.log(error);
                notifyError("Error while update the token price")
            }
        }

        
        const DONATE = async (AMOUNT) => {
            try{
                setLoader(true);
                const address = await CHECK_WALLET_CONNECTED();

                if(address){

                    const contract = await TOKEN_ICO_CONTRACT();
                    const payAmount = ethers.utils.parseUnits(price.toString(),"Ether");

                    //we will call transferToOwner() bcoz amount will transfer to owner
                    const transaction = await contract.transferToOwner(payAmount,{
                        value:payAmount.toString(),
                        gasLimit: ethers.utils.hexlify(8000000)
                    });
        
                    await transaction.wait();
                    notifySuccess("Donate token  successfully");
                    window.location.reload();
                       
                }
            }
            catch(error){
                console.log(error);
                notifyError("error while donate the token")
            }
        }

        
        const TRANSFER_ETHER = async (transfer) => {
            try{
                setLoader(true);
                const {_reciever,_amount} = transfer;
                const address = await CHECK_WALLET_CONNECTED();

                if(address){

                    const contract = await TOKEN_ICO_CONTRACT();
                    const payAmount = ethers.utils.parseUnits(_amount.toString(),"Ether");

                    const transaction = await contract.transferEther(_reciever,payAmount,{
                        value:payAmount.toString(),
                        //8 then six zero hai
                        gasLimit: ethers.utils.hexlify(8000000)
                    });
        
                    await transaction.wait();
                    notifySuccess("Transfer ether  successfully");
                    window.location.reload();
                       
                }
            }
            catch(error){
                console.log(error);
            }
        }

        
        const TRANSFER_TOKEN = async (transfer) => {
            try{
                setLoader(true);
                const {_tokenAddress,_amount,_sendTo} = transfer;
                const address = await CHECK_WALLET_CONNECTED();

                if(address){

                    const contract = await ERC20_CONTRACT(_tokenAddress);
                    const payAmount = ethers.utils.parseUnits(_amount.toString(),"Ether");

                    const transaction = await contract.transfer(_sendTo,payAmount,{
                        
                        //8 then six zero hai
                        gasLimit: ethers.utils.hexlify(8000000)
                    });
        
                    await transaction.wait();
                    notifySuccess("Transfer  token  successfully");
                    window.location.reload();
                       
                }
            }
            catch(error){
                console.log(error);
                notifyError("Error while tranfer the token");
            }
        }

        return <TOKEN_ICO_CONTEXT.Provider
                 value={{
                    TOKEN_ICO,
                    BUY_TOKEN,
                    TRANSFER_ETHER,
                    DONATE,
                    TRANSFER_TOKEN,
                    UPDATE_TOKEN,
                    UPDATE_TOKEN_PRICE,
                    TOKEN_WITHDRAW,
                    TRANSFER_TOKEN,
                    CONNECT_WALLET,
                    ERC20,
                    CHECK_ACCOUNT_BALANCE,
                    setAccount,
                    setLoader,
                    addtokenToMetaMask,
                    TOKEN_ADDRESS,
                    account,
                    loader,
                    account,
                    currency,
                    

                 }}
        >
         {children}
        </TOKEN_ICO_CONTEXT.Provider>
    } 

