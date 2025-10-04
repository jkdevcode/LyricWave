// src/components/Player.tsx
import { useState } from "react";
import { Button } from "@heroui/button";
import { Slider } from "@heroui/slider";
import { Card, CardBody } from "@heroui/card";

// 👇 Importa todos los íconos que ya tienes en icons.tsx
import {
  HeartIcon,
  PauseCircleIcon,
  NextIcon,
  PreviousIcon,
  RepeatOneIcon,
  ShuffleIcon,
} from "@/components/icons";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Aquí luego conectamos con <audio> o Tone.js
  };

  return (
    <Card className="w-full max-w-lg mx-auto mt-10 bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl">
      <CardBody className="flex flex-col items-center gap-6">
        {/* 🎵 Info de la canción */}
        <h2 className="text-xl font-bold">Rock That Body</h2>
        <p className="text-sm opacity-80">The Black Eyed Peas (Edit)</p>

        {/* 🎶 Barra de progreso */}
        <Slider
          aria-label="Progress"
          className="w-full"
          defaultValue={30}
          maxValue={100}
          minValue={0}
          size="sm"
          step={0.1}
        />

        {/* ⏱️ Tiempos */}
        <div className="flex justify-between w-full text-xs opacity-80">
          <span>1:23</span>
          <span>4:32</span>
        </div>

        {/* 🎛️ Controles */}
        <div className="flex items-center justify-center gap-6">
          <Button isIconOnly radius="full" variant="light">
            <RepeatOneIcon size={24} />
          </Button>

          <Button isIconOnly radius="full" variant="light">
            <PreviousIcon size={28} />
          </Button>

          <Button
            isIconOnly
            radius="full"
            variant="light"
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <PauseCircleIcon size={48} />
            ) : (
              <PauseCircleIcon size={48} />
            )}
            {/* 👉 Aquí puedes cambiar PauseCircleIcon por PlayCircleIcon si lo agregas en icons.tsx */}
          </Button>

          <Button isIconOnly radius="full" variant="light">
            <NextIcon size={28} />
          </Button>

          <Button isIconOnly radius="full" variant="light">
            <ShuffleIcon size={24} />
          </Button>
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
      </CardBody>
    </Card>
  );
};

export default Player;
