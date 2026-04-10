import { Headphones, Map, Globe } from "lucide-react";

import { useState } from "react";

const MonumentCard = ({ monument }) => {
  const [modalType, setModalType] = useState(null);
  return (
    <div className="group rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 bg-background">
      <div className="aspect-[4/5] relative overflow-hidden">
        <img src={monument.image} alt={monument.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="label-text text-primary-foreground/70">{monument.type}</span>
          <h3 className="text-lg font-semibold text-primary-foreground mt-1 tracking-tight">{monument.title}</h3>
          
        </div>
      </div>
      <div className="p-3 flex items-center gap-1">
        <button onClick={() => setModalType("audio")} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm text-muted-foreground hover:bg-secondary transition-colors">
          <Headphones className="w-4 h-4" />Audio
        </button>
        <button onClick={() => setModalType("map")} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm text-muted-foreground hover:bg-secondary transition-colors">
          <Map className="w-4 h-4" />Map
        </button>
        <button onClick={() => setModalType("view360")} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm text-muted-foreground hover:bg-secondary transition-colors">
          <Globe className="w-4 h-4" />360°
        </button>
      </div>
      {modalType && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          
          <div className="bg-background rounded-2xl p-4 w-[90%] max-w-2xl relative">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setModalType(null)}
              className="absolute top-2 right-2 text-lg"
            >
              ✖
            </button>

            {/* AUDIO */}
            {modalType === "audio" && (
              <audio controls autoPlay src={monument.audio} className="w-full mt-6" />
            )}

            {/* MAP */}
            {modalType === "map" && (
              <iframe
                src={monument.location}
                width="100%"
                height="400px"
                className="mt-6 rounded-xl"
                allowFullScreen
              ></iframe>
            )}

            {/* 360 VIEW */}
            {modalType === "view360" && (
              <iframe
                src={monument.view360}
                width="100%"
                height="400px"
                className="mt-6 rounded-xl"
                allowFullScreen
              ></iframe>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default MonumentCard;
