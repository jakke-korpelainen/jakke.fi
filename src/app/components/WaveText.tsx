import clsx from "clsx";

interface IWaveProps {
  words: string[];
  emojiIndex: number;
}

const wordClasses =
  "animate-wave inline-block select-none bg-clip-text text-transparent bg-gradient-to-t from-before to-link-normal";
const emojiClasses =
  "text-6xl  bg-clip-text text-transparent bg-gradient-to-r from-link-normal/[0.25] to-link-hover/[0.25] ";

const getDelay = (index: number) => {
  return `${(index + 1) * 100 * Math.PI}ms`;
};

const getKey = (word: string | number, wordIndex: string | number, charIndex?: string | number) => {
  if (charIndex !== undefined) {
    return `${word}-${wordIndex}-${charIndex}`;
  }
  return `${word}-${wordIndex}`;
};

interface WaveCharProps {
  char: string;
  index: number;
  className?: string;
}
const WaveChar = ({ char, index, className }: WaveCharProps) => (
  <span style={{ animationDelay: getDelay(index) }} className={clsx(wordClasses, className)}>
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
    <WaveChar className={className} key={getKey(word, wordIndex, charIndex)} index={charIndex} char={char} />
  ));
};

export const WaveText = ({ words, emojiIndex }: IWaveProps) => (
  <>
    {words.map((word, index) => (
      <span key={getKey(word, index)} className="mr-2 bg-clip-content">
        <WaveWord className={clsx({ [emojiClasses]: emojiIndex === index })} wordIndex={index} word={word} />
      </span>
    ))}
  </>
);
