import React from 'react'

interface WatermarkProps {
  text?: string
}

const Watermark: React.FC<WatermarkProps> = ({ text = 'VERSÃO GRATUITA' }) => {
  return (
    <div className="fixed inset-0 pointer-events-none select-none flex items-center justify-center">
      <div 
        className="absolute transform -rotate-45 text-red-500/20 text-8xl font-bold whitespace-nowrap"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(-45deg)',
          fontSize: '6rem',
          width: '100%',
          textAlign: 'center'
        }}
      >
        {text}
      </div>
    </div>
  )
}

export default Watermark
