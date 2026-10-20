import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";
import Typography from "@/components/Typography";

export interface ErrorPageLayoutProps {
  statusCode: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
  onReset?: () => void;
}

export default function ErrorPageLayout({
  statusCode,
  title,
  description,
  buttonText = "Kembali ke Home",
  buttonHref = "/",
  onReset,
}: ErrorPageLayoutProps) {
  return (
    <div className="relative w-full overflow-hidden bg-white flex flex-col items-center justify-between min-h-[calc(100vh-90px)]">
      {/* Text & Button Container */}
      <div className="relative z-10 w-full flex flex-col items-center text-center pt-[180px] pb-[380px] px-6 md:px-16 md:pt-[200px] md:pb-[480px] lg:px-[120px] 2xl:px-[300px] 2xl:pt-[190px] 2xl:pb-[680px]">
        {/* Texts & Button Wrapper: gap 32px */}
        <div className="flex flex-col items-center gap-8 max-w-[840px]">
          {/* Texts Section */}
          <div className="flex flex-col items-center gap-3 lg:gap-4">
            {/* Status Code (404 / 500) */}
            <Typography
              as="h1"
              font="Sora"
              weight="bold"
              className="text-[54px] md:text-[68px] lg:text-[80px] font-bold leading-[115%] bg-gradient-to-r from-[#14251F] to-[#115C3A] from-[-7.78%] to-[100%] bg-clip-text text-transparent inline-block tracking-tight"
            >
              {statusCode}
            </Typography>

            {/* Error Title */}
            <Typography
              as="h2"
              font="Sora"
              weight="bold"
              className="text-[20px] md:text-[26px] lg:text-[32px] font-bold leading-[125%] text-[#14251F]"
            >
              {title}
            </Typography>

            {/* Description */}
            <p className="font-Inter text-[#17221F] text-[13px] md:text-[15px] lg:text-[16px] font-normal leading-[150%] max-w-[420px] md:max-w-[560px] lg:max-w-[640px]">
              {description}
            </p>
          </div>

          {/* Action Button: Kembali ke Home */}
          {buttonHref ? (
            <Link
              href={buttonHref}
              className="inline-flex items-center gap-[10px] bg-[#176B5B] hover:bg-[#145d4f] active:scale-95 transition-all text-white px-5 py-[10px] lg:px-6 lg:py-3 rounded-[8px] font-Inter text-[14px] lg:text-[16px] font-semibold leading-[18px] lg:tracking-[-0.16px] shadow-md"
            >
              <Home className="w-5 h-5 shrink-0" />
              <span>{buttonText}</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-[10px] bg-[#176B5B] hover:bg-[#145d4f] active:scale-95 transition-all text-white px-5 py-[10px] lg:px-6 lg:py-3 rounded-[8px] font-Inter text-[14px] lg:text-[16px] font-semibold leading-[18px] lg:tracking-[-0.16px] shadow-md cursor-pointer"
            >
              <Home className="w-5 h-5 shrink-0" />
              <span>{buttonText}</span>
            </button>
          )}
        </div>
      </div>

      {/* Background Bottom Illustration: Layered Path & Student */}
      {/* Path Layer (z-0) */}
      <div className="absolute -bottom-[180px] md:-bottom-[300px] lg:-bottom-[450px] xl:-bottom-[500px] 2xl:-bottom-[550px] left-1/2 -translate-x-1/2 w-[1010px] md:w-[1400px] xl:w-[1875px] h-[500px] md:h-[700px] xl:h-[900px] pointer-events-none select-none z-0">
        <Image
          src="/images/hero/path.webp"
          alt="Illustration Path"
          fill
          priority
          sizes="(min-width: 1280px) 1875px, (min-width: 768px) 1400px, 1010px"
          className="object-contain object-bottom"
        />
      </div>

      {/* Student Layer (z-[1]) */}
      <div className="absolute -bottom-[63px] md:-bottom-[90px] xl:-bottom-[126px] left-[calc(115/390*100%)] md:left-1/2 md:-translate-x-1/2 xl:left-[calc(502/1440*100%)] xl:translate-x-0 w-[142px] md:w-[180px] xl:w-[264px] h-[246px] md:h-[310px] xl:h-[458px] pointer-events-none select-none z-[1]">
        <Image
          src="/images/hero/student-searching.webp"
          alt="Student Searching Illustration"
          fill
          priority
          sizes="(min-width: 1280px) 264px, (min-width: 768px) 180px, 142px"
          className="object-contain object-bottom"
        />
      </div>
    </div>
  );
}
