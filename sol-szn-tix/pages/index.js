import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import styles from "../styles/Home.module.css";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import React , { useEffect, useState } from "react";




export default function Home() {
  const {publicKey} = useWallet();
  const [loading, setLoading] = useState(true);
  const [allNftsInProgram, setAllNftsInProgram] = useState([]);

  // GET ALL NFTS IN PROGRAM
  const getAllNftsInProgram = async () => {
    
    const sdk = ThirdwebSDK.fromNetwork("devnet");
    const programAddress = 'G7zfkH3x5eAdMM6e3oAuFZfnepHwmkzAaMnim5nf6DVW'
    const program = await sdk.getProgram(programAddress, "nft-collection");
    const nfts = await program.getAll();
    setAllNftsInProgram(nfts);
    setLoading(false);

    console.log(nfts[0].metadata.name);
    console.log(nfts[0].owner);
  }


  


  const renderNftsInProgram = () => {
    console.log('allNftsInProgram', allNftsInProgram);
    
    return (
      <div>
        NFT'S
        {allNftsInProgram.map((nft, index) => {
          return (
            <div className={styles.nft_card} key={index}>
              <div className={styles.nft_name}>{nft.metadata.name}</div>
              <img className={styles.nft_img} src={nft.metadata.image}/>
            </div>
          )
        })}
      </div>
    );
  }

  useEffect(() => {
    getAllNftsInProgram();
  }, []);


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Sol Szn Tix</a>
        </h1>
        {!loading && renderNftsInProgram()}
        {!publicKey && <WalletMultiButton />}
        {publicKey && <WalletDisconnectButton />}
      </main>
    </div>
  );
}
