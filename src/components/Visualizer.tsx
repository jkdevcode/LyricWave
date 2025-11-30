import { useRef, useEffect } from "react";
import { useTheme } from "@/hooks/use-theme.tsx";
import { getSharedAnalyser } from "./Player";

interface VisualizerProps {
  isPlaying: boolean;
}

export default function Visualizer({ isPlaying }: VisualizerProps) {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const particleCount = 150;

    // Ajustar tamaño del canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Crear partículas
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    const dataArray = new Uint8Array(128);

    // Función de animación
    // Función de animación
    const animate = () => {
      const isDark = theme === "dark";
      
      ctx.fillStyle = isDark ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      let audioIntensity = 0;

      // Usar el analizador compartido del Player
      const analyser = getSharedAnalyser();

      if (analyser && isPlaying) {
        try {
          analyser.getByteFrequencyData(dataArray);
          audioIntensity =
            dataArray.reduce((a, b) => a + b, 0) / dataArray.length / 255;
        } catch (error) {
          console.warn("Error al obtener datos de frecuencia:", error);
        }
      }

      particlesRef.current.forEach((particle) => {
        // Actualizar posición
        const speed = 1 + audioIntensity * 3;

        particle.x += particle.vx * speed;
        particle.y += particle.vy * speed;

        // Rebotar en los bordes
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Mantener dentro del canvas
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Dibujar partícula con glow
        const glowSize = particle.size + audioIntensity * 10;
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          glowSize,
        );

        gradient.addColorStop(
          0,
          isDark 
            ? `rgba(96, 165, 250, ${particle.opacity + audioIntensity * 0.5})`
            : `rgba(37, 99, 235, ${particle.opacity + audioIntensity * 0.5})`,
        );
        gradient.addColorStop(
          0.5,
          isDark
            ? `rgba(147, 51, 234, ${particle.opacity * 0.5})`
            : `rgba(126, 34, 206, ${particle.opacity * 0.5})`,
        );
        gradient.addColorStop(1, isDark ? "rgba(96, 165, 250, 0)" : "rgba(37, 99, 235, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // Dibujar conexiones entre partículas cercanas
      if (isPlaying) {
        particlesRef.current.forEach((p1, i) => {
          particlesRef.current.slice(i + 1).forEach((p2) => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              const strokeColor = isDark 
                ? `rgba(147, 51, 234, ${(1 - distance / 100) * 0.2 * (1 + audioIntensity)})`
                : `rgba(126, 34, 206, ${(1 - distance / 100) * 0.2 * (1 + audioIntensity)})`;
              
              ctx.strokeStyle = strokeColor;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          });
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 bg-background transition-colors duration-300"
    />
  );
}
