import Image from "next/image"

const Page = () => {
  return (
    <div>
        <div className="h-screen min-h-screen flex flex-wrap md:flex-nowrap w-full py-16 gap-8 md:p-16">
          <div className="w-full md:w-1/2 h-full p-12 space-y-12 flex flex-col justify-center">
            <h4 className="text-6xl md:text-7xl">
              <span>Believe it,</span><br />
              <span>Wear it,</span><br />
              <span>Be it!</span>
            </h4>
            <p className="text-lg">
              At JK Wears, we’re more than just a clothing brand — we’re a movement. A heartbeat. A bold statement that says “you matter”, “you’re worthy”, and “you can.”
Born at the crossroads of streetwear, luxury, and purpose, we design clothes that do more than cover your body — they elevate your story.
Our founder’s journey is proof that dreams are not just for the lucky. They’re for the bold.
            </p>
          </div>
          <div className="w-full md:w-1/2 h-full flex justify-center items-center relative">
            {/* second image */}
            <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] overflow-hidden flex items-center justify-center rounded-lg absolute md:-left-5 -rotate-5">
              <Image 
                src={"/jk canada - lady.jpg"}
                alt="second-image-about"
                width={500}
                height={500}
                objectFit="cover"
              />
            </div>
            {/* First image */}
            <div className="w-[300px] h-[400px] md:w-[500px] md:h-[500px] overflow-hidden flex items-center justify-center rounded-lg absolute z-20 rotate-5 shadow  -bottom-50 md:-bottom-10">
              <Image 
                src={"/jk caps - guy.jpg"}
                alt="first-image-about"
                width={500}
                height={500}
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div></div>
          </div>
        </div>
    </div>
  )
}

export default Page