'use client';

import Image from 'next/image';// Update path if needed
import { motion } from 'framer-motion';

// Lucide React icons
import {
  Eye,           // Access
  Edit3,         // Rectification
  Trash2,        // Erasure
  Pause,         // Restriction
  UserCog,       // Personalization
  MessageCircle, // Communication
  TrendingUp,    // Improvements
  Shield,        // Security
  Mail,
  Phone
} from 'lucide-react';

const PrivacyPolicy = () => {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-4xl mx-auto">
        {/* Header with animated gradient */}
        <motion.header 
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm p-8 mb-12 overflow-hidden border border-gray-200"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center">
            {/* Text Content - Left Side */}
            <div className="md:w-2/3 text-left pr-0 md:pr-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
              <p className="text-gray-600 text-lg max-w-2xl">
                Your privacy matters to us. This document explains how we collect, use, and protect your information.
              </p>
              <div className="mt-6">
                <span className="inline-block px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-full text-sm font-medium transition-all">
                  Last Updated: June 2023
                </span>
              </div>
            </div>

            {/* Image Placeholder - Right Side */}
            <div className="hidden md:block md:w-2/3 mt-8 md:mt-0">
              <div className="relative h-full min-h-[300px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-blue-100/30 flex items-center justify-center">
                  <Image 
                    src="/logos/privacy.png"
                    alt="Privacy Visual"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Policy content with smooth scrolling sections */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Table of Contents */}
          <div className="bg-gray-50 p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Table of Contents</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "Introduction",
                "Information We Collect",
                "Use of Data", 
                "Data Sharing & Security",
                "User Rights",
                "Contact Us"
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href={`#section-${index+1}`} 
                    onClick={(e) => handleSectionClick(e, `section-${index+1}`)}
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                  >
                    <span className="mr-2 text-blue-500">{index + 1}.</span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy Sections */}
          <div className="divide-y divide-gray-200">
            {/* Introduction */}
            <section id="section-1" className="p-6 md:p-8 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1">
                  <span className="text-blue-600 font-medium">1</span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
                  <div className="prose prose-blue max-w-none text-gray-600">
                    <p>
                      Welcome to Study In Global. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                    </p>
                    <p>
                      Please read this policy carefully. By accessing or using our service, you agree to the collection and use of information in accordance with this policy.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Information We Collect */}
            <section id="section-2" className="p-6 md:p-8 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1">
                  <span className="text-blue-600 font-medium">2</span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
                  <div className="prose prose-blue max-w-none text-gray-600">
                    <p>We collect several types of information from and about users of our website, including:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Personal Data:</strong> Name, email address, phone number, and other contact information you provide when registering or contacting us.</li>
                      <li><strong>Usage Data:</strong> Information about how you interact with our website (pages visited, time spent, etc.) collected through cookies and similar technologies.</li>
                      <li><strong>Technical Data:</strong> IP address, browser type, device information, and other technical details.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Use of Data */}
            <section id="section-3" className="p-6 md:p-8 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1">
                  <span className="text-blue-600 font-medium">3</span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Use of Data</h2>
                  <div className="prose prose-blue max-w-none text-gray-600">
                    <p>We use the information we collect for various purposes:</p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      {[
                        { 
                          icon: <UserCog className="h-6 w-6 text-purple-600" />, 
                          title: "Personalization", 
                          desc: "To provide personalized content and recommendations" 
                        },
                        { 
                          icon: <MessageCircle className="h-6 w-6 text-blue-600" />, 
                          title: "Communication", 
                          desc: "To respond to your inquiries and provide support" 
                        },
                        { 
                          icon: <TrendingUp className="h-6 w-6 text-green-600" />, 
                          title: "Improvements", 
                          desc: "To analyze and improve our website and services" 
                        },
                        { 
                          icon: <Shield className="h-6 w-6 text-red-600" />, 
                          title: "Security", 
                          desc: "To detect and prevent fraudulent activity" 
                        }
                      ].map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors shadow-sm">
                          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                            {item.icon}
                          </div>
                          <h3 className="font-medium text-gray-800">{item.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Sharing & Security */}
            <section id="section-4" className="p-6 md:p-8 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1">
                  <span className="text-blue-600 font-medium">4</span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Sharing & Security</h2>
                  <div className="prose prose-blue max-w-none text-gray-600">
                    <p>We value your trust and implement appropriate security measures:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>We only share data with third parties when necessary for service provision or when required by law</li>
                      <li>All data transfers use secure protocols and encryption</li>
                      <li>We implement access controls and regular security audits</li>
                    </ul>
                    <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                      <p className="text-yellow-700"><strong>Note:</strong> While we strive to protect your data, no internet transmission is 100% secure. We cannot guarantee absolute security.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* User Rights */}
            <section id="section-5" className="p-6 md:p-8 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1">
                  <span className="text-blue-600 font-medium">5</span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Rights</h2>
                  <div className="prose prose-blue max-w-none text-gray-600">
                    <p>You have certain rights regarding your personal data:</p>
                    <div className="mt-4 space-y-4">
                      {[
                        { 
                          icon: <Eye className="h-5 w-5 text-blue-600" />, 
                          right: "Access", 
                          desc: "Request a copy of your personal data" 
                        },
                        { 
                          icon: <Edit3 className="h-5 w-5 text-green-600" />, 
                          right: "Rectification", 
                          desc: "Correct inaccurate or incomplete data" 
                        },
                        { 
                          icon: <Trash2 className="h-5 w-5 text-red-600" />, 
                          right: "Erasure", 
                          desc: "Request deletion of your personal data" 
                        },
                        { 
                          icon: <Pause className="h-5 w-5 text-yellow-600" />, 
                          right: "Restriction", 
                          desc: "Limit how we use your data" 
                        }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mr-3 mt-1">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">{item.right}</h3>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-6">To exercise these rights, please contact us using the information below.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Us */}
            <section id="section-6" className="p-6 md:p-8 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1">
                  <span className="text-blue-600 font-medium">6</span>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
                  <div className="prose prose-blue max-w-none text-gray-600">
                    <p>If you have questions about this policy or your personal data:</p>
                    <div className="mt-6 bg-blue-50 rounded-lg p-6 max-w-md">
                      <h3 className="font-medium text-blue-800 mb-3">Study In Global Data Protection</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Mail className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                          <span>privacy@studyinglobal.co.uk</span>
                        </li>
                        <li className="flex items-start">
                          <Phone className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                          <span>+44 (20) 3983-5140</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Back to top button */}
        <div className="mt-8 text-center">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
          >
            ↑ Back to Top
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;