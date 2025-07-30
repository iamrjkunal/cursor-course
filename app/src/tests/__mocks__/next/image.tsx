import React from 'react';

// Mock for the Next.js Image component
function MockNextImage({ 
  src, 
  alt, 
  width, 
  height, 
  fill,
  className,
  ...props 
}: any) {
  return (
    <img 
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-testid="next-image"
      style={fill ? { objectFit: 'cover' } : undefined}
      {...props}
    />
  );
}

export default MockNextImage;