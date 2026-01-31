'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Lucide React icons
import {
  FileText,      // For Scope
  AlertTriangle, // For No Guarantee
  UserCheck,     // For Responsibilities
  CreditCard,    // For Fees
  UserCog,       // Admission/Counseling
  MessageCircle, // Communication
  GraduationCap, // Test Prep
  Shield,        // Security
  Mail,
  Phone,
  Gavel,          // Governing Law
  BookOpen,      // Intro
  Database       // Data Collection
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
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Privacy Policy & Terms</h1>
              <p className="text-gray-600 text-lg max-w-2xl">
                At E-Spot International Education Consultancy, we respect your privacy and are committed to protecting the personal information you share with us.
              </p>
              <div className="mt-6">
                <span className="inline-block px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-full text-sm font-medium transition-all">
                  Last Updated: January 2026
                </span>
              </div>
            </div>

            {/* Image Placeholder - Right Side */}
            <div className="hidden md:block md:w-2/3 mt-8 md:mt-0">
              <div className="relative h-full min-h-[300px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-blue-100/30 flex items-center justify-center">
                  <Image 
                    src="/logos/privacy.png" // Ensure this image exists in your public folder
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
                "How We Use Data", 
                "Security & Sharing",
                "Terms & Conditions",
                "Governing Law"
              ].map((item, index) => (
                <li key={index}>
                  <button 
                    onClick={(e) => handleSectionClick(e, `section-${index+1}`)}
                    className="flex items-center text-left text-blue-600 hover:text-blue-800 transition-colors cursor-pointer focus:outline-none"
                  >
                    <span className="mr-2 text-blue-500 font-semibold">{index + 1}.</span>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy Sections */}
          <div className="divide-y divide-gray-200">
            
            {/* 1. Introduction */}
            <section id="section-1" className="p-6 md:p-8 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
                  <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
                    <p className="mb-4">
                      This Privacy Policy explains how we collect, use, store, and safeguard your data when you interact with our services. By using our services and submitting your information, you consent to the collection and use of your data as outlined in this Privacy Policy.
                    </p>
                    <p>
                       E-Spot International reserves the right to update or modify this Privacy Policy at any time. Any changes will be effective immediately upon publication.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Information We Collect */}
            <section id="section-2" className="p-6 md:p-8 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
                  <div className="prose prose-blue max-w-none text-gray-600">
                    <p className="mb-4">We may collect personal information including, but not limited to:</p>
                    <ul className="list-disc pl-5 space-y-3">
                      <li><strong>Personal Details:</strong> Full name, date of birth, contact details (phone number, email, address).</li>
                      <li><strong>Education Records:</strong> Academic records and educational background.</li>
                      <li><strong>Identity Documents:</strong> Identification documents such as passport and citizenship.</li>
                      <li><strong>Application Data:</strong> Visa, immigration, and application-related information.</li>
                      <li><strong>Voluntary Info:</strong> Any additional information voluntarily provided for counseling or processing purposes.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Use of Data (Grid Layout) */}
            <section id="section-3" className="p-6 md:p-8 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1">
                  <UserCog className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
                  <div className="prose prose-blue max-w-none text-gray-600">
                    <p>The information collected is used strictly for the following purposes:</p>
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                      {[
                        { 
                          icon: <UserCog className="h-6 w-6 text-purple-600" />, 
                          title: "Admission Counseling", 
                          desc: "Providing education counseling and university/college admission processing." 
                        },
                        { 
                          icon: <MessageCircle className="h-6 w-6 text-blue-600" />, 
                          title: "Communication", 
                          desc: "Communicating regarding your application status or service updates." 
                        },
                        { 
                          icon: <GraduationCap className="h-6 w-6 text-green-600" />, 
                          title: "Visa & Prep", 
                          desc: "Visa application preparation, submission, and test preparation guidance." 
                        },
                        { 
                          icon: <Shield className="h-6 w-6 text-red-600" />, 
                          title: "Internal Records", 
                          desc: "Internal record-keeping and service improvement." 
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

            {/* 4. Data Sharing & Security */}
            <section id="section-4" className="p-6 md:p-8 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Protection & Sharing</h2>
                  <div className="prose prose-blue max-w-none text-gray-600">
                    <p className="mb-4">We implement appropriate administrative and technical measures to protect your personal data from unauthorized access or misuse.</p>
                    <ul className="list-disc pl-5 space-y-3">
                      <li>Access to sensitive information is limited to authorized staff only.</li>
                      <li>We do not sell, trade, or rent your personal data to third parties for marketing purposes.</li>
                      <li>Data is shared only with universities, embassies, or official authorities for application purposes.</li>
                      <li>We may share data with trusted third parties strictly involved in service delivery.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Terms & Conditions */}
            <section id="section-5" className="p-6 md:p-8 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Terms & Conditions</h2>
                  <div className="prose prose-blue max-w-none text-gray-600">
                    <p className="mb-6">By engaging with E-Spot International Education Consultancy, you agree to the following:</p>
                    <div className="space-y-4">
                      {[
                        { 
                          icon: <FileText className="h-5 w-5 text-blue-600" />, 
                          title: "Scope of Services", 
                          desc: "We provide counseling, admission assistance, and visa documentation support. Final decisions are made solely by educational institutions and government authorities." 
                        },
                        { 
                          icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />, 
                          title: "No Guarantee Clause", 
                          desc: "We do not guarantee admission, visa approval, or scholarships. All outcomes depend on eligibility, documentation, and external authorities." 
                        },
                        { 
                          icon: <UserCheck className="h-5 w-5 text-green-600" />, 
                          title: "Client Responsibilities", 
                          desc: "Clients must provide truthful information and genuine documents. We are not liable for rejections caused by false information." 
                        },
                        { 
                          icon: <CreditCard className="h-5 w-5 text-red-600" />, 
                          title: "Fees & Payments", 
                          desc: "Service fees are non-refundable unless stated in writing. Fees cover consultancy services only and exclude embassy/university charges." 
                        }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start p-3 rounded-lg hover:bg-gray-50/80 transition-colors">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mr-4 mt-1">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{item.title}</h3>
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Governing Law / Contact */}
            <section id="section-6" className="p-6 md:p-8 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1">
                  <Gavel className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Governing Law & Contact</h2>
                  <div className="prose prose-blue max-w-none text-gray-600">
                    <p className="mb-4">
                       These Terms & Conditions shall be governed by and interpreted in accordance with the laws of <strong>Nepal</strong>. We reserve the right to refuse or terminate services if false information is provided or terms are violated.
                    </p>

                    <div className="mt-8 bg-blue-50/80 border border-blue-100 rounded-xl p-6 max-w-md">
                      <h3 className="font-semibold text-blue-900 mb-4">E-Spot International Support</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <Gavel className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                          <span className="text-blue-800">Jurisdiction: Nepal</span>
                        </li>
                        <li className="flex items-center">
                          <Mail className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                          <span className="text-blue-800">info@espot.edu.np</span>
                        </li>
                        <li className="flex items-center">
                          <Phone className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                          <span className="text-blue-800">Contact your local branch</span>
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
            className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 hover:text-blue-600 cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
          >
            ↑ Back to Top
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;