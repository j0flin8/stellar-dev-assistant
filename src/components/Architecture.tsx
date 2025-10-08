import { Card } from "@/components/ui/card";
import { Code2, Layers, Cpu, Eye, Smartphone, Globe } from "lucide-react";

export const Architecture = () => {
  const architectureFlow = [
    {
      icon: Smartphone,
      title: "Android Layer",
      description: "Camera2 API captures frames via TextureView/SurfaceTexture",
      color: "text-green-400",
      tech: "Java/Kotlin"
    },
    {
      icon: Layers,
      title: "JNI Bridge",
      description: "Native interface passes frames to C++ processing layer",
      color: "text-blue-400",
      tech: "JNI/NDK"
    },
    {
      icon: Cpu,
      title: "OpenCV C++",
      description: "Canny edge detection & image processing in native code",
      color: "text-primary",
      tech: "C++/OpenCV"
    },
    {
      icon: Eye,
      title: "OpenGL ES",
      description: "Hardware-accelerated texture rendering at 30+ FPS",
      color: "text-purple-400",
      tech: "OpenGL ES 2.0"
    },
    {
      icon: Globe,
      title: "Web Viewer",
      description: "TypeScript interface for debugging & frame inspection",
      color: "text-accent",
      tech: "TypeScript/HTML"
    }
  ];

  return (
    <section id="architecture" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Code2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">System Design</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Complete Architecture
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Full-stack implementation from camera capture to real-time rendering
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6 mb-12">
          {architectureFlow.map((layer, index) => (
            <div key={layer.title} className="relative">
              <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all hover:glow-primary h-full">
                <layer.icon className={`w-12 h-12 ${layer.color} mb-4`} />
                <h3 className="text-lg font-bold mb-2">{layer.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{layer.description}</p>
                <div className="inline-flex items-center px-2 py-1 rounded bg-primary/10 border border-primary/20">
                  <span className="text-xs font-mono text-primary">{layer.tech}</span>
                </div>
              </Card>
              
              {index < architectureFlow.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <div className="w-6 h-0.5 bg-primary/30" />
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-primary rotate-45 transform translate-x-1/2" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Code snippets */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold">JNI Integration</h3>
            </div>
            <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono text-primary">
{`// Native method declaration
public native Mat processFrame(
  long matAddr
);

// C++ implementation
JNIEXPORT jlong JNICALL
Java_EdgeDetector_processFrame(
  JNIEnv* env, 
  jobject, 
  jlong matAddr
) {
  cv::Mat& frame = 
    *(cv::Mat*)matAddr;
  cv::Canny(frame, edges, 
    50, 150);
  return (jlong)&edges;
}`}
              </code>
            </pre>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-bold">OpenGL Rendering</h3>
            </div>
            <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono text-accent">
{`// Texture binding
glBindTexture(
  GL_TEXTURE_2D, 
  textureId
);

// Upload processed frame
glTexImage2D(
  GL_TEXTURE_2D, 0,
  GL_RGBA, width, height,
  0, GL_RGBA,
  GL_UNSIGNED_BYTE,
  processedData
);

// Render quad
glDrawArrays(
  GL_TRIANGLE_STRIP, 
  0, 4
);`}
              </code>
            </pre>
          </Card>
        </div>
      </div>
    </section>
  );
};
