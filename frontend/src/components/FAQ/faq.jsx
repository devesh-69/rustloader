  // Example image

  const FAQs = () => {
    return (
      <section id="faq" className="faq-section bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4 lg:px-12">
          <h2 className="text-5xl font-extrabold text-center text-blue-800 mb-16">Frequently Asked Questions (FAQs)</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* FAQ Item 1 */}
            <div className="faq-item bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl flex flex-col lg:flex-row transition-all">
              <img src="" alt="How to book" className="w-full lg:w-1/3 h-48 object-cover rounded-md mb-6 lg:mb-0 lg:mr-6" />
              <div>
                <h3 className="faq-question text-2xl font-bold text-blue-800">How can I book a vehicle?</h3>
                <p className="faq-answer text-gray-700 mt-4">
                  Simply browse the available vehicle options using our filters to narrow down your search by type and location. Once you’ve found the right one, fill out the booking form, confirm your details, and make the payment. You’ll receive a confirmation via email.
                </p>
              </div>
            </div>
  
            {/* FAQ Item 2 */}
            <div className="faq-item bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl flex flex-col lg:flex-row transition-all">
              <img src="" alt="List vehicle" className="w-full lg:w-1/3 h-48 object-cover rounded-md mb-6 lg:mb-0 lg:mr-6" />
              <div>
                <h3 className="faq-question text-2xl font-bold text-blue-800">How do I list my vehicle?</h3>
                <p className="faq-answer text-gray-700 mt-4">
                  Listing your vehicle is easy. Navigate to the "List Your Vehicle" section, fill in the required details such as make, model, year, and pricing. Upload images and set availability. Once submitted, your vehicle will appear in our listings. Manage your rentals from the owner dashboard.
                </p>
              </div>
            </div>
  
            {/* FAQ Item 3 */}
            <div className="faq-item bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl flex flex-col lg:flex-row transition-all">
              <img src="" alt="Support" className="w-full lg:w-1/3 h-48 object-cover rounded-md mb-6 lg:mb-0 lg:mr-6" />
              <div>
                <h3 className="faq-question text-2xl font-bold text-blue-800">What should I do if I encounter a problem during rental?</h3>
                <p className="faq-answer text-gray-700 mt-4">
                  If you experience any issues during your rental, we’re here to help. Use our support center to submit a ticket or contact us directly through the live chat feature available in your dashboard.
                </p>
              </div>
            </div>
  
            {/* FAQ Item 4 */}
            <div className="faq-item bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl flex flex-col lg:flex-row transition-all">
              <div>
                <h3 className="faq-question text-2xl font-bold text-blue-800">Are there any additional fees during the rental process?</h3>
                <p className="faq-answer text-gray-700 mt-4">
                  There are no hidden fees. However, optional add-ons such as insurance, GPS, or additional drivers may incur extra charges. All costs will be clearly displayed before confirming your booking.
                </p>
              </div>
            </div>
  
            {/* FAQ Item 5 */}
            <div className="faq-item bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl flex flex-col lg:flex-row transition-all">
              <div>
                <h3 className="faq-question text-2xl font-bold text-blue-800">How can I cancel or modify my booking?</h3>
                <p className="faq-answer text-gray-700 mt-4">
                  You can easily modify or cancel your booking by navigating to the "My Bookings" section in your dashboard. Please note that our cancellation policy applies, and you may be charged a cancellation fee depending on the timing.
                </p>
              </div>
            </div>
  
            {/* FAQ Item 6 */}
            <div className="faq-item bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl flex flex-col lg:flex-row transition-all">
              <div>
                <h3 className="faq-question text-2xl font-bold text-blue-800">How secure is the payment process?</h3>
                <p className="faq-answer text-gray-700 mt-4">
                  We use industry-standard encryption to protect your payment information. All transactions are processed securely via trusted payment gateways. Additionally, our platform supports various payment methods, including credit/debit cards and secure online payments.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    );
  };
  
  export default FAQs;
  