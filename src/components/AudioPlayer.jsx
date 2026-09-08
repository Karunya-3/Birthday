import React, { useEffect, useRef } from 'react';

const YOUTUBE_VIDEO_ID = '7Vk-dJr-uio';

export default function AudioPlayer() {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // 1. Inject YouTube IFrame API script dynamically if not present
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }

    let intervalId = null;

    const forceUnmuteAndPlay = () => {
      // Direct postMessage commands to YouTube IFrame
      if (iframeRef.current && iframeRef.current.contentWindow) {
        try {
          iframeRef.current.contentWindow.postMessage(
            '{"event":"command","func":"unMute","args":""}',
            '*'
          );
          iframeRef.current.contentWindow.postMessage(
            '{"event":"command","func":"setVolume","args":[100]}',
            '*'
          );
          iframeRef.current.contentWindow.postMessage(
            '{"event":"command","func":"playVideo","args":""}',
            '*'
          );
        } catch (e) {
          // ignore postMessage errors
        }
      }

      // YouTube API Player methods
      if (playerRef.current) {
        try {
          if (typeof playerRef.current.unMute === 'function') {
            playerRef.current.unMute();
          }
          if (typeof playerRef.current.setVolume === 'function') {
            playerRef.current.setVolume(100);
          }
          if (typeof playerRef.current.playVideo === 'function') {
            playerRef.current.playVideo();
          }
        } catch (e) {
          // ignore API errors
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.playBirthdayMusic = forceUnmuteAndPlay;
    }

    const initPlayer = () => {
      if (window.YT && window.YT.Player && iframeRef.current && !playerRef.current) {
        playerRef.current = new window.YT.Player(iframeRef.current, {
          events: {
            onReady: (event) => {
              try {
                event.target.unMute();
                event.target.setVolume(100);
                event.target.playVideo();
              } catch (e) {
                // ignore
              }
            },
            onStateChange: (event) => {
              // Continuous playback and volume enforcement
              if (
                event.data === window.YT.PlayerState.ENDED ||
                event.data === window.YT.PlayerState.PAUSED ||
                event.data === window.YT.PlayerState.CUED
              ) {
                try {
                  event.target.unMute();
                  event.target.setVolume(100);
                  event.target.playVideo();
                } catch (e) {
                  // ignore
                }
              }
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevCallback === 'function') prevCallback();
        initPlayer();
      };

      intervalId = setInterval(() => {
        if (window.YT && window.YT.Player && !playerRef.current) {
          initPlayer();
          if (intervalId) clearInterval(intervalId);
        }
      }, 300);
    }

    // Unmute and play on any user gesture anywhere on the screen
    const handleUserInteraction = () => {
      forceUnmuteAndPlay();
    };

    window.addEventListener('click', handleUserInteraction, { passive: true });
    window.addEventListener('pointerdown', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });
    window.addEventListener('scroll', handleUserInteraction, { passive: true });
    window.addEventListener('keydown', handleUserInteraction, { passive: true });

    // Periodic check to ensure continuous playback at 100% volume
    const unmuteInterval = setInterval(() => {
      forceUnmuteAndPlay();
    }, 1500);

    return () => {
      if (intervalId) clearInterval(intervalId);
      clearInterval(unmuteInterval);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('pointerdown', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  return (
    <div
      className="fixed -top-[9999px] -left-[9999px] w-1 h-1 pointer-events-none opacity-0 overflow-hidden z-[-1]"
      aria-hidden="true"
    >
      <iframe
        ref={iframeRef}
        id="youtube-bg-player"
        title="Background Music"
        src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(
          typeof window !== 'undefined' ? window.location.origin : ''
        )}`}
        allow="autoplay; encrypted-media"
        tabIndex="-1"
      />
    </div>
  );
}
