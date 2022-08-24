const { expect } = require("chai");
const { ethers } = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("TokenBankコントラクト", function () {
    let TokenBank;
    let tokenBank;
    const name = "Token";
    const symbol = "TBK";
    let owner;
    //   let addr1;

    //何度も同じ処理をしなくて良いように共通化をする。。。beforeEachを使う
    beforeEach(async function () {
        //getSigner"s"は持っているアドレス全部を持ってくるという意味
        //持ってきたアドレスの先頭のものをownerに入れる,二番目はaddr1
        // const [owner] = await ethers.getSigners();
        [owner] = await ethers.getSigners();
        /** ここからデプロイの準備ーーーーーーーーーーーー*/
        TokenBank = await ethers.getContractFactory("TokenBank");
        tokenBank = await TokenBank.deploy(name, symbol); //ここでデプロイできる
        await tokenBank.deployed(); //ここまでがデプロイを完了させるまでの流れ
        /**ここまでーーーーーーーーーーーー */
    });

    describe("デプロイ", function () {
        it("トークンの名前とシンボルがセットされるべき", async function () {
            expect(await tokenBank.name()).to.equal(name);
            expect(await tokenBank.symbol()).to.equal(symbol);

        });
        it("デプロイアドレスがownerに設定されるべき", async function () {
          //publicの場合はgetterで呼び出すことができるowner()、18行目、getSignersで署名したオーナーのアドレス
          expect(await tokenBank.owner()).to.equal(owner.address);
        });
        it("ownerに総額が割り当てられるべき", async function () {
            const ownerBalance = await tokenBank.balanceOf(owner.address)
            expect(await tokenBank.totalSupply()).to.equal(ownerBalance);
        });
    });
})