// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PBTToken is ERC20 {
    constructor() ERC20("PayBee Demo Token", "PBT") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }
}