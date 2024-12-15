"use client";

interface EthereumWindow extends Window {
  ethereum?: {
    request: (args: { method: string }) => Promise<any>;
  };
}

declare const window: EthereumWindow;

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ethers } from "ethers";
import { ContractAbi } from "@/utils/ContractAbi";

interface AuthContextType {
  isLoggedIn: boolean;
  account: string | null;
  signature: string | null;
  signer: ethers.Signer | null;
  login: () => Promise<void>;
  logout: () => void;
  generateIpfsHash: (
    certificateImage: string,
    description: string
  ) => Promise<any>;
  mintCertificate: (
    walletAddress: string,
    ipfsHash: string,
    program: string
  ) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const ownerAddress = process.env.NEXT_PUBLIC_OWNER_ADDRESS;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [signature, setSignature] = useState<string | null>(null); // Estado para a assinatura
  const [tokens, setTokens] = useState<string[]>([]);

  const updateMint = async (program: string, address: string, tx: string) => {
    try {
      const response = await fetch("/api/user/update", {
        method: "POST",
        body: JSON.stringify({
          programId: program,
          address: address,
          tx: tx,
        }),
      });
      if (response.ok) {
        return "Minted";
      }
    } catch (error) {
      console.error("Error updating mint status:", error);
    }
  };

  const getContractInstance = async () => {
    if (!isLoggedIn) {
      login();
    }

    if (!contractAddress) {
      throw new Error("Contract address is not defined");
    }
    const contract = new ethers.Contract(contractAddress, ContractAbi, signer);

    return contract;
  };

  const generateIpfsHash = async (
    certificateImage: string,
    description: string
  ) => {
    try {
      const response1 = await fetch(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_PINATA_JWT,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pinataContent: {
              image: certificateImage,
              description: description,
            },
          }),
        }
      );

      const data = await response1.json();
      const IpfsHash = data.IpfsHash;
      console.log(IpfsHash);
      return IpfsHash;
    } catch (error: any) {
      console.error("Erro na requisição fetchTrailAirDrop:", error);
      throw error;
    }
  };

  const login = async () => {
    if (window.ethereum) {
      try {
        // Solicita a conexão da carteira
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts && accounts.length > 0) {
          const selectedAccount = accounts[0];
          // if(selectedAccount != ownerAddress) return;
          setAccount(selectedAccount);

          // Obtém o provedor e o signer
          const provider = new ethers.BrowserProvider(window.ethereum);
          const userSigner = await provider.getSigner();
          setSigner(userSigner);

          // Solicita a assinatura da mensagem
          const userSignature = await userSigner.signMessage(
            "Sign this message to authenticate with our application."
          );
          setSignature(userSignature); // Armazena a assinatura no estado
          // Após obter a assinatura, define o estado de login como verdadeiro
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("Error connecting to MetaMask:", err);
      }
    } else {
      console.error("MetaMask is not installed");
    }
  };

  const logout = () => {
    setAccount(null);
    setSignature(null); // Limpa a assinatura ao deslogar
    setIsLoggedIn(false);
    setSigner(null);
  };

  const mintCertificate = async (
    walletAddress: string,
    ipfsHash: string,
    program: string
  ) => {
    try {
      const contract = await getContractInstance();
      const tx = await contract.safeMint(walletAddress, ipfsHash);
      const receipt = await tx.wait();

      if (receipt.status !== 1) {
        throw new Error("Transaction failed");
      }

      console.log(
        `Certificate sucessefully sent to ${walletAddress}\n RECEIPT${JSON.stringify(
          receipt
        )}`
      );
      const response = await updateMint(program, walletAddress, tx.hash);
      return response;
    } catch (error) {
      console.error(`Error in tx to ${walletAddress}:`, error);
      return false;
    }
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts && accounts.length > 0) {
          const selectedAccount = accounts[0];
          setAccount(selectedAccount);

          // Obtém o provedor e o signer
          const provider = new ethers.BrowserProvider(window.ethereum);
          const userSigner = await provider.getSigner();
          setSigner(userSigner);
        }
      }
    };

    checkWalletConnection();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        account,
        signer,
        signature,
        generateIpfsHash,
        login,
        logout,
        mintCertificate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
