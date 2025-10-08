import { useState, useEffect } from "react";
interface LyricsProps {
  currentTime: number;
  lyricsPath: string;
}
interface Line {
  time: number;
  text: string;
}

const Lyrics = ({ currentTime, lyricsPath }: LyricsProps) => {
  const [lyricsData, setLyricsData] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState("");

  // Cargar lyrics cuando cambia la canción
  useEffect(() => {
    if (!lyricsPath) return;
    fetch(lyricsPath)
      .then((res) => res.json())
      .then((data) => setLyricsData(data))
      .catch(() => setLyricsData([]));
  }, [lyricsPath]);

  // Actualizar línea actual
  useEffect(() => {
    if (!lyricsData.length) {
      setCurrentLine("");
      return;
    }
    const current = lyricsData.findLast((line) => line.time <= currentTime);
    setCurrentLine(current ? current.text : "");
  }, [currentTime, lyricsData]);

  return (
    <div className="flex items-center justify-center h-full p-8">
      <p className="text-3xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-all duration-300">
        {currentLine || "♪ ♪ ♪"}
      </p>
    </div>
  );
};

export default Lyrics;