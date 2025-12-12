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
    let foundLine: Line | null = null;

    for (let i = lyricsData.length - 1; i >= 0; i--) {
      const line = lyricsData[i];

      if (line.time <= currentTime) {
        foundLine = line;
        break;
      }
    }

    setCurrentLine(foundLine ? foundLine.text : "");
  }, [currentTime, lyricsData]);

  return (
    <div className="flex items-center justify-center h-full p-8">
      <p className="text-3xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-400 to-blue-500 transition-all duration-300">
        {currentLine || "♪ ♪ ♪"}
      </p>
    </div>
  );
};

export default Lyrics;
