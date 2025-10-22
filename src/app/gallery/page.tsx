// app/gallery/page.tsx
import Image from "next/image";

// Mock data with image paths
const testimonials = [
  {
    id: 1,
    name: "Budi Santoso",
    location: "Jakarta",
    carModel: "GWM ORA 07",
    testimoni:
      "Sangat puas dengan GWM ORA 07. Desain elegan, fitur lengkap, dan yang paling penting hemat listrik! Sudah 3 bulan pakai dan tidak ada kendala.",
    image: "/gallery/customer1.jpg", // Put this in public/gallery/ folder
    carImage: "/gallery/car1.jpg", // Put this in public/gallery/ folder
    purchaseDate: "Januari 2024",
    rating: 5,
  },
  {
    id: 2,
    name: "Sari Dewi",
    location: "Bandung",
    carModel: "GWM ORA 07",
    testimoni:
      "Mobil listrik pertama saya dan sangat terkesan. Akselerasi halus, interior nyaman, dan teknologi canggih. Recommended banget!",
    image: "/gallery/customer2.jpg",
    carImage: "/gallery/car2.jpg",
    purchaseDate: "Desember 2023",
    rating: 5,
  },
];

type Testimoni = {
  id: number;
  name: string;
  location: string;
  carModel: string;
  testimoni: string;
  image: string;
  carImage: string;
  purchaseDate: string;
  rating: number;
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-red-600 to-red-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full">
          {/* <Image
            src="/gallery/hero-bg.jpg" // Put a GWM car image here
            alt="GWM ORA 07"
            fill
            className="object-cover opacity-20"
            priority
          /> */}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Gallery Pelanggan GWM</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Lihat pengalaman nyata dari keluarga besar GWM Indonesia. Mereka
            telah memilih mobilitas masa depan dengan GWM .
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Bergabunglah dengan Keluarga GWM
          </h2>
          <p className="text-xl mb-4 opacity-90">
            Jadilah bagian dari revolusi mobil listrik di Indonesia. Rasakan
            pengalaman berkendara masa depan dengan GWM ORA 07.
          </p>
        </div>
      </section>
    </div>
  );
}

// Testimonial Card Component
function TestimonialCard({ testimonial }: { testimonial: Testimoni }) {
  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {/* Customer & Car Image */}
      <div className="relative h-64 overflow-hidden">
        {/* Car Image */}
        <div className="absolute inset-0">
          <Image
            src={testimonial.image}
            alt={`${testimonial.carModel} milik ${testimonial.name}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </div>

        {/* Customer Avatar */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-3">
          <div>
            <h3 className="text-white font-semibold text-lg">
              {testimonial.name}
            </h3>
          </div>
        </div>
      </div>

      {/* Testimonial Content */}
      <div className="p-6">
        {/* Rating */}
        <div className="flex items-center justify-between mb-4">
          {renderStars(testimonial.rating)}
          <span className="text-sm text-gray-500">
            {testimonial.purchaseDate}
          </span>
        </div>

        {/* Testimoni Text */}
        <p className="text-gray-700 leading-relaxed mb-4 line-clamp-4">
          {testimonial.testimoni}
        </p>
      </div>
    </div>
  );
}
