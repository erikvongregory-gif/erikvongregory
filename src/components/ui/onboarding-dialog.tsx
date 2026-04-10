"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import { CreditCard, Home, Image, Wand2 } from "lucide-react";

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

type Slide = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  icon: React.ComponentType<{ className?: string }>;
};

const slides: Slide[] = [
  {
    id: "welcome",
    icon: Home,
    alt: "Dashboard Übersicht",
    title: "Willkommen im Dashboard",
    description:
      "Hier siehst du zentrale Kennzahlen wie Tokens, aktive Kampagnen und aktuelle Aktivitäten auf einen Blick.",
    image: "/onboarding/dashboard-overview.svg",
  },
  {
    id: "content",
    icon: Wand2,
    alt: "Inhalte erstellen",
    title: "Inhalte erstellen mit KI",
    description:
      "Im Bereich Inhalte erstellen erzeugst du Prompts, nutzt Referenzbilder und generierst neue Motive für deine Brauerei.",
    image: "/onboarding/content-workflow.svg",
  },
  {
    id: "library",
    icon: Image,
    alt: "Mediathek",
    title: "Mediathek und Downloads",
    description:
      "Alle generierten Bilder werden in der Mediathek gespeichert. Dort kannst du Prompts prüfen und Dateien direkt herunterladen.",
    image: "/onboarding/media-library.svg",
  },
  {
    id: "subscription",
    icon: CreditCard,
    alt: "Abo und Tokens",
    title: "Abo und Token-Verbrauch",
    description:
      "Unter Abo & Tokens verwaltest du deinen Tarif, siehst den Verbrauch und kannst bei Bedarf auf einen anderen Plan wechseln.",
    image: "/onboarding/subscription-tokens.svg",
  },
];

type OnboardingDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function OnboardingDialog({ open, onClose }: OnboardingDialogProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi || !open) return;
    emblaApi.scrollTo(0);
    setActiveIndex(0);
  }, [emblaApi, open]);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const isFirstSlide = activeIndex === 0;
  const isLastSlide = activeIndex === slides.length - 1;
  const currentSlide = slides[activeIndex] ?? slides[0];

  const handleNext = () => {
    if (isLastSlide) {
      onClose();
      return;
    }
    emblaApi?.scrollNext();
  };

  const handlePrevious = () => emblaApi?.scrollPrev();

  const handleSkip = () => onClose();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60" onClick={handleSkip} />

          <motion.div
            className="relative mx-4 w-full max-w-lg overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="p-3 sm:p-4">
              <div ref={emblaRef} className="overflow-hidden rounded-lg">
                <div className="flex">
                  {slides.map((slide) => (
                    <div key={slide.id} className="min-w-0 flex-[0_0_100%]">
                      <div className="p-1">
                        <img
                          src={slide.image}
                          alt={slide.alt}
                          className="aspect-video w-full rounded-lg object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-center gap-2">
                {slides.map((slide, index) => (
                  <motion.div
                    key={slide.id}
                    animate={{
                      opacity: index === activeIndex ? 1 : 0.5,
                      width: index === activeIndex ? 24 : 16,
                    }}
                    initial={false}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <button
                      onClick={() => emblaApi?.scrollTo(index)}
                      aria-label={`Zu ${slide.title} wechseln`}
                      className={cn(
                        "h-2 w-full cursor-pointer rounded-full transition-colors",
                        index === activeIndex
                          ? "bg-gray-900 dark:bg-white"
                          : "bg-gray-300 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-400",
                      )}
                    />
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 grid px-1">
                {slides.map((slide) => (
                  <motion.div
                    key={slide.id}
                    animate={{ opacity: currentSlide.id === slide.id ? 1 : 0 }}
                    initial={false}
                    className="col-start-1 row-start-1"
                    style={{
                      pointerEvents:
                        currentSlide.id === slide.id ? "auto" : "none",
                    }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                  >
                    <div className="flex items-center gap-2">
                      <slide.icon className="h-4 w-4 text-[#c65a20]" />
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {slide.title}
                      </h2>
                    </div>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                      {slide.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between px-1 pb-1">
                <div>
                  {!isFirstSlide ? (
                    <button
                      onClick={handlePrevious}
                      className="cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                    >
                      Zurück
                    </button>
                  ) : null}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSkip}
                    className="cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                  >
                    Überspringen
                  </button>
                  <button
                    onClick={handleNext}
                    className="cursor-pointer rounded-md bg-[#c65a20] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#b14f1c]"
                  >
                    {isLastSlide ? "Los geht's" : "Weiter"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
