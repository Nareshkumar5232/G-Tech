import { Mail, Phone, MapPin, Clock, Shield, Building2, FileText, Landmark } from 'lucide-react';
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

        {/* Business Credentials & Bank Details */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Business Credentials & Trust Information</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Certificates & Registrations */}
            <Card className="border-2 border-green-100">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Shield className="w-6 h-6" />
                  Certificates & Registrations
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">PAN Number</p>
                      <p className="text-gray-800 font-semibold">ADGPA3417L</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">GST Number</p>
                      <p className="text-gray-800 font-semibold">33ADGPA3417L2ZV</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Building2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">MSME Registration (Udyam)</p>
                      <p className="text-gray-800 font-semibold">UDYAM-TN-02-0121032</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Import & Export Licence (IEC)</p>
                      <p className="text-gray-800 font-semibold">0404002277</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bank Details */}
            <Card className="border-2 border-blue-100">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Landmark className="w-6 h-6" />
                  Bank Details
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Building2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Company Name</p>
                      <p className="text-gray-800 font-semibold">SATURN SYSTEMS</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Account Number</p>
                      <p className="text-gray-800 font-semibold">231902000000478</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Landmark className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Bank Name</p>
                      <p className="text-gray-800 font-semibold">Indian Overseas Bank (IOB)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">IFSC Code & Branch</p>
                      <p className="text-gray-800 font-semibold">IOBA0002319</p>
                      <p className="text-sm text-gray-600">Gill Nagar, Choolaimedu</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trust Badge */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full shadow-lg">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">Government Registered & Verified Business</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
