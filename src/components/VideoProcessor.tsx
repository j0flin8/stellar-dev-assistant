import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, AlertCircle, Cpu } from "lucide-react";
import { toast } from "sonner";

interface VideoProcessorProps {
  isProcessing: boolean;
  onFpsUpdate: (fps: number) => void;
  onProcessingTimeUpdate: (time: number) => void;
}

export const VideoProcessor = ({ isProcessing, onFpsUpdate, onProcessingTimeUpdate }: VideoProcessorProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const processedCanvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCamera, setHasCamera] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const animationFrameRef = useRef<number>();
  const fpsCounterRef = useRef({ frames: 0, lastTime: performance.now() });

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        setIsLoading(true);
        // TODO: Add support for selecting different camera devices
        // Requesting 640x480 for better performance on mobile devices
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: 'user' }
        });
        
        console.log('Camera stream initialized:', stream.getVideoTracks()[0].getSettings());
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setHasCamera(true);
          toast.success("Camera connected successfully");
        }
      } catch (error) {
        console.error("Camera access error:", error);
        // Note: Some browsers (especially mobile Safari) can be finicky with camera permissions
        setHasCamera(false);
        toast.error("Camera access denied. Using demo mode.");
      } finally {
        setIsLoading(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isProcessing) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const processFrame = () => {
      const video = videoRef.current;
      const originalCanvas = originalCanvasRef.current;
      const processedCanvas = processedCanvasRef.current;

      if (!video || !originalCanvas || !processedCanvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
        animationFrameRef.current = requestAnimationFrame(processFrame);
        return;
      }

      const startTime = performance.now();

      // Set canvas dimensions to match video
      originalCanvas.width = video.videoWidth;
      originalCanvas.height = video.videoHeight;
      processedCanvas.width = video.videoWidth;
      processedCanvas.height = video.videoHeight;

      // Draw original frame
      const originalCtx = originalCanvas.getContext('2d');
      if (originalCtx) {
        originalCtx.drawImage(video, 0, 0);
      }

      // Process frame - simulating Canny edge detection
      // In production Android app, this would be done in C++ with OpenCV
      const processedCtx = processedCanvas.getContext('2d');
      if (processedCtx && originalCtx) {
        processedCtx.drawImage(video, 0, 0);
        
        const imageData = processedCtx.getImageData(0, 0, processedCanvas.width, processedCanvas.height);
        const data = imageData.data;

        // Basic edge detection algorithm
        // TODO: Replace with actual Canny edge detection once OpenCV.js is fully integrated
        // Currently using simplified threshold-based approach for demo
        for (let i = 0; i < data.length; i += 4) {
          // Convert to grayscale using standard luminosity formula
          const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
          
          // Simple edge detection - threshold at 50
          // Real Canny uses gradient magnitude and dual threshold
          const edge = Math.abs(gray - 128) > 50 ? 255 : 0;
          
          data[i] = edge;
          data[i + 1] = edge;
          data[i + 2] = edge;
        }

        processedCtx.putImageData(imageData, 0, 0);
      }

      // FPS calculation - update every second
      fpsCounterRef.current.frames++;
      const currentTime = performance.now();
      const elapsed = currentTime - fpsCounterRef.current.lastTime;
      
      if (elapsed >= 1000) {
        const fps = Math.round((fpsCounterRef.current.frames * 1000) / elapsed);
        onFpsUpdate(fps);
        fpsCounterRef.current.frames = 0;
        fpsCounterRef.current.lastTime = currentTime;
        
        // Debug: Log performance metrics periodically
        if (fps < 20) {
          console.warn('Low FPS detected:', fps);
        }
      }

      const processingTime = Math.round(performance.now() - startTime);
      onProcessingTimeUpdate(processingTime);

      animationFrameRef.current = requestAnimationFrame(processFrame);
    };

    processFrame();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isProcessing, onFpsUpdate, onProcessingTimeUpdate]);

  if (!hasCamera && !isLoading) {
    return (
      <Card className="p-8 bg-card/50 backdrop-blur border-border/50 text-center">
        <AlertCircle className="w-12 h-12 text-accent mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Camera Access Required</h3>
        <p className="text-muted-foreground mb-4">
          Please grant camera permissions to see the live demo
        </p>
        <Button onClick={() => window.location.reload()} className="bg-primary hover:bg-primary/90">
          <Camera className="w-4 h-4 mr-2" />
          Retry Camera Access
        </Button>
      </Card>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="overflow-hidden bg-card/50 backdrop-blur border-border/50">
        <div className="bg-secondary/50 px-4 py-2 border-b border-border/50">
          <h3 className="font-mono text-sm font-semibold text-primary">Original Feed</h3>
        </div>
        <div className="aspect-video bg-black/50 flex items-center justify-center relative">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            playsInline
            muted
          />
          <canvas
            ref={originalCanvasRef}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ display: isProcessing ? 'none' : 'block' }}
          />
          {!isProcessing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Camera className="w-16 h-16 text-muted-foreground" />
            </div>
          )}
        </div>
      </Card>

      <Card className="overflow-hidden bg-card/50 backdrop-blur border-border/50 glow-primary">
        <div className="bg-primary/10 px-4 py-2 border-b border-primary/30">
          <h3 className="font-mono text-sm font-semibold text-primary">Processed Output (Canny Edge Detection)</h3>
        </div>
        <div className="aspect-video bg-black/50 flex items-center justify-center relative">
          <canvas
            ref={processedCanvasRef}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {!isProcessing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-center">
                <Cpu className="w-16 h-16 text-primary mx-auto mb-2 animate-pulse" />
                <p className="text-sm text-muted-foreground">Click "Start Live Demo" to begin</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
