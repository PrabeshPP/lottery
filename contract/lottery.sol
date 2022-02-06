//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Lottery{
    address payable public manager;
    address[] players;

    constructor(){
        manager=payable(msg.sender);
    }

    modifier restricted(){
        require(msg.sender==manager);
        _;
    }


    function enter()public payable {
        require(msg.value>0.1 ether ,"You have to pay more that 0.1 ether to participate in the lottery game");
        players.push(msg.sender);
    }

    function randomGenerator()private view returns(uint){
        uint value=uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,players)));

        return value;

    }

    function PickWinner()external payable restricted{
        uint randomValue=randomGenerator() % players.length;
        payable(players[randomValue]).transfer(address(this).balance);
        players=new address[](0);
    }

    function getPlayers()public view returns(address[] memory){
        return players;
    }
}
