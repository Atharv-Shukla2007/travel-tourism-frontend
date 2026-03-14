export interface TourEvent {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  category: "ongoing" | "upcoming" | "past";
  image: string;
  createdBy?: string;
}

export const initialEvents: TourEvent[] = [
  {
    id: "e1",
    title: "Moonlight Walk at Hampi",
    location: "Hampi, Karnataka",
    date: "2026-04-15",
    description: "Experience the ancient ruins of Hampi under the full moon with a certified heritage guide.",
    category: "upcoming",
    image: "",
  },
  {
    id: "e2",
    title: "Rajasthani Folk Festival",
    location: "Jaipur, Rajasthan",
    date: "2026-03-10",
    description: "A vibrant celebration of Rajasthani music, dance, and crafts at the Amber Fort.",
    category: "ongoing",
    image: "",
  },
  {
    id: "e3",
    title: "Heritage Photography Walk",
    location: "Delhi",
    date: "2026-02-20",
    description: "A guided photography walk through the Qutub Complex capturing Indo-Islamic architecture.",
    category: "past",
    image: "",
  },
  {
    id: "e4",
    title: "Temple Architecture Workshop",
    location: "Konark, Odisha",
    date: "2026-05-01",
    description: "Learn about the architectural marvels of the Konark Sun Temple from leading historians.",
    category: "upcoming",
    image: "",
  },
];
