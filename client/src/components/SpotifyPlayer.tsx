import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Minimize2,
  Maximize2,
  Square,
} from 'lucide-react';

export function SpotifyPlayer() {
  const { t } = useTranslation();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [showFallback, setShowFallback] = useState(false);
  const [spotifyReady, setSpotifyReady] = useState(false);
  const playerRef = useRef<any>(null);

  // Check if Spotify SDK is available
  useEffect(() => {
    if (window.Spotify) {
      setSpotifyReady(true);
    } else {
      window.onSpotifyWebPlaybackSDKReady = () => {
        setSpotifyReady(true);
      };
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only handle if not in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case ' ':
          e.preventDefault();
          handlePlayPause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleSeek(Math.max(0, currentTime - 10));
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleSeek(Math.min(duration, currentTime + 10));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume((v) => Math.min(1, v + 0.05));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume((v) => Math.max(0, v - 0.05));
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentTime, duration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Show fallback embed if SDK not available or not connected
  if (showFallback) {
    return (
      <div
        className="fixed bottom-4 right-4 z-50 hidden md:block"
        data-testid="spotify-player-fallback"
      >
        <Card className="w-96 overflow-hidden shadow-2xl">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {t('player.fallbackMessage')}
              </p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFallback(false)}
                data-testid="button-close-fallback"
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
            </div>
            <iframe
              data-testid="embed-iframe"
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/53bYMBN35Ygd3eu2ABoBJ8?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </Card>
      </div>
    );
  }

  // Minimized player
  if (isMinimized) {
    return (
      <div
        className="fixed bottom-4 right-4 z-50"
        data-testid="spotify-player-minimized"
      >
        <Card className="p-3 flex items-center gap-3 shadow-2xl hover-elevate">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent pixelated overflow-hidden">
            <div className="w-full h-full bg-muted" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePlayPause}
            aria-label={isPlaying ? t('player.pause') : t('player.play')}
            data-testid="button-player-play-pause-mini"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(false)}
            aria-label={t('player.maximize')}
            data-testid="button-player-maximize"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </Card>
      </div>
    );
  }

  // Full player
  return (
    <div
      className="fixed bottom-4 right-4 z-50 hidden md:block"
      data-testid="spotify-player-full"
    >
      <Card className="w-96 p-6 space-y-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-pixel text-primary">Pixel Player</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMinimized(true)}
            aria-label={t('player.minimize')}
            data-testid="button-player-minimize"
          >
            <Minimize2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Album Art */}
        <div className="relative w-full aspect-square rounded-md overflow-hidden pixelated bg-gradient-to-br from-primary via-accent to-primary">
          <div className="absolute inset-0 bg-muted opacity-50" />
        </div>

        {/* Track Info */}
        <div className="text-center space-y-1">
          <h4 className="font-semibold truncate" data-testid="text-track-title">
            Demo Track
          </h4>
          <p className="text-sm text-muted-foreground truncate" data-testid="text-track-artist">
            Demo Artist
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={([value]) => handleSeek(value)}
            aria-label={t('player.seekBar')}
            data-testid="slider-seek"
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span data-testid="text-time-current">{formatTime(currentTime)}</span>
            <span data-testid="text-time-total">{formatTime(duration || 180)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {}}
            aria-label={t('player.previous')}
            data-testid="button-player-previous"
            className="hover-elevate active-elevate-2"
          >
            <SkipBack className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            onClick={handlePlayPause}
            aria-label={isPlaying ? t('player.pause') : t('player.play')}
            data-testid="button-player-play-pause"
            className="w-12 h-12 hover-elevate active-elevate-2"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {}}
            aria-label={t('player.next')}
            data-testid="button-player-next"
            className="hover-elevate active-elevate-2"
          >
            <SkipForward className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleStop}
            aria-label={t('player.stop')}
            data-testid="button-player-stop"
            className="hover-elevate active-elevate-2"
          >
            <Square className="w-4 h-4" />
          </Button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <Slider
            value={[volume * 100]}
            max={100}
            step={1}
            onValueChange={([value]) => setVolume(value / 100)}
            aria-label={t('player.volume')}
            data-testid="slider-volume"
            className="flex-1"
          />
          <span className="text-xs text-muted-foreground w-10 text-right">
            {Math.round(volume * 100)}%
          </span>
        </div>

        {/* Fallback Link */}
        <Button
          variant="outline"
          size="sm"
          className="w-full hover-elevate active-elevate-2"
          onClick={() => setShowFallback(true)}
          data-testid="button-show-embed"
        >
          {t('player.openSpotify')}
        </Button>
      </Card>
    </div>
  );
}

// Mobile player (bottom-center)
export function MobileSpotifyPlayer() {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t bg-card"
      data-testid="spotify-player-mobile"
    >
      <div className="p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded bg-gradient-to-br from-primary to-accent pixelated" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">Demo Track</p>
          <p className="text-xs text-muted-foreground truncate">Demo Artist</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
            data-testid="button-mobile-play-pause"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
