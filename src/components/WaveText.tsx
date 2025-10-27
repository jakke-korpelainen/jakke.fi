import clsx from "clsx";

const wordClasses =
  "animate-wave inline-block bg-clip-text text-transparent bg-gradient-to-t from-before to-link-normal";

const getDelay = (index: number) => {
  return `${Math.round(index * 100 * Math.PI)}ms`;
};

const getKey = (
  word: string | number,
  wordIndex: string | number,
  charIndex?: string | number,
) => {
  if (charIndex !== undefined) {
    return `${word}-${wordIndex}-${charIndex}`;
  }
  return `${word}-${wordIndex}`;
};

interface WaveCharProps {
  char: string;
  charIndex: number;
  className?: string;
}
const WaveChar = ({ char, charIndex, className }: WaveCharProps) => (
  <span
    style={{
      textShadow:
        "0 0 0.5rem rgba(255,255,255, var(--text-shadow)), 0 0 2rem rgba(255,255,255, var(--text-shadow))",
      animationDelay: getDelay(charIndex),
    }}
    className={clsx(wordClasses, className, { ["w-4"]: char === " " })}
  >
    {char}
  </span>
);

interface WaveWordProps {
  word: string;
  wordIndex: number;
  className?: string;
}
export const WaveWord = ({ word, wordIndex, className }: WaveWordProps) => {
  return [...word].map((char, charIndex) => (
    <WaveChar
      className={className}
      key={getKey(word, wordIndex, charIndex)}
      charIndex={charIndex}
      char={char}
    />
  ));
};

interface IWaveProps {
  words: string[];
  wordClasses?: { index: number; class: string }[];
}

export const WaveText = ({ words, wordClasses }: IWaveProps) => (
  <>
    {words.map((word, index) => (
      <span key={getKey(word, index)}>
        <WaveWord
          className={clsx({
            [wordClasses?.find((c) => c.index === index)?.class ?? ""]:
              !!wordClasses?.find((c) => c.index === index),
          })}
          wordIndex={index}
          word={word}
        />
      </span>
    ))}
  </>
);
