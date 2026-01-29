import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white p-2 rounded-lg">
                <img 
                  src="/logo.png" 
                  alt="Saturn Systems" 
                  className="w-16 h-16"
                  style={{ objectFit: 'contain' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="w-16 h-16 flex items-center justify-center text-blue-600 font-bold text-4xl">S</div>';
                    }
                  }}
                />
              </div>
              <div>
                <div className="text-xl font-bold">SATURN SYSTEMS</div>
                <div className="text-xs text-gray-300">Laptops Sales & Services</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted partner for new & used laptops, refurbished computers, 
              sales & buyback, repair & services in Chennai.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-600">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-gray-300">
                  #16/127, Inbharajapuram 1st Street,<br />
                  Bajanai Kovil Street, Choolaimedu,<br />
                  Chennai - 600 094
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <div className="text-gray-300">Office: 044-3154 4571</div>
                  <div className="text-gray-300">Shop: 044-3539 5138</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <a
                  href="mailto:usedlapz@gmail.com"
                  className="text-gray-300 hover:text-blue-600 transition-colors"
                >
                  usedlapz@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-600">Business Hours</h3>
            <div className="space-y-2 text-sm text-gray-300">
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
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• New & Used Laptops</li>
                <li>• Refurbished Laptops</li>
                <li>• Sales & Buyback</li>
                <li>• Repair & Services</li>
                <li>• Computer Accessories</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Saturn Systems. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
