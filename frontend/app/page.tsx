"use client";

import { useEffect } from "react";
import { useAccount, useChainId } from "wagmi";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StatsCards } from "@/components/StatsCards";
import { TemperatureTimeline } from "@/components/TemperatureTimeline";
import { UploadSection } from "@/components/UploadSection";
import { Toaster } from "@/components/ui/sonner";
import { useFhevm } from "@/fhevm/useFhevm";
import { useInMemoryStorage } from "@/hooks/useInMemoryStorage";
import { useColdChainTracker } from "@/hooks/useColdChainTracker";
import { useMetaMask } from "@/hooks/metamask/useMetaMaskProvider";

export default function Home() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { storage: fhevmDecryptionSignatureStorage } = useInMemoryStorage();
  const { provider: metaMaskProvider } = useMetaMask();

  // FHEVM instance
  const {
    instance: fhevmInstance,
  } = useFhevm({
    provider: metaMaskProvider,
    chainId,
    initialMockChains: { 31337: "http://127.0.0.1:8545" },
    enabled: isConnected,
  });

  // ColdChainTracker hook
  const coldChainTracker = useColdChainTracker({
    instance: fhevmInstance,
    fhevmDecryptionSignatureStorage,
    chainId,
  });

  // Load logs when contract is deployed and ready
  useEffect(() => {
    if (coldChainTracker.isDeployed && isConnected) {
      coldChainTracker.loadLogs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coldChainTracker.isDeployed, isConnected]);

  // Calculate stats
  const activeShipments = coldChainTracker.logs.length;
  const avgTemperature = coldChainTracker.logs.length > 0 && coldChainTracker.logs.some(log => log.decryptedTemperature)
    ? Math.round(
        coldChainTracker.logs
          .filter(log => log.decryptedTemperature)
          .reduce((sum, log) => sum + (log.decryptedTemperature || 0), 0) / 
        coldChainTracker.logs.filter(log => log.decryptedTemperature).length
      )
    : -18;
  const alertCount = coldChainTracker.logs.filter(log => log.isWarning).length;

  return (
    <>
      <Toaster />
      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 container mx-auto px-6 py-12">
          <StatsCards 
            activeShipments={activeShipments}
            avgTemperature={avgTemperature}
            alertCount={alertCount}
          />

          <div className="flex justify-end mb-6">
            <UploadSection 
              onUpload={coldChainTracker.loadLogs}
              recordTemperature={coldChainTracker.recordTemperature}
              isRecording={coldChainTracker.isRecording}
            />
          </div>

          <TemperatureTimeline 
            logs={coldChainTracker.logs}
            decryptTemperature={coldChainTracker.decryptTemperature}
            canDecrypt={coldChainTracker.canDecrypt}
            isDecrypting={coldChainTracker.isDecrypting}
          />
        </main>

        <Footer />
      </div>
    </>
  );
}
