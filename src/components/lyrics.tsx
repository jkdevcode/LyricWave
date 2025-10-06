import { useState, useEffect } from "react";

interface LyricsProps {
  currentTime: number;
  lyricsPath: string; // Nuevo prop
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
    <div className="text-center mt-6">
      <p className="text-lg font-semibold text-gradient bg-clip-text">
        {currentLine}
      </p>
    </div>
  );
};

export default Lyrics;
