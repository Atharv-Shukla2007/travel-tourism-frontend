import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import axios from 'axios'

const EventForm = ({ onSubmit }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", location: "", date: "", description: "", category: "upcoming" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/events",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // 🔥 update UI
      onSubmit(res.data);

      setForm({
        title: "",
        location: "",
        date: "",
        description: "",
        category: "upcoming"
      });

      setOpen(false);

      toast.success("Event created successfully");

    } catch (error) {
      console.error(error);
      toast.error("Failed to create event");
    }
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all">
        <Plus className="w-4 h-4" />Create Event
      </button>
    );
  }

  return (
    <form onSuccess={handleSubmit} className="rounded-2xl card-shadow bg-background p-5 space-y-3 animate-scale-in">
      <h3 className="label-text">New Event</h3>
      <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Event title" required
        className="w-full px-4 py-2.5 rounded-xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
      <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Location" required
        className="w-full px-4 py-2.5 rounded-xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
      <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required
        className="w-full px-4 py-2.5 rounded-xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
      <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" required rows={3}
        className="w-full px-4 py-2.5 rounded-xl bg-secondary text-sm text-foreground placeholder:text-muted-foreground focus:outline-none resize-none" />
      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="w-full px-4 py-2.5 rounded-xl bg-secondary text-sm text-foreground focus:outline-none">
        <option value="upcoming">Upcoming</option>
        <option value="ongoing">Ongoing</option>
      </select>
      <div className="flex gap-2">
        <button type="submit" className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 active:scale-95 transition-all">Create</button>
        <button type="button" onClick={() => setOpen(false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-secondary text-foreground hover:bg-secondary/80 transition-colors">Cancel</button>
      </div>
    </form>
  );
};

export default EventForm;
