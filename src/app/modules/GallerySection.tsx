"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from "next/image"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { EyeIcon } from '@heroicons/react/24/outline'
import { Dialog } from '@headlessui/react'
import 'swiper/css'
import 'swiper/css/pagination'
// import Marquee from "react-fast-marquee"

const GallerySection = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const images = [
        {
            src: "/jk canada - lady.jpg",
            alt: "Lady Hoodie CND",
            className: "col-span-1 row-span-1"
        },
        {
            src: "/jk caps - guy.jpg",
            alt: "JK caps",
            className: "col-span-2 row-span-2"
        },
        {
            src: "/jk shirt men white.jpg",
            alt: "JK white t-shirt",
            className: "col-span-1 row-span-1"
        }
    ];

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, []);

    const openLightbox = (imageSrc: string) => {
        setSelectedImage(imageSrc);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

  return (
    <div className='w-full bg-black min-h-[50vh] p-6 md:p-12'>
        <h2 className='text-6xl md:text-8xl flex flex-wrap'>Gallery</h2>
        {/* Gallery images */}
        {isMobile ? (
                <div className="w-full max-w-[100vw] overflow-hidden my-8">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        className="w-full h-[75vh]"
                    >
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative w-full h-full group">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        sizes="100vw"
                                        className="object-cover"
                                    />
                                    <button
                                        onClick={() => openLightbox(image.src)}
                                        className="absolute inset-0 bg-black/10 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
                                    >
                                        <div className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full">
                                            <EyeIcon className="h-5 w-5" />
                                            <span className="text-sm font-medium">View Image</span>
                                        </div>
                                    </button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ) : (
                <div className='flex my-8 items-center gap-4'>
                    {
                        images.map((image, index)=>
                            <div 
                                key={index} 
                                className='md:w-1/3 md:max-w-1/3 md:h-[75vh] bg-white relative group'
                                style={{
                                    backgroundImage: `url('${image.src}')`,
                                    backgroundSize:'cover',
                                    backgroundPosition:'center center'
                                }}
                            >
                                <button
                                    onClick={() => openLightbox(image.src)}
                                    className="absolute inset-0 bg-black/10 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
                                >
                                    <div className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full cursor-pointer">
                                        <EyeIcon className="h-5 w-5" />
                                        <span className="text-sm font-medium">View Image</span>
                                    </div>
                                </button>
                            </div>
                        )
                    }
                </div>
            )}
            <div className='flex justify-center'>
                <Link href="/gallery" className='text-lg font-extralight text-center underline'>View gallery</Link>
            </div>

            {/* Lightbox Modal */}
            <Dialog
                open={selectedImage !== null}
                onClose={closeLightbox}
                className="relative z-50"
            >
                {/* Background overlay */}
                <div className="fixed inset-0 bg-black/90" aria-hidden="true" />

                {/* Full-screen container */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-7xl">
                        <div className="relative aspect-[4/3] w-full">
                            {selectedImage && (
                                <Image
                                    src={selectedImage}
                                    alt="Selected image"
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 1280px) 100vw, 1280px"
                                />
                            )}
                        </div>
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 text-white hover:text-gray-300"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </Dialog.Panel>
                </div>
            </Dialog>
    </div>
  )
}

export default GallerySection