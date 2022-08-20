const { expect } = require("Chai");
const { ethers } = require("hardhat");

describe("MemberNFTコントラクト", function () {
  it("トークンの名前とシンボルがセットされるべき", async function () {
    // expect().to.equal(0);//引数の内容が.toの後と一致することを期待する。一致しないとundifindになる
    const name = "MemberNFT";
    const symbol = "MEM";

    /** ここからデプロイの準備ーーーーーーーーーーーー*/
    const MemberNFT = await ethers.getContractFactory("MemberNFT");
    const memberNFT = await MemberNFT.deploy(); //ここでデプロイできる
    await memberNFT.deployed(); //ここまでがデプロイを完了させるまでの流れ
    /**ここまでーーーーーーーーーーーー */

    /** ここからテストの準備ーーーーーーーーーーーー*/
    expect(await memberNFT.name()).to.equal(name); //上で定義したnameと一致するか確認。menberNFT.nameには「MemberNFT」が入っているはず
    expect(await memberNFT.symbol()).to.equal(symbol);
    /**ここまでーーーーーーーーーーーー */
  });
  it("デプロイアドレスがownerに設定されるべき", async function () {
    //getSigner"s"は持っているアドレス全部を持ってくるという意味
    //持ってきたアドレスの先頭のものをownerに入れる
    const [owner] = await ethers.getSigners();

    /** ここからデプロイの準備ーーーーーーーーーーーー*/
    const MemberNFT = await ethers.getContractFactory("MemberNFT");
    const memberNFT = await MemberNFT.deploy(); //ここでデプロイできる
    await memberNFT.deployed(); //ここまでがデプロイを完了させるまでの流れ
    /**ここまでーーーーーーーーーーーー */

    /** ここからテストの準備ーーーーーーーーーーーー*/
    expect(await memberNFT.owner()).to.equal(owner.address);//.addressを記述する必要あり
    /**ここまでーーーーーーーーーーーー */
  });
});
