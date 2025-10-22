import { getVehicle } from "@/lib/vehicleActions";
import Link from "next/link";
import Image from "next/image";
// import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function VehicleLists() {
  const { vehicles, error } = await getVehicle();
  if (error) {
    return (
      <div className="bg-white text-gray-900 font-sans">
        <div className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
          <div className="max-w-lg mx-auto px-4 text-center">
            {/* Car Illustration */}
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center">
                <svg
                  className="w-20 h-20 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
                </svg>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Oops! Something unexpected
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              We searched everywhere but couldn`&apos;`t find this vehicle in
              our showroom.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="block w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg font-medium transition"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center pt-20 px-4">
        <div className="max-w-md w-full mx-auto">
          {/* Content */}
          <div className="bg-white py-8 px-6 shadow rounded-lg">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">404</h1>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                No Vehicles Found
              </h2>
              <p className="text-gray-600 mb-6">
                No vehicles are currently available in the database.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      {vehicles.map((vehicle: Vehicle) => (
        <div
          key={vehicle.vehicle_id}
          className="relative h-[250px] sm:h-[350px] md:h-[650px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        >
          <Image
            src={`${vehicle.vehicle_banner}`}
            alt={`${vehicle.vehicle_name} banner`}
            width={1400}
            height={1000}
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute bottom-5 sm:bottom-12 z-10">
            <Link
              href={`/vehicle/${vehicle.vehicle_id}`}
              className="text-sm sm:text-lg border-2 bg-white opacity-85 text-[#d7000f] px-7 py-2 sm:px-14 sm:py-3 font-semibold hover:bg-[#d7000f] hover:text-white hover:opacity-85 transition duration-300"
            >
              Jelajahi
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
