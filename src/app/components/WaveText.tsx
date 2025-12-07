import clsx from "clsx";

const wordClasses =
  "animate-wave inline-block select-none bg-clip-text text-transparent bg-gradient-to-t from-before to-link-normal";

const getDelay = (index: number) => {
  return `${Math.max(index, 1) * 100 * Math.PI}ms`;
};

const getKey = (word: string | number, wordIndex: string | number, charIndex?: string | number) => {
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
  <span style={{ animationDelay: getDelay(charIndex) }} className={clsx(wordClasses, className)}>
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
    <WaveChar className={className} key={getKey(word, wordIndex, charIndex)} charIndex={charIndex} char={char} />
  ));
};

interface IWaveProps {
  words: string[];
  wordClasses?: { index: number; class: string }[];
}

export const WaveText = ({ words, wordClasses }: IWaveProps) => (
  <>
    {words.map((word, index) => (
      <span key={getKey(word, index)} className="mr-2">
        <WaveWord
          className={clsx({
            [wordClasses?.find((c) => c.index === index)?.class ?? ""]: !!wordClasses?.find((c) => c.index === index),
          })}
          wordIndex={index}
          word={word}
        />
      </span>
    ))}
  </>
);
