import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { heroVideo, smallHeroVideo } from '../utils'
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Hero = () => {
  const [videoSrc, setVideoSrc ] = React.useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)
 

  const handleVideosrcSet = () => {
    if(window.innerWidth < 760){
      setVideoSrc(smallHeroVideo)
    }else{
      setVideoSrc(heroVideo)
    }
  }

  React.useEffect(()=>{
    window.addEventListener('resize',handleVideosrcSet);

    return ()=> {
      window.removeEventListener('reset', handleVideosrcSet)
    }
  },[])

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to('#hero',{ 
      scrollTrigger: {
      trigger:'#hero',
      toggleActions:'play none restart none'
    },
    opacity:1,
    delay:1.5
  })
    gsap.to('#cta', { 
      scrollTrigger: {
      trigger:'#cta',
      toggleActions:'play none restart none'
    },
    opacity:1,
     y:-50,
      delay:1.5
    })
  }, [])

  return (
    <section className='w-full nav-height bg-black relative'>
      <div className='h-5/6 w-full flex-center flex-col'>
        <p id="hero" className='hero-title'>iPhone 15 Pro</p>
        <div className='md:w-10/12 w-9/12'>
          <video className='pointer-events-none' autoPlay muted playsInline={true} key={videoSrc}>
            <source src={videoSrc} type='video/mp4'/>
          </video>
        </div>
      </div>
      <div id='cta' className='flex flex-col items-center opacity-0 translate-y-20'>
        <a href='#highlights' className='btn'>
          Buy
        </a>
        <p className='font-normal text-xl'>from $199/month or $999</p>
      </div>
    </section>
  )
}

export default Hero
