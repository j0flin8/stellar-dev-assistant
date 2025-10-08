import { useState } from "react";
import { Hero } from "@/components/Hero";
import { VideoProcessor } from "@/components/VideoProcessor";
import { Architecture } from "@/components/Architecture";
import { Features } from "@/components/Features";
import { Github, Mail, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [fps, setFps] = useState(0);
  const [processingTime, setProcessingTime] = useState(0);

  // Main page component - handles state management for video processing demo
  return (
    <div className="min-h-screen bg-background">
      <Hero
        isProcessing={isProcessing}
        onToggleProcessing={() => setIsProcessing(!isProcessing)}
        fps={fps}
        processingTime={processingTime}
      />

      {/* Demo Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Live Demo
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-time edge detection using your webcam
            </p>
          </div>

          <VideoProcessor
            isProcessing={isProcessing}
            onFpsUpdate={setFps}
            onProcessingTimeUpdate={setProcessingTime}
          />

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              💡 This demo simulates the Android + OpenCV C++ + OpenGL pipeline in a web environment
            </p>
          </div>
        </div>
      </section>

      <Architecture />
      <Features />

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Android + OpenCV + OpenGL Assessment</h3>
            <p className="text-muted-foreground mb-6">
              R&D Intern Technical Demo - Computer Vision & Real-Time Processing
            </p>
            
            <div className="flex gap-4 justify-center mb-8">
              <Button variant="outline" size="icon" className="border-primary/30 hover:bg-primary/10">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="border-primary/30 hover:bg-primary/10">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="border-primary/30 hover:bg-primary/10">
                <Mail className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Built with React + TypeScript + OpenCV.js + WebGL</p>
              <p>Demonstrating Android NDK, JNI, OpenCV C++, and OpenGL ES concepts</p>
              <p className="font-mono text-primary">© 2025 - Assessment Project</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
