import { Card } from "@/components/ui/card";
import { Zap, Layers, Gauge, Code2, Smartphone, Globe, Camera, Cpu } from "lucide-react";

export const Features = () => {
  const features = [
    {
      icon: Camera,
      title: "Real-Time Camera Processing",
      description: "Live camera feed capture and processing at 30+ FPS using Camera2 API",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Cpu,
      title: "Native C++ OpenCV",
      description: "Canny edge detection and image processing in optimized native code",
      gradient: "from-cyan-500 to-primary"
    },
    {
      icon: Zap,
      title: "Hardware Acceleration",
      description: "OpenGL ES 2.0 for efficient GPU-based texture rendering",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Layers,
      title: "JNI Bridge",
      description: "Seamless Java/Kotlin to C++ communication for frame transfer",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Gauge,
      title: "Performance Monitoring",
      description: "Real-time FPS counter and frame processing time metrics",
      gradient: "from-orange-500 to-accent"
    },
    {
      icon: Globe,
      title: "Web Viewer Interface",
      description: "TypeScript-based debugging and visualization dashboard",
      gradient: "from-accent to-red-500"
    },
    {
      icon: Smartphone,
      title: "Android Optimized",
      description: "Efficient memory management and lifecycle handling",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: Code2,
      title: "Modular Architecture",
      description: "Clean separation of concerns with testable components",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Implementation Highlights
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Production-ready features demonstrating advanced mobile computer vision expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all hover:glow-primary group"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} p-2.5 mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-full h-full text-white" />
              </div>
              
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Tech stack badges */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-6">Technology Stack</h3>
          <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
            {[
              "Android SDK",
              "NDK",
              "OpenCV C++",
              "OpenGL ES 2.0",
              "JNI",
              "Camera2 API",
              "TypeScript",
              "WebGL",
              "GLSL Shaders"
            ].map((tech) => (
              <div
                key={tech}
                className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                <span className="text-sm font-mono text-primary font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
