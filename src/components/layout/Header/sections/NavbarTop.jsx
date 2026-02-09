import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react'

const NavbarTop = () => {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  return (
    <>
      {/* navbar top  */}
      <div className='border-b border-gray-200'>
        <div className='max-w-[90vw] h-10 flex items-center justify-between text-sm mx-auto'>
          {/* Left: Welcome message */}
          <div className='font-medium text-gray-900'>
            Welcome to FleetCart store
          </div>

          {/* Right: Menu items */}
          <div className='flex items-center gap-6'>
            {/* Contact */}
            <div className='cursor-pointer pr-4 border-r border-gray-300 hover:text-blue-600 transition-colors duration-200'>
              Contact
            </div>

            {/* Language dropdown */}
            <div className='relative'>
              <div
                className='flex items-center gap-1 pr-4 cursor-pointer border-r border-gray-300 hover:text-blue-600 transition-colors duration-200'
                onClick={() => {
                  setLanguageOpen(!languageOpen);
                  setCurrencyOpen(false);
                }}
              >
                <span>English</span>
                <ChevronDown className='w-3 h-3 ml-1' />
              </div>

              {languageOpen && (
                <div className='absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 z-50 overflow-hidden animate-fadeIn'>
                  <div className='py-2'>
                    <div className='px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center justify-between'>
                      <span>English</span>
                      <span className='text-blue-600 text-xs'>✓</span>
                    </div>
                    <div className='px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150'>
                      Bangla
                    </div>
                    <div className='px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150'>
                      Spanish
                    </div>
                    <div className='px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150'>
                      French
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* Currency dropdown */}
            <div className='relative'>
              <div
                className='flex items-center gap-1 pr-4 cursor-pointer border-r border-gray-300 hover:text-blue-600 transition-colors duration-200'
                onClick={() => {
                  setCurrencyOpen(!currencyOpen);
                  setLanguageOpen(false);
                }}
              >
                <span>USD</span>
                <ChevronDown className='w-3 h-3 ml-1' />
              </div>

              {currencyOpen && (
                <div className='absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 z-50 overflow-hidden animate-fadeIn'>
                  <div className='py-2'>
                    <div className='px-6 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center justify-between'>
                      <span className='flex items-center gap-2'>
                        <span>$</span>
                        <span>USD</span>
                      </span>

                    </div>
                    <div className='px-6 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center gap-2'>
                      <span>€</span>
                      <span>EUR</span>
                    </div>
                    <div className='px-6 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center gap-2'>
                      <span>£</span>
                      <span>GBP</span>
                    </div>
                    <div className='px-6 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center gap-2'>
                      <span>¥</span>
                      <span>JPY</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Login/Register */}
            <div className='cursor-pointer hover:text-blue-600 transition-colors duration-200'>
              Login / Register
            </div>
          </div>
        </div>
      </div>

    </>


  )
}

export default NavbarTop