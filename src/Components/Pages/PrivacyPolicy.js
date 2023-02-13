import React, { useEffect } from "react";
import Footer from "../Footer";
import Header from "../Nav/Header";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <div
        className="container"
        style={{ textAlign: "justify", padding: "7%" }}
      >
        <h2 className="heading-policy">Privacy policy</h2>
        <p className="paragraph-space" style={{ fontSize: "15px" }}>
          This Privacy Policy describes how www.creare.com, the site, collects,
          uses, and discloses your Personal Information when you visit or make a
          purchase from the Site.
        </p>
        <br />
        <h4 className="heading-policy paragraph-space">Collecting Personal Information</h4>
        <p className="paragraph-space">
          When you visit the Site, we collect certain information about your
          device, your interaction with the Site, and information necessary to
          process your purchases. We may also collect additional information if
          you contact us for customer support. In this Privacy Policy, we refer
          to any information that can uniquely identify an individual (including
          the information below) as “Personal Information”. See the list below
          for more information about what Personal Information we collect and
          why.
        </p>
        We collect Device Information using the following technologies:
        <ul>
          <li>
            “Cookies” are data files that are placed on your device or computer
            and often include an anonymous unique identifier. For more
            information about cookies, and how to disable cookies, visit
            http://www.allaboutcookies.org.
          </li>
          <li>
            “Log files” track actions occurring on the Site, and collect data
            including your IP address, browser type, Internet service provider,
            referring/exit pages, and date/time stamps.
          </li>
          <li>
            “Web beacons”, “tags”, and “pixels” are electronic files used to
            record information about how you browse the Site.
          </li>
        </ul>
        <br />
        <p className="paragraph-space">
          Additionally when you make a purchase or attempt to make a purchase
          through the Site, we collect certain information from you, including
          your name, billing address, shipping address, payment information
          (including credit card numbers), email address, and phone number. We
          refer to this information as “Order Information”.
        </p>
        <br />
        <p className="paragraph-space">
          When we talk about “Personal Information” in this Privacy Policy, we
          are talking both about Device Information and Order Information.
        </p>
        <h4 className="heading-policy">Device information</h4>
        <p className="paragraph-space">
          Examples of Personal Information collected: version of web browser, IP
          address, time zone, cookie information, what sites or products you
          view, search terms, and how you interact with the Site.
        </p>
        <ul>
          <li>
            Purpose of collection: to load the Site accurately for you, and to
            perform analytics on Site usage to optimise our Site.
          </li>
          <li>
            Source of collection: Collected automatically when you access our
            Site using cookies, log files, web beacons, tags, or pixels
          </li>
          <li>
            Disclosure for a business purpose: shared with our processor: Kavara
            Tech, Heroku, Razorpay , received via Order information
          </li>
          <li>
            Examples of Personal Information collected: name, billing address,
            shipping address, payment information (including credit card
            numbers, Gpay number, Paytm number), email address, and phone
            number.
          </li>
          <li>
            Purpose of collection: to provide products or services to you to
            fulfil our contract, to process your payment information, arrange
            for shipping, and provide you with invoices and/or order
            confirmations, communicate with you, screen our orders for potential
            risk or fraud, and when in line with the preferences you have shared
            with us, provide you with information or advertising relating to our
            products or services.
          </li>
          <li>Source of collection: collected from you.</li>
          <li>
            Disclosure for a business purpose: shared with our processor: Kavara
            Tech, Heroku, Razorpay Customer support information.
          </li>
        </ul>
        <h4 className="heading-policy">Policy For Minors</h4>
        <p className="paragraph-space">
          The Site is not intended for individuals under the age of 12. We do
          not intentionally collect Personal Information from children. If you
          are the parent or guardian and believe your child has provided us with
          Personal Information, please contact us at the address below to
          request deletion. Sharing Personal Information We share your Personal
          Information with service providers to help us provide our services and
          fulfil our contracts with you, as described above. For example,
        </p>
        <ul>
          <li>
            We may share your Personal Information to comply with applicable
            laws and regulations, to respond to a subpoena,search warrant or
            other lawful request for information we receive, or to otherwise
            protect our rights
          </li>
        </ul>
        <h4 className="heading-policy">Behavioural Advertising</h4>
        <p className="paragraph-space">
          As described above, we use your Personal Information to provide you
          with targeted advertisements or marketing communications we believe
          may be of interest to you. For example:
          <ul>
            <li>
              We use Google Analytics to help us understand how our customers
              use the Site. You can read more about how Google uses your
              Personal Information here: https://policies.google.com/
              privacy?hl=en.You can also opt-out of Google Analytics here:
              https://tools.google.com/dlpage/gaoptout.
            </li>
          </ul>
        </p>
        <ul>
          <li>
            We share information about your use of the Site, your purchases, and
            your interaction with our ads on other websites with our advertising
            partners. We collect and share some of this information directly
            with our advertising partners, and in some cases through the use of
            cookies or other similar technologies (which you may consent to,
            depending on your location).
          </li>
        </ul>
        <p className="paragraph-space">You can opt out of targeted advertising by:</p>
        <ul>
          <li>FACEBOOK - https://www.facebook.com/settings/?tab=ads</li>
          <li>
            GOOGLE - https://www.google.com/settings/ads/anonymous Additionally,
            you can opt out of some of these services by visiting the Digital
            Advertising Alliance’s opt-out portal at: http://
            optout.aboutads.info/. Using Personal Information We use your
            personal Information to provide our services to you, which includes:
            offering products for sale, processing payments, shipping
          </li>
        </ul>
        <p className="paragraph-space">
          and fulfilment of your order, and keeping you up to date on new
          products, services, and offers.
        </p>
        <h4 className="heading-policy">Retention</h4>
        <p className="paragraph-space">
          When you place an order through the Site, we will retain your Personal
          Information for our records unless and until you ask us to erase this
          information.
        </p>
        <h4 className="heading-policy">Do Not Track</h4>
        <p className="paragraph-space">
          Please note that because there is no consistent industry understanding
          of how to respond to “Do Not Track” signals, we do not alter our data
          collection and usage practices when we detect such a signal from your
          browser.
        </p>
        <h4 className="heading-policy">Changes</h4>
        <p className="paragraph-space">
          We may update this Privacy Policy from time to time in order to
          reflect, for example, changes to our practices or for other
          operational, legal, or regulatory reasons.
        </p>
        <h4 className="heading-policy">Contact</h4>
        <p className="paragraph-space">
          For more information about our privacy practices, if you have
          questions, or if you would like to make a complaint, please contact us
          by email at creareapptech@gmail.com or by mail using the
          https://creare.com/contact-us.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
