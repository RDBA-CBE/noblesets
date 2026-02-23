import React from "react";

const ContactMap = () => {
  return (
    <>
      <section className="tp-map-area ">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-map-wrapper">
                <div className="tp-map-hotspot">
                  <span className="tp-hotspot tp-pulse-border">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="6" cy="6" r="6" fill="#821F40" />
                    </svg>
                  </span>
                </div>
                <div className="tp-map-iframe">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7830.357234436347!2d77.346806!3d11.100062!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba907bc5654ace7%3A0x9ff9f001e80a60c9!2sSree%20Thangam%20Jewellery!5e0!3m2!1sen!2sin!4v1771846942774!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  {/* <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7960308.336715554!2d80.242347!3d13.04399!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267e3de37ce75%3A0xd50eb41608bccab6!2sPraDe%20Jewels!5e0!3m2!1sen!2sin!4v1715580579688!5m2!1sen!2sin"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe> */}
                  {/* <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.192013815554!2d77.34482607510482!3d11.099062689069985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba907bdadda4f7b%3A0xeb92265783ac3222!2s78%2C%20New%20Market%20Street%2C%20Kamatchi%20Amman%2C%20Tiruppur%2C%20Tamil%20Nadu%20641604!5e0!3m2!1sen!2sin!4v1771846692057!5m2!1sen!2sin"
                    width="600"
                    height="450"
                    style="border:0;"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactMap;
