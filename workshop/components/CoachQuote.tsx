import Image from "next/image";
import { Quote } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { COACH } from "@/lib/config";

export function CoachQuote() {
  return (
    <Section tone="cream">
      <div className="max-w-3xl mx-auto">
        <div className="grid sm:grid-cols-[auto,1fr] gap-6 sm:gap-8 items-start">
          <div className="flex justify-center sm:justify-start">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-white shadow-lifted bg-navy-100">
              <Image
                src="/ales-vrana.jpg"
                alt={`Portrét: ${COACH.fullName}`}
                fill
                sizes="(max-width: 640px) 96px, 128px"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <Quote className="h-8 w-8 text-teal-400 mb-3" aria-hidden />
            <blockquote className="text-lg sm:text-xl text-dark leading-relaxed">
              <p>
                <span className="font-semibold">Workshop nezjistí, jestli jste „už hotový kouč".</span>{" "}
                Zjistíte prakticky, jestli s Vámi koučování rezonuje, jak se cítíte v roli
                kouče i v roli koučovaného. Zjistíte, jestli Vás to bude bavit. To stačí.
                Zbytek se dá vytrénovat.
              </p>
            </blockquote>
            <footer className="mt-4 text-sm sm:text-base text-navy-700 font-semibold">
              — {COACH.fullName}
            </footer>
          </div>
        </div>
      </div>
    </Section>
  );
}
