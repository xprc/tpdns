import React from "react";
import { SectionHero } from "./section-hero";
import { SectionFreeStart } from "./section-free-start";
import { SectionBullets } from "./section-bullets";
import { SectionFeatures } from "./section-features";
import { SectionUseCase } from "./section-use-case";
import SectionReady from "./section-ready";

export const Landing: React.FC = () => {
    return (
        <main id="landing_main">
            <SectionHero />
            <SectionFreeStart />
            <SectionBullets />
            <SectionFeatures />
            <SectionUseCase />
            <SectionReady />
        </main>
    );
};
