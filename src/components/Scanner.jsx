import { useState } from "react";
import { Camera, Search, MapPin, Headphones } from "lucide-react";
import { monuments } from "@/data/monuments.js";
import { toast } from "sonner";

const Scanner = () => {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = () => {
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      const random = monuments[Math.floor(Math.random() * monuments.length)];
      setResult(random);
      setScanning(false);
    }, 2500);
  };

  return (
    <div className="rounded-2xl card-shadow bg-background p-6">
      <h3 className="label-text mb-4">Monument Scanner</h3>
      <div className="relative aspect-video rounded-xl bg-primary/5 overflow-hidden flex items-center justify-center">
        <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-foreground/30 rounded-tl-lg" />
        <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-foreground/30 rounded-tr-lg" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-foreground/30 rounded-bl-lg" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-foreground/30 rounded-br-lg" />
        {scanning && <div className="absolute inset-x-6 h-0.5 bg-accent/50 animate-scan-line" />}
        {!scanning && !result && (
          <div className="text-center">
            <Camera className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Point at a monument to scan</p>
          </div>
        )}
        {scanning && <p className="text-sm text-muted-foreground animate-pulse">Scanning...</p>}
      </div>
      <button onClick={handleScan} disabled={scanning}
        className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all disabled:opacity-40">
        <Search className="w-4 h-4" />{scanning ? "Scanning..." : "Scan Monument"}
      </button>
      {result && (
        <div className="mt-4 p-4 rounded-xl bg-secondary animate-slide-up">
          <h4 className="text-base font-semibold text-foreground">{result.name}</h4>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{result.description}</p>
          <div className="mt-3 flex gap-2">
            <button onClick={() => toast.info("Opening map for " + result.location)}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm bg-background card-shadow text-muted-foreground hover:text-foreground transition-colors">
              <MapPin className="w-3.5 h-3.5" />Map
            </button>
            <button onClick={() => toast.info("Playing audio guide")}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm bg-background card-shadow text-muted-foreground hover:text-foreground transition-colors">
              <Headphones className="w-3.5 h-3.5" />Audio
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;
