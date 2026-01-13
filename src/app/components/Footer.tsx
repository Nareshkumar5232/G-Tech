import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-600 p-2 rounded-lg">
                <div className="w-8 h-8 flex items-center justify-center">
                  <span className="text-2xl font-bold">G</span>
                </div>
              </div>
              <div>
                <div className="text-xl font-bold">G-TECH INNOVATION</div>
                <div className="text-xs text-gray-400">Your Tech Partner</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted partner for brand new and used laptops, desktops, accessories, 
              networking products, and CCTV solutions in Chennai.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-600">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-gray-400">
                  1st Floor, Vijaya Lakshmi Complex, #12,<br />
                  Athipattan Street, Richie Street,<br />
                  Mount Road, Chennai – 600002
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div>
                  <div className="text-gray-400">044-3539-5138</div>
                  <div className="text-gray-400">+91 93637 06040</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-600 flex-shrink-0" />
                <a
                  href="mailto:reach2gtech@gmail.com"
                  className="text-gray-400 hover:text-red-600 transition-colors"
                >
                  reach2gtech@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-red-600">Business Hours</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Monday - Saturday:</span>
                <span>10:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>10:00 AM - 6:00 PM</span>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Our Services</h4>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>• New & Used Laptops</li>
                <li>• Desktop Computers</li>
                <li>• Computer Accessories</li>
                <li>• Networking Solutions</li>
                <li>• CCTV Installation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} G-TECH INNOVATION. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
