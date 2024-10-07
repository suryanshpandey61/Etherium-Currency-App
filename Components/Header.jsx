
import React, {useEffect,useState}from "react";
const Header = ({
  TOKEN_ICO,
  account,
  setLoader,
  CONNECT_WALLET,
  DISCONNECT_WALLET,
  setAccount,
  setOwnerModel,
  shortAddress,
  currency,
  ownerModel,
}) => {
  const [details, setDetails] = useState();
  const [isMetaMaskInstalled, setIsMetaMaskInstall] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    setLoader(true);
    const address = await CONNECT_WALLET();
    if (address) {
      setAccount(address);
      setIsConnected(true);
    }
  };

  const disconnectWallet = () => {
    alert("Please disconnect your wallet from MetaMask if you wish to log out.");
    DISCONNECT_WALLET(setAccount);
    setIsConnected(false);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (account) {
        console.log("Fetching data...");
        const items = await TOKEN_ICO();
        setDetails(items);
      } else {
        setDetails(null);
      }
    };

    fetchData();
  }, [account]);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setIsMetaMaskInstall(true);
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, []);

  const handleAccountsChanged = (account) => {
    if (account.length === 0) {
      setAccount(null);
      setIsConnected(false);
    } else {
      setAccount(account[0]);
      setIsConnected(true);
    }
  };

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <header className="site-header header--transparent ico-header">
      <div className="header_main-wrap">
        <div className="container mxw_1640">
          <div className="header_main ul_li_between">
            <div className="header_left ul_li">
              <div className="header__logo">
                <a href="/">
                  <img src="assets/img/logo/logo.svg" alt="anshuu" />
                </a>
              </div>
            </div>
            <div className="main-menu_wrap ul_li navbar navbar-expand-xl">
              <nav className="main-menu collapse navbar-collapse">
                <ul>
                  <li className="active has-mega-menu">
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a className="scrollspy-btn" href="#about">About</a>
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
                  <li>
                    <a
                      className="scrollspy-btn"
                      style={{ cursor: "pointer" }}
                      onClick={() => (ownerModel ? setOwnerModel(false) : setOwnerModel(true))}
                    >
                      Tools
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="header__action ul_li">
              <div className="d-xl-none">
                <a className="header__bar hamburger_menu">
                  <div className="header__bar-icon">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </a>
              </div>
              {account ? (
                <div 
                  className="header__account connect-wlt-btn" 
                  onMouseEnter={handleMouseEnter} 
                  onMouseLeave={handleMouseLeave}
                >
                  <a onClick={() => navigator.clipboard.writeText(details?.address)}>
                    {shortAddress(details?.address)} : {details?.maticBal?.slice(0, 6)}
                    {currency}
                  </a>
                  {dropdownOpen && (
                    <div className="dropdown-menu">
                      <button onClick={disconnectWallet} className="thm-btn">Disconnect</button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="header__account connect-wlt-btn">
                  <a className="thm-btn" onClick={connectWallet}>Connect Wallet</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
