import ListaCocktails from "@/components/listaCocktails";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useState, useContext, useRef } from "react";
import { useRouter } from "next/router";
import HeaderContext from "@/context/headerContext";
import "swiper/css";
import "swiper/css/navigation";

import {
  drinkMadrid,
  drinkCartagena,
  drinkIbiza,
  drinkAustralia,
  drinkSicilia,
  drinkBudapest,
  drinkPraga,
  drinkSeoul
} from "@/data/cocktail";

const Lista_signature = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const swiperRef = useRef(null);

  const ids = [
    "drinkMadrid",
    "drinkCartagena",
    "drinkIbiza",
    "drinkAustralia",
    "drinkSicilia",
    "drinkBudapest",
    "drinkPraga",
    "drinkSeoul",
  ];
  const cocktailNames = [
    "Madrid",
    "Mosca",
    "Santa Claus Village",
    "Hawaii",
    "Toronto",
    "New York",
    "Praga",
    "Seoul",
  ];

  const { setNomeHeader, setHeaderColorato, setHeaderId } =
    useContext(HeaderContext);
  const router = useRouter();

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Dopo che siamo nel browser, leggi l'hash e aggiorna lo slide attivo
  useEffect(() => {
    if (isBrowser) {
      const hash = window.location.hash.substring(1);
      const index = ids.indexOf(hash);
      if (index !== -1) {
        setActiveSlide(index);
      }
    }
  }, [isBrowser]);

  // Aggiorna Swiper quando cambia activeSlide
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideToLoop(activeSlide, 0); // 0 = no animation
    }
  }, [activeSlide]);

  // Aggiorna l'header context
  useEffect(() => {
    if (setNomeHeader) setNomeHeader(cocktailNames[activeSlide]);
    if (setHeaderColorato) setHeaderColorato(false);
    if (setHeaderId) setHeaderId(cocktailNames[activeSlide]);
  }, [activeSlide, setNomeHeader, setHeaderColorato, setHeaderId]);

  // Gestisce il cambio slide e aggiorna l'URL
  const handleSlideChange = (swiper) => {
    const newIndex = swiper.realIndex;
    if (newIndex !== activeSlide) {
      setActiveSlide(newIndex);
      if (isBrowser) {
        window.history.pushState(null, "", `#${ids[newIndex]}`);
      }
    }
  };

  // Scrolla in alto ogni volta che cambia slide
  useEffect(() => {
    const updateHeight = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (isBrowser) {
      updateHeight();
      window.addEventListener("resize", updateHeight);
      return () => window.removeEventListener("resize", updateHeight);
    }
  }, [isBrowser]);

  if (!isBrowser) return null;

  return (
    <div className="h-full">
      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        className="pb-6 h-full"
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide>
          <ListaCocktails
            id="drinkMadrid"
            cocktails={drinkMadrid}
            label={false}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ListaCocktails
            id="drinkCartagena"
            cocktails={drinkCartagena}
            label={false}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ListaCocktails
            id="drinkIbiza"
            cocktails={drinkIbiza}
            label={false}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ListaCocktails
            id="drinkAustralia"
            cocktails={drinkAustralia}
            label={false}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ListaCocktails
            id="drinkSicilia"
            cocktails={drinkSicilia}
            label={false}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ListaCocktails
            id="drinkBudapest"
            cocktails={drinkBudapest}
            label={false}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ListaCocktails
            id="drinkPraga"
            cocktails={drinkPraga}
            label={false}
          />
        </SwiperSlide>
        <SwiperSlide>
          <ListaCocktails
            id="drinkSeoul"
            cocktails={drinkSeoul}
            label={false}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Lista_signature;
