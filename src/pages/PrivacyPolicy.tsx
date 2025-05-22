
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | YT Scribe</title>
        <meta name="description" content="Privacy Policy for YT Scribe - Learn how we handle your data." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow container py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="prose prose-sm sm:prose dark:prose-invert max-w-none">
              <p className="text-muted-foreground mb-6">Last Updated: May 21, 2025</p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p>
                  This Privacy Policy explains how YT Scribe ("we", "us", or "our") collects, uses, and discloses information about you when you use our website and services. We respect your privacy and are committed to protecting your personal data.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                <p>We collect minimal information when you use our services:</p>
                <ul className="list-disc pl-6 my-4">
                  <li>YouTube video IDs and URLs that you input for transcript extraction</li>
                  <li>Technical information such as browser type, device information, and IP address</li>
                  <li>Usage data including pages visited, features used, and time spent on site</li>
                </ul>
                <p>We do not require you to create an account or provide personal information to use our basic services.</p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. How We Use Information</h2>
                <p>We use the collected information to:</p>
                <ul className="list-disc pl-6 my-4">
                  <li>Provide and maintain our services</li>
                  <li>Improve and optimize our website and user experience</li>
                  <li>Monitor usage patterns and analyze trends</li>
                  <li>Detect and prevent technical issues or abuse</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Data Sharing</h2>
                <p>
                  We do not sell your personal information to third parties. We may share non-personal, aggregated data with trusted partners for analytical purposes. We may access YouTube's API services to retrieve transcript data on your behalf.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Cookies and Similar Technologies</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amounts of data that may include an anonymous unique identifier.
                </p>
                <p>
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us through the information provided on our Contact page.
                </p>
              </section>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
