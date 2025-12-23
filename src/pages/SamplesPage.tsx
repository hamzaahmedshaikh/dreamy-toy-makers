import { useState } from "react";
import { Sparkles, Heart, Star, Wand2 } from "lucide-react";
import ImageLightbox from "@/components/ImageLightbox";

// Import all sample images - Original 34
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

// Import new 30 samples
import killua from "@/assets/samples/killua.png";
import gon from "@/assets/samples/gon.png";
import kakashi from "@/assets/samples/kakashi.png";
import sakura from "@/assets/samples/sakura.png";
import light from "@/assets/samples/light.png";
import lLawliet from "@/assets/samples/l-lawliet.png";
import edward from "@/assets/samples/edward.png";
import saber from "@/assets/samples/saber.png";
import kirito from "@/assets/samples/kirito.png";
import asuna from "@/assets/samples/asuna.png";
import ichigo from "@/assets/samples/ichigo.png";
import rukia from "@/assets/samples/rukia.png";
import inuyasha from "@/assets/samples/inuyasha.png";
import kagome from "@/assets/samples/kagome.png";
import natsu from "@/assets/samples/natsu.png";
import lucy from "@/assets/samples/lucy.png";
import erza from "@/assets/samples/erza.png";
import kaneki from "@/assets/samples/kaneki.png";
import lelouch from "@/assets/samples/lelouch.png";
import cc from "@/assets/samples/cc.png";
import ryuko from "@/assets/samples/ryuko.png";
import saitama from "@/assets/samples/saitama.png";
import mob from "@/assets/samples/mob.png";
import violet from "@/assets/samples/violet.png";
import aqua from "@/assets/samples/aqua.png";
import megumin from "@/assets/samples/megumin.png";
import hatsuneMiku from "@/assets/samples/hatsune-miku.png";
import yuno from "@/assets/samples/yuno.png";
import spike from "@/assets/samples/spike.png";
import frieren from "@/assets/samples/frieren.png";

interface Character {
  id: number;
  name: string;
  anime: string;
  image: string;
}

// Sample anime characters for the gallery
const animeCharacters: Character[] = [
  // Original 34
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
  // New 30
  { id: 35, name: "Killua Zoldyck", anime: "Hunter x Hunter", image: killua },
  { id: 36, name: "Gon Freecss", anime: "Hunter x Hunter", image: gon },
  { id: 37, name: "Kakashi Hatake", anime: "Naruto", image: kakashi },
  { id: 38, name: "Sakura Haruno", anime: "Naruto", image: sakura },
  { id: 39, name: "Light Yagami", anime: "Death Note", image: light },
  { id: 40, name: "L Lawliet", anime: "Death Note", image: lLawliet },
  { id: 41, name: "Edward Elric", anime: "Fullmetal Alchemist", image: edward },
  { id: 42, name: "Saber", anime: "Fate/Stay Night", image: saber },
  { id: 43, name: "Kirito", anime: "Sword Art Online", image: kirito },
  { id: 44, name: "Asuna", anime: "Sword Art Online", image: asuna },
  { id: 45, name: "Ichigo Kurosaki", anime: "Bleach", image: ichigo },
  { id: 46, name: "Rukia Kuchiki", anime: "Bleach", image: rukia },
  { id: 47, name: "Inuyasha", anime: "Inuyasha", image: inuyasha },
  { id: 48, name: "Kagome", anime: "Inuyasha", image: kagome },
  { id: 49, name: "Natsu Dragneel", anime: "Fairy Tail", image: natsu },
  { id: 50, name: "Lucy Heartfilia", anime: "Fairy Tail", image: lucy },
  { id: 51, name: "Erza Scarlet", anime: "Fairy Tail", image: erza },
  { id: 52, name: "Ken Kaneki", anime: "Tokyo Ghoul", image: kaneki },
  { id: 53, name: "Lelouch", anime: "Code Geass", image: lelouch },
  { id: 54, name: "C.C.", anime: "Code Geass", image: cc },
  { id: 55, name: "Ryuko Matoi", anime: "Kill la Kill", image: ryuko },
  { id: 56, name: "Saitama", anime: "One Punch Man", image: saitama },
  { id: 57, name: "Mob", anime: "Mob Psycho 100", image: mob },
  { id: 58, name: "Violet Evergarden", anime: "Violet Evergarden", image: violet },
  { id: 59, name: "Aqua", anime: "Konosuba", image: aqua },
  { id: 60, name: "Megumin", anime: "Konosuba", image: megumin },
  { id: 61, name: "Hatsune Miku", anime: "Vocaloid", image: hatsuneMiku },
  { id: 62, name: "Yuno Gasai", anime: "Future Diary", image: yuno },
  { id: 63, name: "Spike Spiegel", anime: "Cowboy Bebop", image: spike },
  { id: 64, name: "Frieren", anime: "Frieren: Beyond Journey's End", image: frieren },
];

const SamplesPage = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-8 px-4 watercolor-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-in-bottom">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 animate-sparkle" />
            <span className="text-sm font-medium">64 Unique Designs</span>
            <Star className="w-4 h-4 fill-accent text-accent animate-twinkle" />
          </div>
          
          <h1 className="font-handwritten text-5xl sm:text-6xl text-foreground mb-4">
            Sample <span className="text-gradient animate-shimmer-text">Gallery</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse our collection of anime character 3D toys! Each one is 
            handcrafted with love and attention to detail. Click any image to view larger 💕
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {animeCharacters.map((character, index) => (
            <div
              key={character.id}
              className="group animate-scale-in"
              style={{ animationDelay: `${index * 0.02}s` }}
              onClick={() => setSelectedCharacter(character)}
            >
              <div className="glass-card rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-glow cursor-pointer group-hover:animate-jelly">
                {/* Toy Preview */}
                <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-cream/40 to-sky/20">
                  <img 
                    src={character.image} 
                    alt={`${character.name} 3D toy figure`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Sparkle decorations */}
                  <Sparkles className="absolute top-2 right-2 w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity animate-sparkle" />
                  <Heart className="absolute bottom-2 left-2 w-3 h-3 text-primary fill-primary opacity-0 group-hover:opacity-100 transition-opacity animate-heartbeat" style={{ transitionDelay: "0.1s" }} />
                  <Star className="absolute top-2 left-2 w-3 h-3 text-accent fill-accent opacity-0 group-hover:opacity-100 transition-opacity animate-twinkle" style={{ transitionDelay: "0.2s" }} />
                </div>
                
                {/* Character Info */}
                <div className="p-3 text-center">
                  <h3 className="font-semibold text-foreground text-sm truncate group-hover:text-primary transition-colors">
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
          <div className="glass-card rounded-3xl p-8 inline-block hover:shadow-glow transition-all duration-500 group">
            <div className="flex justify-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-primary fill-primary animate-heartbeat" />
              <Sparkles className="w-6 h-6 text-primary animate-sparkle" />
              <Heart className="w-5 h-5 text-primary fill-primary animate-heartbeat" style={{ animationDelay: "0.3s" }} />
            </div>
            <h2 className="font-handwritten text-3xl text-foreground mb-4">
              Want your own custom toy?
            </h2>
            <p className="text-muted-foreground mb-6">
              Upload your OC and we'll create a unique 3D toy just for you! ✨
            </p>
            <a href="/customize">
              <button className="bg-gradient-to-r from-rose to-rose-dark text-primary-foreground shadow-glow hover:shadow-[0_0_60px_hsl(340_65%_65%_/_0.5)] hover:scale-110 active:scale-100 font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-300 group/btn">
                <span className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 group-hover/btn:animate-wiggle" />
                  Create Your Custom Toy
                  <Sparkles className="w-5 h-5 group-hover/btn:animate-sparkle" />
                </span>
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedCharacter && (
        <ImageLightbox
          isOpen={!!selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
          image={selectedCharacter.image}
          name={selectedCharacter.name}
          anime={selectedCharacter.anime}
        />
      )}
    </div>
  );
};

export default SamplesPage;
