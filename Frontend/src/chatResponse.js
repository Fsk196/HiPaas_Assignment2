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

export const context = `
DealerPaaS is an AI-powered platform designed for auto dealerships. 
It helps manage sales order processing, vehicle inventory, CRM, service operations, accounting, integration with OEM systems, and spare parts management. 
The solution aims to streamline dealership operations, improve customer interactions, and ensure compliance with financial regulations. 
Key features include sales order management, customer relationship management, service scheduling, financial tracking, and parts inventory management.
`;

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

  "how do i get started with dealerpaas?":
    "To get started with DealerPaaS, you can sign up for a demo, contact our sales team, or visit our website for more information.",

  "what kind of training does dealerpaas offer?":
    "DealerPaaS provides comprehensive training programs, including online resources, webinars, and one-on-one training sessions to help users maximize the platform's potential.",

  "can dealerpaas help with lead management?":
    "Yes, DealerPaaS offers lead management features that allow you to capture, track, and nurture leads effectively to boost sales.",

  "how does dealerpaas handle customer support?":
    "DealerPaaS provides 24/7 customer support through various channels, including phone, email, and live chat, to assist users with any issues.",

  "is dealerpaas customizable?":
    "Yes, DealerPaaS is highly customizable, allowing you to tailor the platform to meet your specific business needs and processes.",

  "how can i analyze sales performance with dealerpaas?":
    "You can analyze sales performance using the reporting tools in DealerPaaS, which provide insights into sales trends, team performance, and overall profitability.",

  "what mobile features does dealerpaas offer?":
    "DealerPaaS offers mobile-friendly features, allowing you to manage operations, access reports, and communicate with customers on the go.",

  "how does dealerpaas support multi-location dealerships?":
    "DealerPaaS is designed to support multi-location dealerships by providing centralized management tools, inventory control, and reporting across all locations.",

  "can i access dealerpaas from anywhere?":
    "Yes, DealerPaaS is cloud-based, allowing you to access the platform from any device with an internet connection.",

  "what integrations does dealerpaas offer?":
    "DealerPaaS offers integrations with various third-party applications, including CRM, accounting, and inventory management systems, to streamline your operations.",

  "how can i improve online sales with dealerpaas?":
    "You can enhance online sales through targeted marketing campaigns, an optimized website, and leveraging analytics to understand customer behavior.",

  "what tools does dealerpaas provide for customer communication?":
    "DealerPaaS provides communication tools such as email templates, SMS notifications, and automated follow-up reminders to enhance customer interaction.",

  "how does dealerpaas help with trade-ins?":
    "DealerPaaS facilitates trade-in management by assessing vehicle values, processing trade-in agreements, and ensuring a seamless transaction for customers.",

  "can dealerpaas manage leasing options?":
    "Yes, DealerPaaS includes features for managing leasing options, helping you present different plans to customers and handle leasing agreements efficiently.",

  "what are the best practices for using dealerpaas effectively?":
    "Best practices include regular training, leveraging analytics for decision-making, maintaining accurate data, and optimizing communication with customers.",

  "how can dealerpaas assist in improving service efficiency?":
    "DealerPaaS assists in improving service efficiency through automated scheduling, real-time tracking of service status, and streamlined communication with customers.",

  "can dealerpaas generate invoices?":
    "Yes, DealerPaaS can automatically generate invoices for sales, services, and parts transactions, ensuring accuracy and compliance with financial regulations.",

  "how does dealerpaas help with market analysis?":
    "DealerPaaS provides analytics tools that help you analyze market trends, customer preferences, and sales data to make informed business decisions.",

  "what security measures does dealerpaas implement?":
    "DealerPaaS implements multiple security measures, including data encryption, regular backups, and access controls to protect sensitive information.",

  "how can i customize reports in dealerpaas?":
    "You can customize reports in DealerPaaS by selecting specific metrics, date ranges, and data sources to generate tailored insights for your dealership.",

  "does dealerpaas offer performance tracking for marketing campaigns?":
    "Yes, DealerPaaS provides tools to track the performance of marketing campaigns, allowing you to analyze ROI and optimize future strategies.",
};
