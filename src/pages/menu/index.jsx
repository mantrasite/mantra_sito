// src/pages/index.jsx (o la tua home page)
import SignatureCocktails from "./signature";

export default function Home() {
  return (
    <div
      className={`items-center justify-items-center gap-16 w-screen h-full font-[family-name:var(--font-geist-sans)]`}
    >
      <SignatureCocktails />
    </div>
  );
}