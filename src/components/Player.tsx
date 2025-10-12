import { useState, useRef, useEffect } from "react";
import { Button } from "@heroui/button";
import { Slider } from "@heroui/slider";

import musicData from "../../public/music/music.json";

import Lyrics from "./lyrics";
import Visualizer from "./Visualizer";

import {
  HeartIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  NextIcon,
  PreviousIcon,
  RepeatOneIcon,
  ShuffleIcon,
} from "@/components/icons";

// Crear un contexto de audio compartido (Singleton)
let sharedAudioContext: AudioContext | null = null;
let sharedAnalyser: AnalyserNode | null = null;
let sharedSource: MediaElementAudioSourceNode | null = null;

export const getSharedAudioContext = () => {
  if (!sharedAudioContext) {
    sharedAudioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
  }

  return sharedAudioContext;
};

export const getSharedAnalyser = () => {
  return sharedAnalyser;
};

export const initializeSharedAudio = (audioElement: HTMLAudioElement) => {
  try {
    const audioContext = getSharedAudioContext();

    if (!sharedAnalyser) {
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 256;

      if (!sharedSource) {
        const source = audioContext.createMediaElementSource(audioElement);

        source.connect(analyser);
        analyser.connect(audioContext.destination);
        sharedSource = source;
      }

      sharedAnalyser = analyser;
    }

    // Asegurar que el contexto esté activo
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
  } catch (error) {
    console.error("Error al inicializar AudioContext:", error);
  }
};

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = musicData[currentSongIndex];
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Inicializar AudioContext compartido una sola vez
  useEffect(() => {
    if (audioRef.current) {
      initializeSharedAudio(audioRef.current);
    }
  }, []);

  // Reproduce automáticamente al cambiar de canción si estaba en play
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);

      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Error al reproducir:", error);
        });
      }
    }
  }, [currentSongIndex, isPlaying]);

  // Si termina la canción, pasa a la siguiente automáticamente
  const handleEnded = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((error) => {
          console.error("Error al reiniciar:", error);
        });
      }
    } else {
      handleNext();
    }
  };

  const handlePlayPause = async () => {
    if (!audioRef.current) return;

    // Asegurar que el AudioContext esté activo
    const audioContext = getSharedAudioContext();

    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    if (!isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Error al reproducir:", error);
      });
    } else {
      audioRef.current.pause();
    }

    setIsPlaying(!isPlaying);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleNext = () => {
    if (isShuffle) {
      let nextIndex;

      do {
        nextIndex = Math.floor(Math.random() * musicData.length);
      } while (nextIndex === currentSongIndex && musicData.length > 1);

      setCurrentSongIndex(nextIndex);
    } else {
      setCurrentSongIndex((prev) => (prev + 1) % musicData.length);
    }
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prev) =>
      prev === 0 ? musicData.length - 1 : prev - 1,
    );
  };

  const handleSliderChange = (value: number | number[]) => {
    if (audioRef.current) {
      const newTime = Array.isArray(value) ? value[0] : value;

      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      <Visualizer isPlaying={isPlaying} />

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen">
          {/* Reproductor */}
          <div className="flex justify-center items-center order-1">
            <div className="w-full max-w-md bg-black/40 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
              {/* Info de la canción */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {currentSong.title}
                  </h2>
                  <p className="text-gray-400">{currentSong.artist}</p>
                </div>
                <Button
                  isIconOnly
                  className="hover:bg-white/10 transition-all duration-200"
                  radius="full"
                  variant="light"
                  onClick={() => setLiked(!liked)}
                >
                  <HeartIcon
                    className={liked ? "[&>path]:stroke-transparent" : ""}
                    fill={liked ? "currentColor" : "none"}
                    size={24}
                  />
                </Button>
              </div>

              {/* Audio */}
              <audio
                ref={audioRef}
                preload="metadata"
                src={currentSong.src}
                onEnded={handleEnded}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
              />

              {/* Barra de progreso */}
              <Slider
                aria-label="Progress"
                className="w-full mb-2"
                classNames={{
                  track: "bg-gray-700",
                  filler: "bg-gradient-to-r from-blue-500 to-purple-500",
                  thumb: "bg-white shadow-lg",
                }}
                maxValue={duration}
                minValue={0}
                size="sm"
                step={0.1}
                value={currentTime}
                onChange={handleSliderChange}
              />

              {/* Tiempos */}
              <div className="flex justify-between text-sm text-gray-400 mb-8">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Controles */}
              <div className="flex items-center justify-center gap-6">
                <Button
                  isIconOnly
                  className={`hover:bg-white/10 transition-all duration-200 ${
                    isRepeat ? "text-blue-400" : "text-gray-400"
                  }`}
                  radius="full"
                  variant="light"
                  onClick={() => setIsRepeat((r) => !r)}
                >
                  <RepeatOneIcon size={24} />
                </Button>

                <Button
                  isIconOnly
                  className="hover:bg-white/10 transition-all duration-200"
                  radius="full"
                  variant="light"
                  onClick={handlePrevious}
                >
                  <PreviousIcon size={28} />
                </Button>

                <Button
                  isIconOnly
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200 transform hover:scale-105"
                  radius="full"
                  size="lg"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <PauseCircleIcon size={48} />
                  ) : (
                    <PlayCircleIcon size={48} />
                  )}
                </Button>

                <Button
                  isIconOnly
                  className="hover:bg-white/10 transition-all duration-200"
                  radius="full"
                  variant="light"
                  onClick={handleNext}
                >
                  <NextIcon size={28} />
                </Button>

                <Button
                  isIconOnly
                  className={`hover:bg-white/10 transition-all duration-200 ${
                    isShuffle ? "text-blue-400" : "text-gray-400"
                  }`}
                  radius="full"
                  variant="light"
                  onClick={() => setIsShuffle((s) => !s)}
                >
                  <ShuffleIcon size={24} />
                </Button>
              </div>
            </div>
          </div>

          {/* Letras */}
          <div className="flex items-center justify-center min-h-[300px] lg:min-h-[500px] order-2">
            <div className="w-full max-w-2xl bg-black/20 backdrop-blur-md rounded-3xl p-8 border border-white/5">
              <Lyrics
                currentTime={currentTime}
                lyricsPath={currentSong.lyrics}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
