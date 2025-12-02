import React from 'react';

interface AnimatedGlowingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const AnimatedGlowingButton = ({ children, variant = 'primary', className = '', ...props }: AnimatedGlowingButtonProps) => {
  return (
    <div className="relative flex items-center justify-center">
      <div className="relative flex items-center justify-center group">
        {/* Outer glow layers */}
        <div className="absolute z-[-1] overflow-hidden h-full w-full rounded-xl blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[999px] before:h-[999px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-60
                        before:bg-[conic-gradient(#000,#CB94F7_5%,#000_38%,#000_50%,#9b4dca_60%,#000_87%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-120deg] group-active:before:rotate-[420deg] group-active:before:duration-[4000ms]">
        </div>
        <div className="absolute z-[-1] overflow-hidden h-full w-full rounded-xl blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                        before:bg-[conic-gradient(rgba(0,0,0,0),#7c3aed,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#a855f7,rgba(0,0,0,0)_60%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-98deg] group-active:before:rotate-[442deg] group-active:before:duration-[4000ms]">
        </div>
        
        {/* Middle glow layer */}
        <div className="absolute z-[-1] overflow-hidden h-full w-full rounded-lg blur-[2px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[83deg]
                        before:bg-[conic-gradient(rgba(0,0,0,0)_0%,#d8b4fe,rgba(0,0,0,0)_8%,rgba(0,0,0,0)_50%,#e9d5ff,rgba(0,0,0,0)_58%)] before:brightness-140
                        before:transition-all before:duration-2000 group-hover:before:rotate-[-97deg] group-active:before:rotate-[443deg] group-active:before:duration-[4000ms]">
        </div>

        {/* Inner border glow */}
        <div className="absolute z-[-1] overflow-hidden h-full w-full rounded-xl blur-[0.5px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-70
                        before:bg-[conic-gradient(#1c191c,#CB94F7_5%,#1c191c_14%,#1c191c_50%,#9b4dca_60%,#1c191c_64%)] before:brightness-130
                        before:transition-all before:duration-2000 group-hover:before:rotate-[-110deg] group-active:before:rotate-[430deg] group-active:before:duration-[4000ms]">
        </div>

        {/* Button itself */}
        <button
          className={`relative bg-gradient-to-b from-[#161329] via-black to-[#1d1b4b] border border-[#CB94F7]/20 
                     text-white px-8 py-3 rounded-lg text-lg font-medium
                     hover:border-[#CB94F7]/40 hover:scale-105 active:scale-95
                     transition-all duration-300 flex items-center gap-2
                     shadow-[0_0_20px_rgba(203,148,247,0.3)] hover:shadow-[0_0_30px_rgba(203,148,247,0.5)]
                     ${className}`}
          {...props}
        >
          {children}
        </button>
      </div>
    </div>
  );
};

export default AnimatedGlowingButton;
