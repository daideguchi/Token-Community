const { expect } = require("Chai");
const { ethers } = require("hardhat");

describe("MemberNFTコントラクト", function () {
  let MemberNFT;
  let memberNFT;
  const name = "MemberNFT";
  const symbol = "MEM";
  let owner;

  //何度も同じ処理をしなくて良いように共通化をする。。。beforeEachを使う
  beforeEach(async function () {
    //getSigner"s"は持っているアドレス全部を持ってくるという意味
    //持ってきたアドレスの先頭のものをownerに入れる
    // const [owner] = await ethers.getSigners();
    [owner] = await ethers.getSigners();
    /** ここからデプロイの準備ーーーーーーーーーーーー*/
    MemberNFT = await ethers.getContractFactory("MemberNFT");
    memberNFT = await MemberNFT.deploy(); //ここでデプロイできる
    memberNFT.deployed(); //ここまでがデプロイを完了させるまでの流れ
    /**ここまでーーーーーーーーーーーー */
  });

  it("トークンの名前とシンボルがセットされるべき", async function () {
    // expect().to.equal(0);//引数の内容が.toの後と一致することを期待する。一致しないとundifindになる
    /** ここからテストの準備ーーーーーーーーーーーー*/
    expect(await memberNFT.name()).to.equal(name); //上で定義したnameと一致するか確認。menberNFT.nameには「MemberNFT」が入っているはず
    expect(await memberNFT.symbol()).to.equal(symbol);
    /**ここまでーーーーーーーーーーーー */
  });
  it("デプロイアドレスがownerに設定されるべき", async function () {
    /** ここからテストの準備ーーーーーーーーーーーー*/
    expect(await memberNFT.owner()).to.equal(owner.address); //.addressを記述する必要あり
    /**ここまでーーーーーーーーーーーー */
  });
});
