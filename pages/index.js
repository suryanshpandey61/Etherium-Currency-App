import React, { useState, useEffect, useContext } from "react";
import {
  Footer,
  Header,
  About,
  Brand,
  Contact,
  Faq,
  Features,
  Hero,
  Loader,
  Progress,
  SideBar,
  Team,
  Token,
  TokenInfo,
  Roadmap,
  Popup,
  TransferToken,
  Owner,
  TransferCurrency,
  Donate,
  UpdatePrice,
  UpdateAddress,
} from "../Components/index";

import { TOKEN_ICO_CONTEXT } from "../context/index";
import { shortAddress } from "../Utils/index";

const Index = () => {
  const {
    TOKEN_ICO,
    BUY_TOKEN,
    TRANSFER_ETHER,
    DONATE,
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
    loader,
    account,
    currency,
  } = useContext(TOKEN_ICO_CONTEXT);

  const [ownerModel, setOwnerModel] = useState(false);
  const [buyModel, setBuyModel] = useState(false);
  const [transferModel, setTransferModel] = useState(false);
  const [transferCurrencyModel, setTransferCurrency] = useState(false);
  const [openDonate, setOpenDonate] = useState(false);
  const [openUpdatePrice, setOpenUpdatePrice] = useState(false);
  const [details, setDetails] = useState();

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      const items = await TOKEN_ICO();
      setDetails(items);
    };
    fetchData();
  }, [TOKEN_ICO]); // Include TOKEN_ICO in dependency array if it can change

  return (
    <>
      <div className="body-wrap">
        {ownerModel && <Owner setOwnerModel={setOwnerModel} />}
        {/* Other components can be added here */}
      </div>
    </>
  );
};

export default Index;
