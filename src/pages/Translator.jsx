import { useState } from "react";
import { ArrowRight } from "lucide-react";
import axios from "axios";

const mockTranslations = {
  "hello": { Hindi: "नमस्ते", Marathi: "नमस्कार", Tamil: "வணக்கம்", French: "Bonjour", Spanish: "Hola", English: "Hello" },
  "thank you": { Hindi: "धन्यवाद", Marathi: "धन्यवाद", Tamil: "நன்றி", French: "Merci", Spanish: "Gracias", English: "Thank you" },
  "where is the temple": { Hindi: "मंदिर कहाँ है", Marathi: "मंदिर कुठे आहे", Tamil: "கோவில் எங்கே", French: "Où est le temple", Spanish: "¿Dónde está el templo?", English: "Where is the temple" },
  "how much does it cost": { Hindi: "इसकी कीमत कितनी है", Marathi: "याची किंमत किती आहे", Tamil: "இது எவ்வளவு", French: "Combien ça coûte", Spanish: "¿Cuánto cuesta?", English: "How much does it cost" },
  "good morning": { Hindi: "सुप्रभात", Marathi: "सुप्रभात", Tamil: "காலை வணக்கம்", French: "Bonjour", Spanish: "Buenos días", English: "Good morning" },
};

const languages = [{
  name: "Hindi",
  code: "hi"
}, {  
  name: "Marathi",
  code: "mr"
}, {
  name: "English",
  code: "en"
}, {
}];

const Translator = () => {
  const [input, setInput] = useState("");
  const [targetLang, setTargetLang] = useState("hi");
  const [output, setOutput] = useState("");

  const handleTranslate = async () => {
    if (!input.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/translate",
        {
          text: input,
          targetLang: targetLang
        }
      );

      setOutput(res.data.translatedText);

    } catch (error) {
      console.error(error);
      setOutput("Translation failed ❌");
    }
  };

  return (
    <div className="pt-16">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <p className="label-text">Tools</p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mt-1">Language Translator</h1>
        <p className="text-muted-foreground mt-2 leading-relaxed">Communicate across cultures with our tourism language assistant.</p>
        <div className="mt-8 space-y-4">
          <div>
            <label className="label-text">Your text</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='Try "hello", "thank you", "where is the temple"...' rows={4}
              className="mt-1.5 w-full px-4 py-3 rounded-xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none resize-none" />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="label-text">Translate to</label>
              <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}
                className="mt-1.5 w-full px-4 py-3 rounded-xl bg-secondary text-sm text-foreground focus:outline-none">
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleTranslate} disabled={!input.trim()}
              className="mt-6 p-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all disabled:opacity-40">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          {output && (
            <div className="animate-slide-up">
              <label className="label-text">Translation</label>
              <div className="mt-1.5 w-full px-4 py-4 rounded-xl bg-secondary text-foreground text-lg">{output}</div>
            </div>
          )}
        </div>
        <div className="mt-12">
          <p className="label-text mb-3">Quick phrases</p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(mockTranslations).map((phrase) => (
              <button key={phrase} onClick={() => setInput(phrase)}
                className="px-3 py-1.5 rounded-lg bg-secondary text-sm text-muted-foreground hover:text-foreground transition-colors capitalize">{phrase}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translator;
