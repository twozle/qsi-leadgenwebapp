import Link from 'next/link';
import Image from 'next/image';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-primary-50 via-white to-earth-50 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative produce images on the sides */}
      <div className="absolute left-0 top-0 bottom-0 w-48 hidden lg:block opacity-20">
        <Image
          src="/images/market-display.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-48 hidden lg:block opacity-20">
        <Image
          src="/images/fruit-baskets.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-stone-900 mb-6">
          Instantly Discover Why Your Produce Supply Is Inconsistent
        </h1>
        <p className="text-xl sm:text-2xl text-stone-600 mb-8 max-w-3xl mx-auto">
          Take the 60-second <span className="font-semibold text-primary-700">Produce Reliability Scorecard™</span> and get the exact steps to fix it.
        </p>
        <Link href="/quiz">
          <Button className="text-lg px-8 py-4">
            Start the Scorecard
          </Button>
        </Link>
        <p className="mt-4 text-sm text-stone-500">
          No credit card required • Results in 60 seconds
        </p>
      </div>
    </div>
  );
}
