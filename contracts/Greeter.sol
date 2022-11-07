// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract Greeter {
    string greeting;

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", greeting);
        greeting = _greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("%s is changing the greeting from '%s' to '%s'", msg.sender, greeting, _greeting);
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        console.log("Greeted %s", msg.sender);
        return greeting;
    }
}