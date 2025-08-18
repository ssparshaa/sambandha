# Audio Files for Interactive Polaroids

This directory contains audio files that will be played when users interact with the polaroid images.

## Supported Formats
- MP3 (recommended)
- OGG (fallback)

## File Naming Convention
- `memory-1.mp3` - Audio for first polaroid
- `memory-2.mp3` - Audio for second polaroid  
- `memory-3.mp3` - Audio for third polaroid

## Adding Your Own Audio Files
1. Place your audio files in this directory
2. Update the `memories` array in `app/page.tsx` to reference your audio files
3. Audio files should be short (10-60 seconds recommended) for best user experience

## Example Usage
```javascript
audioSrc: "/audio/memory-1.mp3"
```

Note: You'll need to add your own audio files. The component will gracefully handle missing audio files by simply not showing the audio controls.
