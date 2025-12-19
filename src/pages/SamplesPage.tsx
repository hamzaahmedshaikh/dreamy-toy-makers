import { Star, Sparkles } from "lucide-react";

// Sample anime characters for the gallery
const animeCharacters = [
  { id: 1, name: "Marin Kitagawa", anime: "My Dress-Up Darling" },
  { id: 2, name: "Zero Two", anime: "Darling in the Franxx" },
  { id: 3, name: "Rem", anime: "Re:Zero" },
  { id: 4, name: "Nezuko Kamado", anime: "Demon Slayer" },
  { id: 5, name: "Miku Nakano", anime: "Quintessential Quintuplets" },
  { id: 6, name: "Chika Fujiwara", anime: "Kaguya-sama" },
  { id: 7, name: "Yor Forger", anime: "Spy x Family" },
  { id: 8, name: "Anya Forger", anime: "Spy x Family" },
  { id: 9, name: "Makima", anime: "Chainsaw Man" },
  { id: 10, name: "Power", anime: "Chainsaw Man" },
  { id: 11, name: "Hinata Hyuga", anime: "Naruto" },
  { id: 12, name: "Mikasa Ackerman", anime: "Attack on Titan" },
  { id: 13, name: "Asuka Langley", anime: "Evangelion" },
  { id: 14, name: "Rei Ayanami", anime: "Evangelion" },
  { id: 15, name: "Sailor Moon", anime: "Sailor Moon" },
  { id: 16, name: "Tanjiro Kamado", anime: "Demon Slayer" },
  { id: 17, name: "Gojo Satoru", anime: "Jujutsu Kaisen" },
  { id: 18, name: "Itadori Yuji", anime: "Jujutsu Kaisen" },
  { id: 19, name: "Levi Ackerman", anime: "Attack on Titan" },
  { id: 20, name: "Eren Yeager", anime: "Attack on Titan" },
  { id: 21, name: "Naruto Uzumaki", anime: "Naruto" },
  { id: 22, name: "Sasuke Uchiha", anime: "Naruto" },
  { id: 23, name: "Goku", anime: "Dragon Ball" },
  { id: 24, name: "Vegeta", anime: "Dragon Ball" },
  { id: 25, name: "Luffy", anime: "One Piece" },
  { id: 26, name: "Zoro", anime: "One Piece" },
  { id: 27, name: "Todoroki Shoto", anime: "My Hero Academia" },
  { id: 28, name: "Deku", anime: "My Hero Academia" },
  { id: 29, name: "Shinobu Kocho", anime: "Demon Slayer" },
  { id: 30, name: "Mitsuri Kanroji", anime: "Demon Slayer" },
  { id: 31, name: "Ochaco Uraraka", anime: "My Hero Academia" },
  { id: 32, name: "Toga Himiko", anime: "My Hero Academia" },
  { id: 33, name: "Raphtalia", anime: "Shield Hero" },
  { id: 34, name: "Emilia", anime: "Re:Zero" },
];

// Generate pastel colors for placeholders
const getPlaceholderColor = (index: number) => {
  const colors = [
    "from-rose-light/60 to-rose/40",
    "from-sky/60 to-lavender/40",
    "from-cream/60 to-accent/40",
    "from-mint/60 to-sky/40",
    "from-lavender/60 to-rose-light/40",
    "from-accent/60 to-cream/40",
  ];
  return colors[index % colors.length];
};

const SamplesPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-8 px-4 watercolor-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-in-bottom">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">34 Unique Designs</span>
          </div>
          
          <h1 className="font-handwritten text-5xl sm:text-6xl text-foreground mb-4">
            Sample <span className="text-gradient">Gallery</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse our collection of anime character 3D toys! Each one is 
            handcrafted with love and attention to detail ✨
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {animeCharacters.map((character, index) => (
            <div
              key={character.id}
              className="group animate-scale-in"
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              <div className="glass-card rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-glow cursor-pointer">
                {/* Toy Preview */}
                <div className="aspect-square relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${getPlaceholderColor(index)}`}>
                    {/* Placeholder toy design */}
                    <div className="absolute inset-3 rounded-xl bg-background/40 backdrop-blur-sm flex items-center justify-center">
                      <div className="text-center p-2">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                          <Star className="w-6 h-6 text-primary fill-primary" />
                        </div>
                        <p className="font-handwritten text-foreground text-sm leading-tight">
                          {character.name.split(" ")[0]}
                        </p>
                      </div>
                    </div>
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  {/* Sparkle decoration */}
                  <Sparkles className="absolute top-2 right-2 w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity animate-sparkle" />
                </div>
                
                {/* Character Info */}
                <div className="p-3 text-center">
                  <h3 className="font-semibold text-foreground text-sm truncate">
                    {character.name}
                  </h3>
                  <p className="text-muted-foreground text-xs truncate">
                    {character.anime}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-slide-in-bottom" style={{ animationDelay: "1s" }}>
          <div className="glass-card rounded-3xl p-8 inline-block">
            <h2 className="font-handwritten text-3xl text-foreground mb-4">
              Want your own custom toy? 💕
            </h2>
            <p className="text-muted-foreground mb-6">
              Upload your OC and we'll create a unique 3D toy just for you!
            </p>
            <a href="/customize">
              <button className="bg-gradient-to-r from-rose to-rose-dark text-primary-foreground shadow-glow hover:shadow-[0_0_60px_hsl(340_65%_65%_/_0.5)] hover:scale-110 active:scale-100 font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-300">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Create Your Custom Toy
                </span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SamplesPage;
