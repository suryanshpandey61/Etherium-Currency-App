import React,{useState,useEffect} from "react";


const Header = ({ 
  account,
  setLoader,
  CONNECT_WALLET,
  details,
  setAccount,
  setOwnerModel,
  shortAddress,
  currency,
  ownerModel
}) => {

  const[isMetaMaskInstalled,setIsMetaMaskInstall] = useState(false);

  const connectWallet = async () => {
    setLoader(true);
    const address = await CONNECT_WALLET();
    setAccount(address);
  }

  useEffect(()=> 
  {
    if(typeof window.ethereum !== "undefined"){
      setIsMetaMaskInstall(true);
      window.ethereum.on("account changed",handleAccountsChanged);
    }

    return()=> {
      if(typeof window.ethereum !== "undefined"){
        window.ethereum.removeListener("accountsChanges",handleAccountsChanged);
      }
    }
  },[])

  const handleAccountsChanged = (account) => {
    setAccount(account[0]);
  }

  const connectMetaMask = async () => {
    if(typeof window.ethereum !== "undefined"){
      try{
        const account= await window.ethereum.request({
          method:"eth_requestAccount",
        })
        setAccount(account[0]);
      }catch(err){
            console.log(err);
      }
      
    }
    else{
      console.log("MetaMask Can not installed")
    }
  }

  return (
    <header className="site-header header--transparent ico-header ">
      <div className="header_main-wrap">
        <div className="container mxw_1640">
          <div className="header_main ul_li_between">
            <div className="header_left ul_li" >
              <div className="header__logo">
              <a href="/">
              
              <img src="assets/img/logo/logo.svg" alt="anshuu" />
             </a>
              </div>
            

            </div>
            <div className="main-menu__wrap ul_li navbar navbar-expand-xl">
              <nav className="main-menu collapse navbar-collapse">
                <ul>
                  <li className="active has-mega-menu">
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a className="scrollspy-btn" href="#about">About</a>
                  </li>
                  <li>
                    <a className="scrollspy-btn" href="#roadmap">RoadMap</a>
                  </li>
                  <li>
                    <a className="scrollspy-btn" href="#team">Team</a>
                  </li>
                  <li>
                    <a className="scrollspy-btn" href="#faq">Faq</a>
                  </li>
                  <li>
                    <a className="scrollspy-btn" href="#contact">Contact</a>
                  </li>
                  <li >
                    <a className="scrollspy-btn" 
                    style={{cursor:"pointer",

                    }}
                    onClick={()=> ownerModel ? setOwnerModel(false) : setOwnerModel(true)}>Tools</a>
                  </li>

                </ul>
              </nav>
            </div>

            <div className="header__action ul_li">
              <div className="d-xl-none">
                <a className="header__bar hamburger_menu">
                  <div className="header__bar-icon">
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                  </div>
                </a>
              </div>
              {
                account ?( <div className="header__account">
                  <a onClick={()=> navigator.clipboard.writeText(details?.address)}>
                    
                       {shortAddress(details?.address)} : {" "} 
                       {details?.maticBal?.slice(0,6)}
                       {currency}
                    
                  </a>
                </div>) : (<div className="header__acount">
                                <a className="thm-btn" onClick ={()=> connectWallet(true)}>Connect  Wallet</a>
                          </div>)
              }
           </div>
            
          </div>

         
           

        </div>

      </div>

    </header>
  )
};

export default Header;
