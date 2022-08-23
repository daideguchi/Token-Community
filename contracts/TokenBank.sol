// SPDX-License-Identifier: MIY
pragma solidity ^0.8.9;


//状態変数の定義
contract TokenBank {
    // Tokenの名前
    string private _name;

    // Tokenのシンボル
    string private _symbol;

    // Tokenの総供給量数 定数なのでconstantにする
    uint256 constant _totalSupply = 1000;

    // TokenBnakが預かっているTokenの総額
    uint256 private _bankTotalDeposit;

    // TokenBankのオーナーのアドレスを格納
    address public owner;

    // アカウントアドレスごとのToken残高 addressを入力するとuint256型が返ってくる
    mapping(address => uint256) private _balances;

    // TokenBankが預かっているToken残高
    mapping(address => uint256) private _tokenBankBalances;
}
