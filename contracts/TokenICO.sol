// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ERC20{
    // function kiss type ka data return and with variable name 

    function transfer(address recipient,uint256 amount) external returns(bool);
    function balanceOf(address account) external view returns(uint256);
    function allowance(address owner,address spender) external view returns(uint256);
    function approve(address spender,uint256 amount) external view returns(bool);
    function transferFrom(address sender,address recipient,uint256 amount) external returns(bool);
    function symbol() external view returns(string memory);
    function totalSupply() external view returns(uint256);
    function name() external view returns(string memory);
}

// name of the contract TokenICO By user according you can change
contract TokenICO{
    //state variable
    address public owner;
    address public tokenAddress;
    uint256 public tokenSalePrice;
    uint256 public soldTokens;

    //modifiers :=modifiers are used to restrict function sirf limited log call kr skte hai function
    // onlyOwner can call these function
    modifier onlyOwner(){
        require(msg.sender == owner,"Only contract owner can perform this action");
    //    _ opertaor is used to check that condition is true the execute the following fn()
        _;
    }

    // constructor design
    constructor(){
       owner = msg.sender; 
    }

    // public onlyOwner() menas yeh fn sirf owner call kr skta hai 
    function updateToken(address _tokenAddress) public onlyOwner{
        tokenAddress=_tokenAddress;
    }

    // (uint256 _tokenSalePrice yeh ik variable h jo uint type ka data store kr rh 
    function updateTokenSalePrice(uint256 _tokenSalePrice) public onlyOwner(){
        tokenSalePrice=_tokenSalePrice;
    }

    function multiply(uint256 x,uint256 y) internal pure returns(uint256 z) {
        // require() use to apply condn ;
        require(y==0 || (z=x*y)/y==x);
    }

    //user will give some amount to buy the token
    function buyToken(uint256 _tokenAmount) public payable{
        require(msg.value == multiply(_tokenAmount,tokenSalePrice),"Insufficient ether provided token purchase");

        ERC20 token=ERC20(tokenAddress);
        require(_tokenAmount<=token.balanceOf(address(this)),"Not enough token");

        require(token.transfer(msg.sender, _tokenAmount * 1e18));

        payable(owner).transfer(msg.value);

        soldTokens +=_tokenAmount;
    }

    //this fn will send all the details of the token
    function getTokenDetails() public view returns (string memory name,string memory symbol ,uint256 balance,
                                                    uint256 supply, uint256 tokenPrice,address tokenAddr){
        ERC20 token = ERC20(tokenAddress);

        return(
            token.name(),
            token.symbol(),
            token.balanceOf(address(this)),
            token.totalSupply(),
            tokenSalePrice,
            tokenAddress
        );
    }

    // transferToOwner() used ot recieve fund/donation from the user 
    function transferToOwner(uint256 _amount)external payable{
        require(msg.value >= _amount,"Insufficient funds sent");

        (bool success,) = owner.call{value:_amount}("");
        require( success,"Transfer failed");
    }

    //transfer ether to any address
    function transferEther(address payable _reciever,uint256 _amount) external payable{
        require(msg.value >= _amount,"Insufficient funds sent");

        (bool success,) = _reciever.call{value:_amount}("");
        require(success,"Transfer failed");
    }

//    withdrwal all the token from the ICO 
//jaise kbhi aapko token destroy krna to phle aap sare user ka token lelo then destroy it 
    function withdrawAllTokens() public onlyOwner(){
        ERC20 token = ERC20(tokenAddress);
        uint256 balance = token.balanceOf(address(this));

    //    balance ho tabhi to withdraw kre 
        require(balance>0,"No tokens to withdrwal");

    // owner ke addrress pr token send krna 
        require(token.transfer(owner, balance),"Transaction failed");
    }
    


}