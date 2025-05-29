import Web3 from "web3";
import board_Abi from "../contracts/board.json";
import ERC_1155_Abi from "../contracts/ERC1155.json";
import ERC_20_Abi from "../contracts/ERC20.json";
// 0xd55b66609dF83Ed931bee8766Af17fdf7AD2729D  ERC20 CA
// 0xFe15F8c01ED09356a76a264125Ff54e8c1C79aab  ERC1155 CA
// 0xDB643B39098D5c4eE9F634DCE3b8531055A9EF42  boardAbi CA

const CONTRACT_ADDRESS = "0xF76fDcf1113d028a2F88014aC37930ACE6caC2C5"
const web3 = new Web3(window.ethereum);
const boardAbi = board_Abi.abi;
const boardSol = new web3.eth.Contract(boardAbi, CONTRACT_ADDRESS);
console.log(boardSol);

export {
    CONTRACT_ADDRESS,
    boardSol
}
