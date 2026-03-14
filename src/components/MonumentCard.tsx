import { Monument } from "@/data/monuments";
import { Headphones, Map, Globe } from "lucide-react";
import { toast } from "sonner";

const MonumentCard = ({ monument }: { monument: Monument }) => {
  return (
    <div className="group rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 bg-background">
      <div className="aspect-[4/5] relative overflow-hidden">
        <img
          src={monument.image}
          alt={monument.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="label-text text-primary-foreground/70">{monument.type}</span>
          <h3 className="text-lg font-semibold text-primary-foreground mt-1 tracking-tight">{monument.name}</h3>
          <p className="text-sm text-primary-foreground/80">{monument.location}</p>
        </div>
      </div>
      <div className="p-3 flex items-center gap-1">
        <button
          onClick={() => toast.info("Audio guide playing for " + monument.name)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm text-muted-foreground hover:bg-secondary transition-colors"
        >
          <Headphones className="w-4 h-4" />
          Audio
        </button>
        <button
          onClick={() => toast.info("Opening map for " + monument.location)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm text-muted-foreground hover:bg-secondary transition-colors"
        >
          <Map className="w-4 h-4" />
          Map
        </button>
        <button
          onClick={() => toast.info("Loading 360° view of " + monument.name)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm text-muted-foreground hover:bg-secondary transition-colors"
        >
          <Globe className="w-4 h-4" />
          360°
        </button>
      </div>
    </div>
  );
};

export default MonumentCard;
