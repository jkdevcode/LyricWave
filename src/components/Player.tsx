import { useState, useRef, useEffect } from "react";
import { Button } from "@heroui/button";
import { Slider } from "@heroui/slider";
import { Card, CardBody } from "@heroui/card";

import Lyrics from "./lyrics";

import {
  HeartIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  NextIcon,
  PreviousIcon,
  RepeatOneIcon,
  ShuffleIcon,
} from "@/components/icons";
import musicData from "@/assets/music/music.json";

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

  // Reproduce automáticamente al cambiar de canción si estaba en play
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (isPlaying) {
        audioRef.current.play();
      }
    }
    // Opcional: resetear el like por canción
    // setLiked(false);
  }, [currentSongIndex]);

  // Si termina la canción, pasa a la siguiente automáticamente
  const handleEnded = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      handleNext();
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
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
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-[410px]"
        shadow="sm"
      >
        <CardBody className="flex flex-col items-center gap-6">
          {/* 🎵 Info de la canción */}
          <div className="flex justify-between items-start w-full">
            <div className="flex flex-col gap-0">
              <h2 className="text-xl font-bold">{currentSong.title}</h2>
              <p className="text-sm opacity-80">{currentSong.artist}</p>
            </div>
            {/* ❤️ Like */}
            <Button
              isIconOnly
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

          {/* 🎵 Audio oculto */}
          <audio
            ref={audioRef}
            preload="metadata"
            src={currentSong.src}
            onEnded={handleEnded}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
          />

          {/* 🎶 Barra de progreso */}
          <Slider
            aria-label="Progress"
            className="w-full"
            maxValue={duration}
            minValue={0}
            size="sm"
            step={0.1}
            value={currentTime}
            onChange={handleSliderChange}
          />

          {/* ⏱️ Tiempos */}
          <div className="flex justify-between w-full text-xs opacity-80">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* 🎛️ Controles */}
          <div className="flex items-center justify-center gap-6">
            <Button
              isIconOnly
              className={`data-hover:bg-foreground/10! ${isRepeat ? "text-primary" : ""}`}
              radius="full"
              variant="light"
              onClick={() => setIsRepeat((r) => !r)}
            >
              <RepeatOneIcon size={24} />
            </Button>

            <Button
              isIconOnly
              className="data-hover:bg-foreground/10!"
              radius="full"
              variant="light"
              onClick={handlePrevious}
            >
              <PreviousIcon size={28} />
            </Button>

            <Button
              isIconOnly
              className="data-hover:bg-foreground/10!"
              radius="full"
              variant="light"
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
              className="data-hover:bg-foreground/10!"
              radius="full"
              variant="light"
              onClick={handleNext}
            >
              <NextIcon size={28} />
            </Button>

            <Button
              isIconOnly
              className={`data-hover:bg-foreground/10! ${isShuffle ? "text-primary" : ""}`}
              radius="full"
              variant="light"
              onClick={() => setIsShuffle((s) => !s)}
            >
              <ShuffleIcon size={24} />
            </Button>
          </div>
        </CardBody>
      </Card>
      <Lyrics currentTime={currentTime} lyricsPath={currentSong.lyrics} />
    </>
  );
};

export default Player;
