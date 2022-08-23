// SPDX-License-Identifier: MIY
pragma solidity ^0.8.9;


//状態変数の定義
contract TokenBank {
    /// @dev Tokenの名前
    string private _name;

    /// @dev Tokenのシンボル
    string private _symbol;

    /// @dev Tokenの総供給量数 定数なのでconstantにする
    uint256 constant _totalSupply = 1000;

    /// @dev TokenBnakが預かっているTokenの総額
    uint256 private _bankTotalDeposit;

    /// @dev TokenBankのオーナーのアドレスを格納
    address public owner;

    /// @dev アカウントアドレスごとのToken残高 addressを入力するとuint256型が返ってくる
    mapping(address => uint256) private _balances;

    /// @dev TokenBankが預かっているToken残高
    mapping(address => uint256) private _tokenBankBalances;

    /// @dev Token移転時のイベント
    event TokenTransfer(
        address indexed from,
        address indexed to,
        uint256 amount
    );

    /// @dev Token預入時のイベント
    event TokenDeposit(
        address indexed from,
        uint amount
    );

    /// @dev Token引出時のイベント
    event TokenWithdraw(
        address indexed from,
        uint amount
    );

    constructor (string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
        owner = msg.sender; //デプロイ（署名）するときのアドレス
        _balances[owner] = _totalSupply; //_balances[owner]：オーナーの持っている残高uint256型
    }
}
