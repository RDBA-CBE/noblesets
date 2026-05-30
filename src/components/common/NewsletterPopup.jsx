import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSetState } from "@/utils/functions";

const NewsletterPopup = () => {
  const [show, setShow] = useState(false);

  const [state, setState] = useSetState({
    email: "",
    loading: false,
    error: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!state.email.trim()) {
      setState({
        error: "Please enter your email address",
      });
      return;
    }

    if (!emailRegex.test(state.email)) {
      setState({
        error: "Please enter a valid email address",
      });
      return;
    }

    try {
      setState({
        loading: true,
        error: "",
      });

      // Replace with your actual API
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: state.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Subscription failed");
      }

      setState({
        email: "",
        loading: false,
        error: "",
      });

      handleClose();
    } catch (err) {
      setState({
        loading: false,
        error: err?.message || "Something went wrong",
      });
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="newsletter-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(4px)",
          }}
        >
          <motion.div
            className="newsletter-content"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fffaf0",
              maxWidth: "850px",
              width: "100%",
              borderRadius: "15px",
              overflow: "hidden",
              display: "flex",
              position: "relative",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "15px",
                right: "20px",
                border: "none",
                background: "none",
                fontSize: "28px",
                cursor: "pointer",
                color: "#7d4432",
                zIndex: 10,
              }}
            >
              &times;
            </button>

            {/* Left Image */}
            <div
              className="newsletter-img d-none d-md-block"
              style={{
                width: "45%",
                position: "relative",
              }}
            >
              <img
                src="/assets/img/home/collection/3.png"
                alt="Exquisite Jewelry"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Right Content */}
            <div
              className="newsletter-form-wrapper"
              style={{
                flex: 1,
                padding: "50px 40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div className="text-center sub-ti">
                <h5
                  style={{
                    fontWeight: "500",
                    marginBottom: "15px",
                  }}
                >
                  ✦ Royal Privilege ✦
                </h5>

                <h2
                  className="main-ti"
                  style={{
                    fontSize: "32px",
                    marginBottom: "15px",
                    lineHeight: "1.2",
                  }}
                >
                  Receive 10% Off Your First Order
                </h2>

                <p
                  style={{
                    color: "#555",
                    fontSize: "15px",
                    marginBottom: "30px",
                    lineHeight: "1.6",
                  }}
                >
                  Join the Noblesets inner circle for exclusive early access to
                  new collections and bespoke styling tips.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={state.email}
                  onChange={(e) =>
                    setState({
                      email: e.target.value,
                      error: "",
                    })
                  }
                  placeholder="Your royal email address"
                  required
                  style={{
                    width: "100%",
                    padding: "14px 18px",
                    borderRadius: "8px",
                    border: "1px solid #e2d1b9",
                    marginBottom: "15px",
                    outline: "none",
                    backgroundColor: "white",
                  }}
                />

                {state.error && (
                  <p
                    style={{
                      color: "#dc2626",
                      fontSize: "14px",
                      marginBottom: "12px",
                    }}
                  >
                    {state.error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={state.loading}
                  className="gradient-btn w-100"
                  style={{
                    fontSize: "16px",
                    letterSpacing: "1px",
                    opacity: state.loading ? 0.7 : 1,
                  }}
                >
                  {state.loading
                    ? "Submitting..."
                    : "Claim Your Offer"}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;