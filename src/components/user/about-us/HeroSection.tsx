'use client';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  backgroundImage,
}) => {

  return (
    <div
      className="relative flex items-center justify-center h-[50vh] bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

      <div className="relative z-10 text-center text-gray-800 px-6 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-wide mt-2">
          {title}
        </h1>
        <p className="text-xs sm:text-sm mt-3 uppercase tracking-widest text-yellow-700">{subtitle}</p>
      </div>
    </div>
  );
};

export default HeroSection;
