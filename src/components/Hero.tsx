import { Play, Pause, Video, Image as ImageIcon, Cpu, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface HeroProps {
  isProcessing: boolean;
  onToggleProcessing: () => void;
  fps: number;
  processingTime: number;
}

export const Hero = ({ isProcessing, onToggleProcessing, fps, processingTime }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,191,255,0.1),transparent)]" />
      
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">OpenCV.js + WebGL Pipeline</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Real-Time Computer Vision
            <br />
            <span className="text-gradient-primary">Edge Detection Demo</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Advanced implementation of Android + OpenCV C++ + OpenGL concepts,
            <br />demonstrated through a modern web-based real-time processing pipeline
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={onToggleProcessing}
              className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary font-semibold px-8"
            >
              {isProcessing ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause Processing
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start Live Demo
                </>
              )}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30 hover:bg-primary/10 font-semibold px-8"
              onClick={() => document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Architecture
            </Button>
          </div>

          {/* Performance metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <Card className="p-4 bg-card/50 backdrop-blur border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">FPS</span>
              </div>
              <div className="text-2xl font-bold text-primary">{fps}</div>
            </Card>
            
            <Card className="p-4 bg-card/50 backdrop-blur border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">Processing</span>
              </div>
              <div className="text-2xl font-bold text-accent">{processingTime}ms</div>
            </Card>
            
            <Card className="p-4 bg-card/50 backdrop-blur border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Video className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Source</span>
              </div>
              <div className="text-sm font-semibold">WebCam</div>
            </Card>
            
            <Card className="p-4 bg-card/50 backdrop-blur border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <ImageIcon className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">Filter</span>
              </div>
              <div className="text-sm font-semibold">Canny Edge</div>
            </Card>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
