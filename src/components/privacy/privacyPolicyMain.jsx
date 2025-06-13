import React from "react";

const PrivacyPolicyMain = () => {
  return (
    <section className="tp-about-area py-5" style={{background:"#fff9f4"}}>
      <div className="container">
        <h3 className="terms-heading" style={{ fontWeight: "500" }}>
          Privacy Policy
        </h3>

        <div>
          <p className="terms-para">
            We understand that your privacy is of paramount importance to you, so your privacy is very important to us and Sree Thangam Jewellery works to ensure that the users privacy is protected when using our service. SreeThangamJewellery.com has a policy setting out how the personal information of user is processed and protected. Users can visit our website to find the revisions (if any) made to the user policy. Sree Thangam Jewellery will not make any financial benefits by selling or leasing the user information to any third party.
          </p>

          {/* <p className="terms-para">
            Noblesets Jewels (“Noblesets”, “We”, “Us”, “Our”) is committed to the
            compliance of applicable Privacy Laws in the country where Noblesets’s
            product is distributed. Protecting the privacy and security of your
            personal data is of prime importance to Noblesets, therefore, we conduct
            our business by abiding by the laws applicable on data privacy and
            data security in the country where Noblesets product is distributed to
            you.
          </p> */}

          <p className="terms-heading">Information from User</p>

          <p className="terms-para">
            Sree Thangam Jewellery follows the standard industry practices to maintain your personal information. We take responsibility in storing the personal data viz, Name, address, email address and phone number that you have willingly provided while registering the account with us or while placing order or during transaction or while subscribing newsletter or participating in any events or other promotions or while providing feedback. Sree Thangam Jewellery.com will not be getting any information regarding the financial transactions. Credit/debit card or banking details will be provided by the user only while using the Payment gateway.
          </p>

       <p className="terms-heading">Information from User</p>

          <p className="terms-para">
           The information provided by the user will be used to fulfill our commitment to the user and to provide sufficient information from our side benefiting them and for verifying their order and to communicate with them for getting information. This also includes letting the user know the latest offers that we think may interest you (by analyzing your personal information). If the user at any point of time wishes not to receive any such messages they may contact the support team by email and let them know their interest and decision. We keep and use their personal information as long as the user is interested in letting us use it or for as long as required by the law.
          </p>

          <p className="terms-heading">Information Sharing</p>

          <p className="terms-para">
            Sree Thangam Jewellery will never share any of its website users personal information to any other company for spam or mass mailing or for marketing purposes. Payments and other financial transactions on the website are processed by a third party, which normally adheres to a strict policy regarding confidentiality agreement which limit their use of such information and are bound to the terms and conditions of the third party’s payment gateway process. However, details about financial transaction will never be stored or tracked by any of the system or software of Sree Thangam Jewellery.com. We have a non-disclosure agreement with this third party, and they are certified by all major card issuers to hold details securely.
          </p>

          <p className="terms-heading">
           Duration of Information Stored
          </p>
          <p className="terms-para">
           The personal details of the user shall remain with us as long as the user requires it to serve the purpose of the data to exist with us or as long as required under law. Users may officially inform the support team that their data shall not be used by the STJ to communicate with them. We shall remove their personal data from the list for communication; however, it shall remain with us for any kind of legal verification as required by the Government of India.
          </p>

          <ul className="terms-lists">
            <li>
              to further manage the purchases, orders, payments, and
              returns/exchanges in connection with the services offered on our
              Website;
            </li>
            <li>
              to connect with you regarding customer service activities and
              design, improve and enhance your customer experience;
            </li>

            <li>to administer our customer loyalty programs, newsletters;</li>
            <li>
              to deliver personalized coupons, newsletters, emails, text
              messages, social media notifications, surveys and other marketing
              related materials;
            </li>

            <li>
              to respond to requests from yourself regarding information about
              our products and services on our Website;
            </li>
            <li>to administer contests or promotional activities;</li>
            <li>
              to publish your reviews, comments and content to our websites and
              make them publicly visible;
            </li>
            <li>
              to assist law enforcement and respond to regulatory, investigate
              security breaches, or other legal inquiries.
            </li>
          </ul>

          <p className="terms-para">
            In any and all circumstances, we will always ask for your consent
            before we share your personal information outside of our corporate
            family of companies.
          </p>

          <p className="terms-heading">
            Disclosure Of Your Personal Information
          </p>

          <ul className="terms-lists">
            <li>
              We do not knowingly collect/sell/trade your personally
              identifiable information; however, we may share the same with
              third parties who assist us in conducting our business, operating
              our website, or servicing you, so long as these third parties
              agree to keep this information confidential.
            </li>
            <li>
              These third parties shall strictly have limited access to your
              information and shall be only with the purpose of performing the
              tasks assigned by Us.
            </li>
            <li>
              We may also share your Information to comply with applicable laws
              and regulations, to respond to a subpoena, search warrant or other
              lawful request for information we receive, or to otherwise protect
              our rights.
            </li>
          </ul>
          <p className="terms-heading">Your Choices</p>

          <p className="terms-para">
            We at all times shall offer a variety of choices about how we use
            your information. You can always choose about whether to not
            disclose information to us and/or update and/or edit/change/modify
            or delete your information from us by following the unsubscribe
            instructions included in the communication. In addition, you can
            also generally make choices in your settings, or by visiting
            relevant links.
          </p>

          <p className="terms-heading">Security</p>

          <p className="terms-para">
            We take reasonable technical as well as physical measures/ efforts
            to protect your personal information from loss, theft, misuse, and
            unauthorized access, disclosure and destruction.
          </p>

          <p className="terms-heading">Newsletter</p>

          <p className="terms-para">
            You can conveniently manage your registration for the Noblesets
            Newsletter in the “My Account” area of the Website. Simply enter
            your e-mail address in the field provided and then click “send”. We
            will send a confirmation e-mail to the e-mail address you give us.
            Please click on the confirmation link contained in the e-mail and
            you will receive regular information about new arrivals and/or
            discounts from Noblesets.
          </p>
          <p className="terms-para">
            For more information about our privacy practices, if you have
            questions, or if you would like to make a complaint, please contact
            us by e‑mail at{" "}
            <a
              href="mailto:support@noblesets.in"
              style={{
                textDecoration: "underline",
                color: "#c28430",
                cursor: "pointer",
              }}
            >
              support@noblesets.in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyMain;
