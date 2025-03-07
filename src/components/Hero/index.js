import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import DHXI from "@/assets/background/Ho_Chi_Minh_1946.jpg";

import styles from "./Hero.module.scss";
import { animateTitle, animateImage, revealMenu } from "./animations";

const Hero = () => {
  const timeline = useRef(gsap.timeline());
  const heroRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const tl = timeline.current;

      tl.add(animateTitle()).add(revealMenu(), 0).add(animateImage(), 0);
    }, heroRef);

    return () => context.revert();
  }, []);

  return (
    <section className={styles.hero} ref={heroRef}>
      <div className={styles.hero__top}>
        <span data-menu-item data-hidden>
          about
        </span>
        <span data-menu-item data-hidden>
          contact
        </span>
      </div>

      <h1 className={styles.hero__title}>
        <span data-hidden data-title-first>
          Ultra
        </span>
        <span data-hero-line className={styles.hero__line}></span>
        <span data-hidden data-title-last>
          agency
        </span>
      </h1>

      <div className={styles.hero__image}>
        <div data-image-overlay className={styles.hero__imageOverlay}></div>
        <Image
          data-image
          {...DHXI}
          width={1728}
          height={650}
          style={{ objectFit: "cover" }}
          alt="Đại hội VIII"
        />
      </div>
    </section>
  );
};

export default Hero;
