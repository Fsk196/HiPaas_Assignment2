export const getResponse = (input) => {
    const lowerCaseInput = input.toLowerCase();
    
    // Check for keywords in the user input and return the corresponding response
    for (const key in responses) {
      if (lowerCaseInput.includes(key)) {
        return responses[key];
      }
    }
    
    // Fallback response
    return "I'm sorry, I didn't quite understand that. Can you please rephrase?";
  };

export const responses = {
  "what is dealerpaas?":
    "DealerPaaS is a future-ready platform for seamless management of an auto dealership ecosystem.",

  "how can i manage sales?":
    "You can handle sales order management, track vehicle sales, manage inventory, and set sales targets to ensure smooth operations.",

  "what features does dealerpaas offer for sales?":
    "DealerPaaS helps with sales order management, vehicle sales tracking, inventory control, supplier coordination, and sales target monitoring.",

  "how do i track vehicle inventory?":
    "You can track vehicle availability, manage stock levels, and coordinate with suppliers to ensure you have the right vehicles available for sale.",

  "can dealerpaas manage customer data?":
    "Yes, it centralizes customer data, including contact information, purchase history, and interaction records for better customer relationship management.",

  "how does dealerpaas help with crm?":
    "DealerPaaS helps personalize customer interactions, automate communications, track engagement, and improve customer retention.",

  "how do i handle vehicle purchases?":
    "You can manage vehicle purchases, negotiate with suppliers, and ensure timely delivery of vehicles from manufacturers.",

  "how does dealerpaas handle service management?":
    "DealerPaaS manages service operations such as scheduling, tracking service appointments, and handling warranty claims efficiently.",

  "how do i manage spare parts orders?":
    "DealerPaaS streamlines spare parts order processing, tracks inventory, and helps you manage parts purchases and sales effectively.",

  "what accounting features are available?":
    "DealerPaaS simplifies bank and cash transactions, generates financial reports, manages debit/credit notes, and ensures accurate vehicle inventory tracking.",

  "how can i track financials with dealerpaas?":
    "You can generate detailed trial balances, balance sheets, and maintain up-to-date financial records, ensuring compliance and transparency.",

  "does dealerpaas integrate with oem systems?":
    "Yes, DealerPaaS seamlessly integrates with OEM systems to ensure smooth data exchange and alignment with dealership operations.",

  "can i integrate dealerpaas with third-party systems?":
    "Yes, DealerPaaS supports integration with third-party accounting systems to streamline financial management.",

  "how do i create marketing campaigns in dealerpaas?":
    "DealerPaaS allows you to create targeted marketing campaigns based on customer data, improving engagement and retention.",

  "what are the service features in dealerpaas?":
    "DealerPaaS provides service scheduling, job order management, service quotation generation, and tracking from initiation to completion.",

  "how does dealerpaas handle warranty claims?":
    "DealerPaaS manages warranty and coupon claims, ensuring accurate processing and compliance with dealership or manufacturer policies.",

  "can dealerpaas track customer engagement?":
    "Yes, it tracks customer engagement and analyzes data to improve retention and relationship management.",

  "how do i track service appointments?":
    "You can schedule, manage, and track customer appointments, ensuring efficient resource allocation and time management for services.",

  "how does dealerpaas help with vehicle pricing?":
    "DealerPaaS oversees vehicle sales and billing, ensuring accurate pricing, invoicing, and compliance with financial regulations.",

  "what are the benefits of using dealerpaas?":
    "Using DealerPaaS can improve operational efficiency, enhance customer satisfaction, provide data-driven insights, and support seamless integration with various systems.",

  "how does dealerpaas ensure data security?":
    "DealerPaaS complies with relevant regulations and industry standards to ensure data accuracy and security, protecting customer information.",

  "can dealerpaas assist with compliance?":
    "Yes, DealerPaaS helps ensure compliance with financial regulations, inventory management, and customer data protection standards.",

  "how can i improve customer retention with dealerpaas?":
    "You can use personalized communications, automate follow-ups, and analyze customer engagement data to enhance retention strategies.",

  "what reporting capabilities does dealerpaas offer?":
    "DealerPaaS provides detailed reports on sales, inventory, financial performance, and customer engagement to aid decision-making.",

  "how do i manage employee performance with dealerpaas?":
    "DealerPaaS allows you to set performance metrics, monitor sales targets, and analyze employee contributions to improve productivity.",

  "is dealerpaas suitable for small dealerships?":
    "Yes, DealerPaaS is designed to scale with your business and can benefit dealerships of all sizes by streamlining operations.",
};
