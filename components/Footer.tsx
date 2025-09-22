export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="container mx-auto px-4 text-center text-sm">
        <p>© {new Date().getFullYear()} ImgCompressor. All rights reserved.</p>
        <p className="mt-2">
          <a href="/privacy" className="hover:text-teal-400">
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
}
