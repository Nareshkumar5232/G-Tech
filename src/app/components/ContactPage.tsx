import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { toast } from 'sonner';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-gray-300 text-lg">Get in touch with Saturn Systems</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <MapPin className="w-5 h-5" />
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  #16/127, Inbharajapuram 1st Street,<br />
                  Bajanai Kovil Street, Choolaimedu,<br />
                  Chennai - 600 094
                </p>
              </CardContent>
            </Card>

            {/* Phone */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Phone className="w-5 h-5" />
                  Call Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a href="tel:9342798344" className="block text-gray-700 hover:text-blue-600 transition-colors">
                  Mobile: 93427 98344
                </a>
                <a href="tel:04431544571" className="block text-gray-700 hover:text-blue-600 transition-colors">
                  Office: 044-3154 4571
                </a>
                <a href="tel:04435395138" className="block text-gray-700 hover:text-blue-600 transition-colors">
                  Shop: 044-3539 5138
                </a>
              </CardContent>
            </Card>

            {/* Email */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Mail className="w-5 h-5" />
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:usedlapz@gmail.com"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  usedlapz@gmail.com
                </a>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Clock className="w-5 h-5" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Saturday:</span>
                  <span className="font-medium">10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday:</span>
                  <span className="font-medium">10:00 AM - 6:00 PM</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div>
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5897766259826!2d80.21696261482243!3d13.064389990787877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAzJzUxLjgiTiA4MMKwMTMnMDkuMSJF!5e0!3m2!1sen!2sin!4v1706527646000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Saturn Systems Location - Choolaimedu, Chennai"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
