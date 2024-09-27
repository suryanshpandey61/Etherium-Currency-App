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
    } from "./constants";

    export const TOKEN_ICO_CONTRACT = React.createContext();

    export const TOKEN_ICO_Provider = ({children}) => {
        const DAPP_NAME = "Token ICO Dapp";
        const currency = "ETH";
        const network = "Holesky";

        const [loader,setLoader] = useState(false);
        const [aacount,setAccount] = useState();
        const [count,setCount] = useState(0);

        const notifySuccess = (msg) => toast.success(msg, {duration:2000});
        const notifyError = (msg) => toast.error(msg,{duration:2000});

        const TOKEN_ICO = async () => {
            try{

            }
            catch(error){
                console.log(error);
            }
        }
    } 

