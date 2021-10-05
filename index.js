const { Connection, PublicKey,clusterApiUrl,Keypair,LAMPORTS_PER_SOL } =require("@solana/web3.js");
// const web3 = require('@solana/web3.js');
const {Token,TOKEN_PROGRAM_ID}=require("@solana/spl-token");
const b64=require("base64-js");


const arrayToB64 = (array) => {
    return b64
      .fromByteArray(array)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
};

const convertSecretToString = (secretBuffer) => {
    return arrayToB64(secretBuffer);
};

// Wallet creation
// const mintingFromWallet=Keypair.generate();
// console.log(mintingFromWallet.publicKey.toString())
// console.log(convertSecretToString(mintingFromWallet.secretKey));
// console.log(mintingFromWallet);

//Air Drop Sol
const airDropSol=async ()=>{
    try{
        const connection = new Connection(
            clusterApiUrl("devnet"),
            "confirmed"
        );

        // const mintingFromWallet=web3.Keypair.generate();
        // console.log(mintingFromWallet);
        // console.log("Public Key Info***");
        // console.log(mintingFromWallet.publicKey)
        // console.log(mintingFromWallet.publicKey.toString())
        // console.log("Private Key Info***");
        // console.log(mintingFromWallet.secretKey)
        // console.log(convertSecretToString(mintingFromWallet.secretKey));
        //Public Key UInt8Array 32
        // [
        //     111,  22,  77, 178, 152, 127, 111, 185,
        //       0,  62, 113,  83,  45, 222, 172, 119,
        //     180, 188,   4, 111, 176, 226, 177, 174,
        //      16, 108,   9, 173, 154,   3, 204,  48
        //   ]
        //Public Key String
        //8Udypzw8crMF7ugzjPub5iYM2oV3KUbteCsT8mWaw5C3
        //SecretKey Key Uint8Array
    //     [
    //   131, 226,  28, 106, 172, 242, 192, 103, 116,   1,  90,
    //   212, 130,  29,  48, 212, 241, 153, 142,  25, 153, 184,
    //   204, 247, 213, 252,  50,  99, 132,  44,  86, 153, 111,
    //    22,  77, 178, 152, 127, 111, 185,   0,  62, 113,  83,
    //    45, 222, 172, 119, 180, 188,   4, 111, 176, 226, 177,
    //   174,  16, 108,   9, 173, 154,   3, 204,  48
    // ]
        //SecretKey string
        //g-IcaqzywGd0AVrUgh0w1PGZjhmZuMz31fwyY4QsVplvFk2ymH9vuQA-cVMt3qx3tLwEb7Disa4QbAmtmgPMMA      

        const userWallet = await Keypair.fromSecretKey(Uint8Array.from([
            131, 226,  28, 106, 172, 242, 192, 103, 116,   1,  90,
            212, 130,  29,  48, 212, 241, 153, 142,  25, 153, 184,
            204, 247, 213, 252,  50,  99, 132,  44,  86, 153, 111,
             22,  77, 178, 152, 127, 111, 185,   0,  62, 113,  83,
             45, 222, 172, 119, 180, 188,   4, 111, 176, 226, 177,
            174,  16, 108,   9, 173, 154,   3, 204,  48
          ]));
        // console.log("Recreated User Wallet");
        // console.log(userWallet)
        var fromAirDropSignature=await connection.requestAirdrop(new PublicKey(userWallet.publicKey),3*LAMPORTS_PER_SOL);
        
        await connection.confirmTransaction(fromAirDropSignature); 
        //import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
        // (async () => {
        //   const connection = new Connection("https://api.testnet.solana.com", "confirmed");
        //   const myAddress = new PublicKey("2nr1bHFT86W9tGnyvmYW4vcHKsQB3sVQfnddasz4kExM");
        //   const signature = await connection.requestAirdrop(myAddress, LAMPORTS_PER_SOL);
        //   await connection.confirmTransaction(signature);
        // })();
    }catch(err){
        console.log(err);
    }
}

// airDropSol();

// There are 1-billion lamports in one SOL

//Getting Account Details

const getWalletDetails=async ()=>{
    try{
        const connection = new Connection(
            clusterApiUrl("devnet"),
            "confirmed"
        );
        const userWallet = await Keypair.fromSecretKey(Uint8Array.from([
            131, 226,  28, 106, 172, 242, 192, 103, 116,   1,  90,
            212, 130,  29,  48, 212, 241, 153, 142,  25, 153, 184,
            204, 247, 213, 252,  50,  99, 132,  44,  86, 153, 111,
             22,  77, 178, 152, 127, 111, 185,   0,  62, 113,  83,
             45, 222, 172, 119, 180, 188,   4, 111, 176, 226, 177,
            174,  16, 108,   9, 173, 154,   3, 204,  48
          ]));
        let info=await connection.getAccountInfo(new PublicKey(userWallet.publicKey));
        // let info=await connection.getBalance(new PublicKey(userWallet.publicKey));
        console.log(info)
    }catch(err){
        console.log(err)
    }
}

// getWalletDetails();

//Creating Token
const creatingToken=async()=>{
    try{
        const connection = new Connection(
            clusterApiUrl("devnet"),
            "confirmed"
        );
        const creatorWallet = await Keypair.fromSecretKey(Uint8Array.from([
            131, 226,  28, 106, 172, 242, 192, 103, 116,   1,  90,
            212, 130,  29,  48, 212, 241, 153, 142,  25, 153, 184,
            204, 247, 213, 252,  50,  99, 132,  44,  86, 153, 111,
             22,  77, 178, 152, 127, 111, 185,   0,  62, 113,  83,
             45, 222, 172, 119, 180, 188,   4, 111, 176, 226, 177,
            174,  16, 108,   9, 173, 154,   3, 204,  48
          ]));
        const createdToken=new Token(connection,creatorWallet.publicKey,TOKEN_PROGRAM_ID,creatorWallet);
        // console.log(createdToken);
        // const fromTokenAccount=await createdToken.getOrCreateAssociatedAccountInfo(userWallet.publicKey)
        // const pubKey=await createdToken.createAccount(userWallet.publicKey);
        const info=await createdToken.getOrCreateAssociatedAccountInfo(creatorWallet.publicKey)
        console.log(info);
        // console.log(createdToken.publicKey.toString());
    }catch(err){
        console.log(err);
    }
}

// creatingToken();

//create mint
const initialMint=async ()=>{
    try{
        const connection = new Connection(
            clusterApiUrl("devnet"),
            "confirmed"
        );
        const creatorWallet = await Keypair.fromSecretKey(Uint8Array.from([
            131, 226,  28, 106, 172, 242, 192, 103, 116,   1,  90,
            212, 130,  29,  48, 212, 241, 153, 142,  25, 153, 184,
            204, 247, 213, 252,  50,  99, 132,  44,  86, 153, 111,
             22,  77, 178, 152, 127, 111, 185,   0,  62, 113,  83,
             45, 222, 172, 119, 180, 188,   4, 111, 176, 226, 177,
            174,  16, 108,   9, 173, 154,   3, 204,  48
          ]));
        const initialMint=await Token.createMint(connection,creatorWallet,creatorWallet.publicKey,null,6,TOKEN_PROGRAM_ID);
        // console.log(initialMint.getMintInfo());
        let fromTokenAccount=await initialMint.getOrCreateAssociatedAccountInfo(creatorWallet.publicKey);

        // console.log(creatorWallet.publicKey.toString())
        // console.log(fromTokenAccount.address.toString())
        // let toTokenAccount=await initialMint.getOrCreateAssociatedAccountInfo(new PublicKey("6jqk5SS7R8yxjrqxCXNfSADps8FgM18FJ1HTWj29Sttv"));
        await initialMint.mintTo(fromTokenAccount.address,creatorWallet.publicKey,[],1000000);
        await initialMint.setAuthority(initialMint.publicKey,null,"MintTokens",creatorWallet.publicKey,[])
        //Mint Address A8uU9oVEMcedFmuGLaPuNergP1ikgbEriqB7gjFTv1z8
    }catch(err){
        console.log(err);
    }
}
//mint tokens 
// initialMint()



//mint again
const mintAgain=async ()=>{
    try{
        const connection = new Connection(
            clusterApiUrl("devnet"),
            "confirmed"
        );
        const creatorWallet = await Keypair.fromSecretKey(Uint8Array.from([
            131, 226,  28, 106, 172, 242, 192, 103, 116,   1,  90,
            212, 130,  29,  48, 212, 241, 153, 142,  25, 153, 184,
            204, 247, 213, 252,  50,  99, 132,  44,  86, 153, 111,
             22,  77, 178, 152, 127, 111, 185,   0,  62, 113,  83,
             45, 222, 172, 119, 180, 188,   4, 111, 176, 226, 177,
            174,  16, 108,   9, 173, 154,   3, 204,  48
          ]));    
        // var fromAirDropSignature = await connection.requestAirdrop(
        //     creatorWallet.publicKey,
        //     LAMPORTS_PER_SOL
        // );
      
        // await connection.confirmTransaction(fromAirDropSignature);
        const creatorWalletPublicKey=new PublicKey(creatorWallet.publicKey);
        console.log(creatorWalletPublicKey.toString());
        const creatorToken=new Token(connection,creatorWalletPublicKey,TOKEN_PROGRAM_ID,creatorWallet);
        // console.log(creatorToken);
        const fromTokenAccount=await creatorToken.getOrCreateAssociatedAccountInfo(creatorWalletPublicKey);
        console.log(fromTokenAccount);
    }catch(err){
        console.log(err);
    }
}

mintAgain()

//transfer tokens


