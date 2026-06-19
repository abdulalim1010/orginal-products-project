import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Original<span className="text-blue-500">Products</span>
            </h2>

            <p className="text-sm leading-6 text-gray-400">
              Discover authentic products, premium quality, and the best
              shopping experience all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="hover:text-blue-400 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/products"
                  className="hover:text-blue-400 transition"
                >
                  Products
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="hover:text-blue-400 transition"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-blue-400 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Categories
            </h3>

            <ul className="space-y-3">
              <li>Smartphones</li>
              <li>Laptops</li>
              <li>Accessories</li>
              <li>Gaming</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact
            </h3>

            <ul className="space-y-3">
              <li>📧 support@originalproducts.com</li>
              <li>📞 +880 1234-567890</li>
              <li>📍 Rangpur, Bangladesh</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Original Products. All rights
            reserved.
          </p>

          <div className="flex items-center gap-5 text-sm">
            <Link
              href="/privacy-policy"
              className="hover:text-blue-400 transition"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-blue-400 transition"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}