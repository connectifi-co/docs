import type { FC } from 'react';

interface GlitchEmbedProps {
  projectId: string;
  title?: string;
  height?: string;
}

const GlitchEmbed: FC<GlitchEmbedProps> = ({
  projectId,
  title = 'Glitch Embed',
  height = '300px'
}) => {
  return (
      <iframe
        src={`https://glitch.com/embed/#!/embed/${projectId}?path=README.md&previewSize=100`}
        title={title}
        allow="geolocation; microphone; camera; midi; encrypted-media; xr-spatial-tracking; fullscreen"
        allowFullScreen
        style={{ height: '500px', width: '100%', border: '0' }}>
      </iframe>
  );
};

/**
 * 
 * <!-- Copy and Paste Me -->
  <iframe
    src="https://glitch.com/embed/#!/embed/tame-iron-bit?path=README.md&previewSize=100"
    title="tame-iron-bit on Glitch"
    allow="geolocation; microphone; camera; midi; encrypted-media; xr-spatial-tracking; fullscreen"
    allowFullScreen
 */

export default GlitchEmbed;