import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#333333] text-white py-2">
      <div className="max-w-6xl mx-auto px-4">
        <div
          className="flex md:flex-row flex-wrap md:justify-between justify-evenly
           items-center "
        >
          <div className="text-center ">
            <p className="text-sm sm:text-base">
              &copy; {new Date().getFullYear()} Great Wall Motor. All rights
              reserved.
            </p>
          </div>
          <div className="space-x-6">
            <ul className="px-16 sm:px-0 md:mb-0 flex flex-col items-center">
              <li>
                <Image
                  src="/features/gwm.png"
                  width={800} // or appropriate width for h-24 (6rem = 96px)
                  height={600} // or appropriate height for h-16 (4rem = 64px)
                  className="h-16 md:h-14 md:w-36 w-48 object-contain" // Added object-contain for better scaling
                  alt="GWM logo" // Always use descriptive alt text
                />
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
      </div>
    </footer>
  );
}
