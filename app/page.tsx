import ImageUploader from "@/components/ImageUploader";

export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">
        Free Online Image Compressor
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Compress your images instantly without losing quality. 
        Fast • Secure • Free 🚀
      </p>
      <ImageUploader />
    </div>
  );
}
