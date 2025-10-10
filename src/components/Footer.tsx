'use client'
import { useRef } from 'react'
import { useFooterHeight } from '@/hooks/useFooterHeight'
import Link from 'next/link';
import Plasma from './Plasma';

export default function Footer() {
  const ref = useRef<HTMLElement | null>(null)
  useFooterHeight(ref)

  return (
    <footer
      ref={ref}
      className="relative grid content-start items-start text-white bg-black"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="z-[2] grid gap-y-12 bg-black px-4 pt-20 lg:gap-y-20 lg:px-16 lg:pt-24">
        <div className="grid gap-y-12 bg-black lg:grid-cols-12 lg:gap-5">
          <nav aria-label="nav More info" className="col-span-full row-span-1 row-start-1 grid gap-y-6 lg:col-span-5 lg:col-start-1">
            <h3 className="text-xl uppercase text-white/50">More info</h3>
            <ul aria-label="list links More info" className="grid gap-y-3 lg:gap-y-6">
              <li>
                <a href="/pages/cgv" className="text-base lg:text-lg text-white">Terms and Conditions</a>
              </li>
              <li>
                <a href="/pages/retour-et-echanges" className="text-base lg:text-lg text-white">Returns and Exchanges</a>
              </li>
              <li>
                <a href="/pages/politique-de-confidentialite" className="text-base lg:text-lg text-white">Privacy Policy</a>
              </li>
            </ul>
          </nav>
          <nav aria-label="nav Media" className="col-span-full row-span-1 row-start-2 grid items-start gap-y-6 justify-self-start lg:col-span-5 lg:col-start-6 lg:w-full lg:justify-self-start lg:row-start-1">
            <h3 className="text-xl uppercase text-white/50">Social</h3>
            <ul aria-label="list links Media" className="grid gap-y-3 lg:gap-y-6">
              <li>
                <a href="#" target="_blank" className="group text-base lg:text-lg flex items-center justify-between text-white lg:text-left">
                  <span>Instagram</span>
                  <span className="!hidden lg:!flex opacity-50 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRightIcon />
                  </span>
                </a>
              </li>
              <li>
                <a href="#" target="_blank" className="group text-base lg:text-lg flex items-center justify-between text-white lg:text-left">
                  <span>Twitter</span>
                  <span className="!hidden lg:!flex opacity-50 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRightIcon />
                  </span>
                </a>
              </li>
              <li>
                <a href="#" target="_blank" className="group text-base lg:text-lg flex items-center justify-between text-white lg:text-left">
                  <span>Facebook</span>
                  <span className="!hidden lg:!flex opacity-50 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRightIcon />
                  </span>
                </a>
              </li>
            </ul>
          </nav>
          <a href="mailto:contact@siloir.app" className="group col-span-full flex w-full gap-x-2 self-start lg:col-span-2 lg:col-start-11 lg:row-span-1 lg:row-start-1 lg:justify-self-end">
            <span className="flex items-center justify-center p-2 rounded-full border border-white/20 group-hover:bg-white/10 transition-colors">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" alt="arrow enter" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.72259 1C7.12167 1 7.44519 1.32832 7.44519 1.73333V12.9126C7.44519 13.5637 7.44576 14.0075 7.4736 14.3509C7.50073 14.6856 7.55007 14.8595 7.61224 14.9825C7.75931 15.2734 7.99448 15.5108 8.28488 15.66C8.40861 15.7235 8.58304 15.7735 8.91624 15.8009C9.25773 15.8291 9.69889 15.8296 10.3447 15.8296H16.5243L12.1088 11.3796C11.8256 11.0942 11.824 10.6299 12.1052 10.3425C12.3864 10.0551 12.8439 10.0535 13.1271 10.3389L18.7866 16.0426C18.9232 16.1803 19 16.3676 19 16.563C19 16.7583 18.9232 16.9456 18.7866 17.0833L13.1271 22.787C12.8439 23.0724 12.3864 23.0708 12.1052 22.7834C11.824 22.496 11.8256 22.0317 12.1088 21.7463L16.5243 17.2963H10.3148C9.70625 17.2963 9.20623 17.2963 8.79937 17.2628C8.37758 17.2281 7.99293 17.1538 7.6324 16.9686C7.07089 16.6803 6.61343 16.2197 6.32643 15.652C6.14185 15.2869 6.06783 14.8974 6.03328 14.4712C5.99998 14.0605 5.99999 13.5561 6 12.9432L6 1.73333C6 1.32832 6.32352 1 6.72259 1Z" fill="currentColor"></path>
              </svg>
            </span>
            <span className="flex items-center text-base lg:text-lg">
              Contact us
            </span>
          </a>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8"></div>
      </div>
      <div className="sticky bottom-0 z-0 w-full bg-black px-4 pb-20 lg:px-16 lg:pb-10">
        <div className="absolute inset-0 z-[-1]">
          <Plasma 
            color="#26CF80"
            speed={0.4}
            direction="forward"
            scale={3}
            opacity={0.6}
            mouseInteractive={true}
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="w-10 lg:w-16 shrink-0">
            <svg
              className="h-full w-full animate-spin-y [transform-style:preserve-3d]"
              style={{ animationDuration: '10s' }}
              xmlns="http://www.w3.org/2000/svg"
              width="93"
              height="92"
              viewBox="0 0 93 92"
              fill="none"
            >
              <path d="M31.0025 45.7637C31.0025 42.6367 31.5518 39.5943 32.6505 36.6363C33.7492 33.6784 35.4817 31.2697 37.848 29.4105C40.2989 27.5512 43.3414 26.6215 46.9754 26.6215C50.3559 26.6215 53.1871 27.4244 55.469 29.0302C57.7508 30.6359 59.4833 32.7065 60.6665 35.2418V35.3686H69.16C68.3994 32.8332 67.1317 30.3824 65.357 28.016C63.5822 25.6496 61.1736 23.6213 58.1311 21.9311C55.0886 20.2408 51.3701 19.3957 46.9754 19.3957C41.5666 19.3957 37.0452 20.7056 33.4111 23.3255C29.8616 25.8609 27.2417 29.1569 25.5514 33.2135C23.9457 37.2702 23.1428 41.4958 23.1428 45.8905C23.1428 50.2006 23.9457 54.384 25.5514 58.4406C27.2417 62.4972 29.8616 65.8355 33.4111 68.4554C37.0452 70.9908 41.5666 72.2585 46.9754 72.2585C51.3701 72.2585 55.0886 71.4556 58.1311 69.8498C61.1736 68.1596 63.5399 66.1313 65.2302 63.7649C67.005 61.3986 68.3149 58.9899 69.16 56.5391H60.5397C59.4411 59.0745 57.7085 61.145 55.3422 62.7508C53.0603 64.3565 50.2714 65.1594 46.9754 65.1594C43.3414 65.1594 40.2989 64.2297 37.848 62.3705C35.4817 60.4267 33.7492 57.9758 32.6505 55.0178C31.5518 52.0599 31.0025 48.9752 31.0025 45.7637ZM46.4683 85.1889C53.5674 85.1889 60.1172 83.4564 66.1176 79.9914C72.2025 76.4418 77.0197 71.6669 80.5693 65.6665C84.1188 59.5815 85.8936 52.9895 85.8936 45.8905C85.8936 38.7914 84.1188 32.2416 80.5693 26.2412C77.0197 20.1563 72.2025 15.3813 66.1176 11.9163C60.1172 8.36677 53.5674 6.592 46.4683 6.592C39.3693 6.592 32.7773 8.36677 26.6923 11.9163C20.6919 15.3813 15.917 20.1563 12.3674 26.2412C8.81788 32.2416 7.04311 38.7914 7.04311 45.8905C7.04311 52.9895 8.81788 59.5815 12.3674 65.6665C15.917 71.6669 20.6919 76.4418 26.6923 79.9914C32.7773 83.4564 39.3693 85.1889 46.4683 85.1889ZM46.4683 0C54.8351 0 62.568 2.07056 69.6671 6.21169C76.7662 10.2683 82.3863 15.8462 86.5274 22.9452C90.7531 29.9598 92.8659 37.6082 92.8659 45.8905C92.8659 54.1727 90.7531 61.8634 86.5274 68.9625C82.3863 75.977 76.7662 81.5549 69.6671 85.696C62.568 89.7526 54.8351 91.7809 46.4683 91.7809C38.1016 91.7809 30.3686 89.7526 23.2696 85.696C16.1705 81.5549 10.5081 75.977 6.28249 68.9625C2.14137 61.8634 0.0708008 54.1727 0.0708008 45.8905C0.0708008 37.6082 2.14137 29.9598 6.28249 22.9452C10.5081 15.8462 16.1705 10.2683 23.2696 6.21169C30.3686 2.07056 38.1016 0 46.4683 0Z" fill="white"></path>
            </svg>
          </div>

          <div className="text-right w-full max-w-[80%] overflow-hidden">
            <h1 className="font-swear text-[15vw] md:text-[10vw] lg:text-[15rem] leading-none text-white italic pr-5 animate-blink" style={{textShadow: '0 0 2px #fff, 0 0 10px #fff, 0 0 20px #0ba9ca, 0 0 30px #0ba9ca, 0 0 40px #0ba9ca, 0 0 50px #0ba9ca'}}>
              SILOIR
            </h1>
          </div>
        </div>
      </div>
    </footer>
  )
}

const ArrowUpRightIcon = () => (
  <svg role="presentation" className="h-5 w-5" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.25 8.25V3.75H9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <path d="M14.25 3.75L3.75 14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
)
