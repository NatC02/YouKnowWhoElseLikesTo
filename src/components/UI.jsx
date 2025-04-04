import { atom, useAtom } from "jotai";
import { useRef } from "react";

export const youknowwhoelselikestoAtom = atom(false);
export const wiggleAtom = atom(true);

export const UI = () => {
  const [youknowwhoelselikesto, setYouKnowWhoElseLikesTo] = useAtom(youknowwhoelselikestoAtom);
  const [_wiggle, setWiggle] = useAtom(wiggleAtom);
  const audio = useRef();

  const startYouKnowWhoElseLikesTo = (withWiggle) => {
    setYouKnowWhoElseLikesTo(true);
    setWiggle(withWiggle);
    audio.current.play();
    audio.current.loop = true;
  };
  const stopYouKnowWhoElseLikesTo = () => {
    setYouKnowWhoElseLikesTo(false);
    setWiggle(true);
    audio.current.pause();
    audio.current.currentTime = 0;
  };



  return (
    <main className="pointer-events-none fixed z-10 inset-0 p-10 flex justify-between flex-col">
      <div>
        <img className="w-20" src="/images/cartoon-network-logo.png" />
      </div>

      <div className="flex items-center justify-center gap-4">
        {youknowwhoelselikesto ? (
          <button
            className="pointer-events-auto bg-white/70 hover:bg-white transition-colors duration-200 text-black px-8 py-3 rounded-full font-bold text-xl uppercase"
            onClick={stopYouKnowWhoElseLikesTo}
          >
            Stop
          </button>
        ) : (
          <>
            <button
              className="w-40 pointer-events-auto bg-white/70 hover:bg-white transition-colors duration-200 text-black py-3 rounded-full font-bold text-xl uppercase"
              onClick={() => startYouKnowWhoElseLikesTo(false)}
            >
              Start{" "}
              <div className="text-xs -mt-1 font-medium">(without wiggle)</div>
            </button>
            <button
              className="w-40 pointer-events-auto bg-white/70 hover:bg-white transition-colors duration-200 text-black py-3 rounded-full font-bold text-xl uppercase"
              onClick={() => startYouKnowWhoElseLikesTo(true)}
            >
              Start{" "}
              <div className="text-xs -mt-1 font-medium">(with wiggle)</div>
            </button>
          </>
        )}
        <audio
          src="/music.mp3"
          ref={audio}
        />
      </div>
    </main>
  );
};