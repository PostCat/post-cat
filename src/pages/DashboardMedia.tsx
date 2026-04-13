import DashboardLayout from "@/components/DashboardLayout";
import { Upload, Trash2, Search, Film, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const mediaItems = [
  { id: 1, name: "product-hero.jpg", size: "2.4 MB", date: "Apr 12, 2026", type: "image", used: true },
  { id: 2, name: "promo-video.mp4", size: "18.7 MB", date: "Apr 11, 2026", type: "video", used: true },
  { id: 3, name: "brand-logo.png", size: "340 KB", date: "Apr 10, 2026", type: "image", used: true },
  { id: 4, name: "carousel-1.jpg", size: "1.8 MB", date: "Apr 9, 2026", type: "image", used: false },
  { id: 5, name: "story-template.png", size: "890 KB", date: "Apr 8, 2026", type: "image", used: true },
  { id: 6, name: "reel-clip.mp4", size: "12.3 MB", date: "Apr 7, 2026", type: "video", used: false },
  { id: 7, name: "banner-sale.jpg", size: "1.2 MB", date: "Apr 6, 2026", type: "image", used: false },
  { id: 8, name: "tutorial-thumb.png", size: "560 KB", date: "Apr 5, 2026", type: "image", used: true },
  { id: 9, name: "behind-scenes.mp4", size: "24.1 MB", date: "Apr 4, 2026", type: "video", used: false },
];

const DashboardMedia = () => {
  const [search, setSearch] = useState("");
  const filtered = mediaItems.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Media Library</h1>
          <p className="text-muted-foreground mt-1">{mediaItems.length} files · 62.3 MB total</p>
        </div>
        <Button className="btn-glow gap-2 h-10 px-5"><Upload className="h-4 w-4" /> Upload</Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Images", value: mediaItems.filter((m) => m.type === "image").length, icon: FileImage, color: "text-primary", bg: "bg-primary/10" },
          { label: "Videos", value: mediaItems.filter((m) => m.type === "video").length, icon: Film, color: "text-success", bg: "bg-success/10" },
          { label: "Storage", value: "62.3 MB", icon: Upload, color: "text-warning", bg: "bg-warning/10" },
        ].map((s) => (
          <div key={s.label} className="card-surface p-4 flex items-center gap-4">
            <div className={`h-10 w-10 rounded-xl ${s.bg} flex items-center justify-center`}>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <div>
              <p className="stat-label">{s.label}</p>
              <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search files..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-card border-border h-9" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="card-surface-hover p-4 group">
            <div className="h-36 bg-secondary/60 rounded-lg flex items-center justify-center mb-3 relative overflow-hidden">
              {item.type === "video" ? <Film className="h-8 w-8 text-muted-foreground/40" /> : <FileImage className="h-8 w-8 text-muted-foreground/40" />}
              {item.used && <span className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded bg-success/20 text-success font-medium">In use</span>}
              <span className="absolute top-2 left-2 text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground font-medium uppercase">{item.type}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.size} · {item.date}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive flex-shrink-0">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardMedia;
