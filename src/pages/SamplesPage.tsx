import { Sparkles } from "lucide-react";

// Import all sample images
import marinKitagawa from "@/assets/samples/marin-kitagawa.png";
import zeroTwo from "@/assets/samples/zero-two.png";
import rem from "@/assets/samples/rem.png";
import nezuko from "@/assets/samples/nezuko.png";
import mikuNakano from "@/assets/samples/miku-nakano.png";
import chika from "@/assets/samples/chika.png";
import yor from "@/assets/samples/yor.png";
import anya from "@/assets/samples/anya.png";
import makima from "@/assets/samples/makima.png";
import power from "@/assets/samples/power.png";
import hinata from "@/assets/samples/hinata.png";
import mikasa from "@/assets/samples/mikasa.png";
import asuka from "@/assets/samples/asuka.png";
import rei from "@/assets/samples/rei.png";
import sailorMoon from "@/assets/samples/sailor-moon.png";
import tanjiro from "@/assets/samples/tanjiro.png";
import gojo from "@/assets/samples/gojo.png";
import itadori from "@/assets/samples/itadori.png";
import levi from "@/assets/samples/levi.png";
import eren from "@/assets/samples/eren.png";
import naruto from "@/assets/samples/naruto.png";
import sasuke from "@/assets/samples/sasuke.png";
import goku from "@/assets/samples/goku.png";
import vegeta from "@/assets/samples/vegeta.png";
import luffy from "@/assets/samples/luffy.png";
import zoro from "@/assets/samples/zoro.png";
import todoroki from "@/assets/samples/todoroki.png";
import deku from "@/assets/samples/deku.png";
import shinobu from "@/assets/samples/shinobu.png";
import mitsuri from "@/assets/samples/mitsuri.png";
import ochaco from "@/assets/samples/ochaco.png";
import toga from "@/assets/samples/toga.png";
import raphtalia from "@/assets/samples/raphtalia.png";
import emilia from "@/assets/samples/emilia.png";

// Sample anime characters for the gallery
const animeCharacters = [
  { id: 1, name: "Marin Kitagawa", anime: "My Dress-Up Darling", image: marinKitagawa },
  { id: 2, name: "Zero Two", anime: "Darling in the Franxx", image: zeroTwo },
  { id: 3, name: "Rem", anime: "Re:Zero", image: rem },
  { id: 4, name: "Nezuko Kamado", anime: "Demon Slayer", image: nezuko },
  { id: 5, name: "Miku Nakano", anime: "Quintessential Quintuplets", image: mikuNakano },
  { id: 6, name: "Chika Fujiwara", anime: "Kaguya-sama", image: chika },
  { id: 7, name: "Yor Forger", anime: "Spy x Family", image: yor },
  { id: 8, name: "Anya Forger", anime: "Spy x Family", image: anya },
  { id: 9, name: "Makima", anime: "Chainsaw Man", image: makima },
  { id: 10, name: "Power", anime: "Chainsaw Man", image: power },
  { id: 11, name: "Hinata Hyuga", anime: "Naruto", image: hinata },
  { id: 12, name: "Mikasa Ackerman", anime: "Attack on Titan", image: mikasa },
  { id: 13, name: "Asuka Langley", anime: "Evangelion", image: asuka },
  { id: 14, name: "Rei Ayanami", anime: "Evangelion", image: rei },
  { id: 15, name: "Sailor Moon", anime: "Sailor Moon", image: sailorMoon },
  { id: 16, name: "Tanjiro Kamado", anime: "Demon Slayer", image: tanjiro },
  { id: 17, name: "Gojo Satoru", anime: "Jujutsu Kaisen", image: gojo },
  { id: 18, name: "Itadori Yuji", anime: "Jujutsu Kaisen", image: itadori },
  { id: 19, name: "Levi Ackerman", anime: "Attack on Titan", image: levi },
  { id: 20, name: "Eren Yeager", anime: "Attack on Titan", image: eren },
  { id: 21, name: "Naruto Uzumaki", anime: "Naruto", image: naruto },
  { id: 22, name: "Sasuke Uchiha", anime: "Naruto", image: sasuke },
  { id: 23, name: "Goku", anime: "Dragon Ball", image: goku },
  { id: 24, name: "Vegeta", anime: "Dragon Ball", image: vegeta },
  { id: 25, name: "Luffy", anime: "One Piece", image: luffy },
  { id: 26, name: "Zoro", anime: "One Piece", image: zoro },
  { id: 27, name: "Todoroki Shoto", anime: "My Hero Academia", image: todoroki },
  { id: 28, name: "Deku", anime: "My Hero Academia", image: deku },
  { id: 29, name: "Shinobu Kocho", anime: "Demon Slayer", image: shinobu },
  { id: 30, name: "Mitsuri Kanroji", anime: "Demon Slayer", image: mitsuri },
  { id: 31, name: "Ochaco Uraraka", anime: "My Hero Academia", image: ochaco },
  { id: 32, name: "Toga Himiko", anime: "My Hero Academia", image: toga },
  { id: 33, name: "Raphtalia", anime: "Shield Hero", image: raphtalia },
  { id: 34, name: "Emilia", anime: "Re:Zero", image: emilia },
];

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
                <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-cream/40 to-sky/20">
                  <img 
                    src={character.image} 
                    alt={`${character.name} 3D toy figure`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
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
