// pages/ccavenue-handle1.js
import { useEffect, useState } from 'react';
import CCAvenue from '@/utils/CCAvenue';
import { useRouter } from 'next/router';

export default function CCAvenueHandle1() {
  const router = useRouter(); // ✅ Uncommented this line
  const [status, setStatus] = useState('Processing your payment...');
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const handlePaymentResponse = async () => {
      try {
        // Get the encResp from URL query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const encResp = urlParams.get('encResp');

        if (!encResp) {
          setStatus('No payment response received');
          return;
        }

        console.log("✌️encResp --->", encResp);

        // Decrypt the response
        const decryptedData = CCAvenue.redirectResponseToJson(encResp);
        console.log("✌️decryptedData --->", decryptedData);

        setPaymentData(decryptedData);
        
        // Check payment status
        if (decryptedData.order_status === 'Success') {
          setStatus('Payment Successful!');
          
          // Store in localStorage
          localStorage.setItem('payduePaymentData', JSON.stringify(decryptedData));
          
          // Redirect to success page after 2 seconds
        //   setTimeout(() => {
        //     router.push(`/chit/paydue1?data=${encodeURIComponent(JSON.stringify(decryptedData))}`);
        //   }, 2000);
          
        } else {
          setStatus(`Payment Failed: ${decryptedData.failure_message || 'Unknown error'}`);
          
          // Redirect to failure page
        //   setTimeout(() => {
        //     router.push('/order-failed');
        //   }, 2000);
        }

      } catch (error) {
        console.error("Error processing payment:", error);
        setStatus('Error processing payment response');
      }
    };

    handlePaymentResponse();
  }, [router]); // ✅ Now router is defined

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Payment Status</h1>
      <p>{status}</p>
      {paymentData && (
        <div style={{ marginTop: '1rem', textAlign: 'left' }}>
          <pre>{JSON.stringify(paymentData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}