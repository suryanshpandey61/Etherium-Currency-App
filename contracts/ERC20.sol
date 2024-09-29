// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TheBlockchainCoders is ERC20{
    // error aya to suryanshtoken ki jgh TheBlockchainCoders yeh bs name hai 
    constructor() ERC20("SuryanshToken","@TBC"){
        // _mint is a fn to create new tokens 
        _mint(msg.sender,10000000000000000000000000);
    }
}