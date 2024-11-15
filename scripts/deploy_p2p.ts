import { ethers } from "hardhat";
import p2pArgs from "../contract-args/p2p";

async function main() {
  console.log("Deploying OptimisticP2P ...", p2pArgs);
  const shadow = await ethers.deployContract("OptimisticP2P", p2pArgs);

  await shadow.waitForDeployment();

  const { ...tx } = shadow.deploymentTransaction()?.toJSON();
  tx.data = await shadow.getAddress();

  console.log(`deployed to ${JSON.stringify(tx, null, 2)}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
