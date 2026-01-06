import { useEffect, useState } from "react";
import { useColorTheme } from "@/hooks/use-color-theme";
interface LyricItem {
  start?: number;
  end?: number;
  time?: number;
  text: string;
}

interface LyricsProps {
  currentTime: number;
  lyricsPath: string;
  mode?: "phrases" | "words";
}

const Lyrics = ({ currentTime, lyricsPath }: LyricsProps) => {
  const { appColor } = useColorTheme();
  const [lyricsData, setLyricsData] = useState<LyricItem[]>([]);
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

    // Detect format based on first item
    const isWordMode = "start" in lyricsData[0];

    if (isWordMode) {
      // Word-by-word logic (start/end window)
      const activeLyrics = lyricsData.filter(
        (item) =>
          item.start !== undefined &&
          item.end !== undefined &&
          currentTime >= item.start &&
          currentTime <= item.end,
      );

      if (activeLyrics.length > 0) {
        const bestMatch = activeLyrics.reduce((prev, current) => {
          return (prev.start || 0) > (current.start || 0) ? prev : current;
        });

        setCurrentLine(bestMatch.text);
      } else {
        setCurrentLine("");
      }
    } else {
      // Phrase-by-phrase logic (time threshold)
      let foundLine: LyricItem | null = null;

      for (let i = lyricsData.length - 1; i >= 0; i--) {
        const line = lyricsData[i];

        if (line.time !== undefined && line.time <= currentTime) {
          foundLine = line;
          break;
        }
      }
      setCurrentLine(foundLine ? foundLine.text : "");
    }
  }, [currentTime, lyricsData]);

  return (
    <p className={`text-3xl md:text-5xl p-2 font-bold text-center text-${appColor} transition-all duration-300`}>
      {currentLine || "🎧 🎶"}
    </p>
  );
};

export default Lyrics;
