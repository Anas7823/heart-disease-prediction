// Je cree le composant FigureViewer avec lazy loading, placeholder d'erreur et lightbox
"use client";

import { useState } from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { X, ImageOff } from "lucide-react";

interface FigureViewerProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export function FigureViewer({
  src,
  alt,
  caption,
  className,
}: FigureViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <figure
        className={clsx("glass p-3 group", !hasError && "cursor-pointer", className)}
        onClick={() => !hasError && setIsOpen(true)}
      >
        <div className="relative overflow-hidden rounded-lg aspect-[16/10] bg-white/[0.02]">
          {hasError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-text-muted">
              <ImageOff size={32} strokeWidth={1.5} />
              <p className="text-xs text-center px-4">Image non disponible</p>
            </div>
          ) : (
            <>
              {/* Skeleton de chargement */}
              {!isLoaded && (
                <div className="absolute inset-0 animate-pulse bg-white/[0.03] rounded-lg" />
              )}
              <Image
                src={src}
                alt={alt}
                width={800}
                height={500}
                className={clsx(
                  "w-full h-full object-contain transition-all duration-300",
                  isLoaded ? "opacity-100 group-hover:scale-[1.02]" : "opacity-0"
                )}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
              />
            </>
          )}
        </div>
        {caption && (
          <figcaption className="mt-3 text-xs text-text-muted text-center">
            {caption}
          </figcaption>
        )}
      </figure>

      {isOpen && !hasError && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setIsOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
            onClick={() => setIsOpen(false)}
            aria-label="Fermer"
          >
            <X size={28} />
          </button>
          <Image
            src={src}
            alt={alt}
            width={1400}
            height={900}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
