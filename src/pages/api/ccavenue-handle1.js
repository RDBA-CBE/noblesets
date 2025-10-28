// pages/ccavenue-handle1.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function CCAvenueHandle1() {
  const router = useRouter();
  const [status, setStatus] = useState('Processing your payment...');
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const handlePaymentResponse = async () => {
      try {
        // Get all URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const encResp = urlParams.get('encResp');
        const orderNo = urlParams.get('orderNo');
        const referenceNo = urlParams.get('reference_no');

        console.log("✌️URL Parameters:", {
          encResp,
          orderNo,
          referenceNo,
          allParams: Object.fromEntries(urlParams.entries())
        });

        if (!encResp) {
          setStatus('No payment response received');
          console.error('No encResp parameter found in URL');
          return;
        }

        // Import CCAvenue dynamically to ensure it's available
        const CCAvenue = (await import('@/utils/CCAvenue')).default;
        
        if (!CCAvenue.redirectResponseToJson) {
          throw new Error('CCAvenue decryption method not available');
        }

        // Decrypt the response
        const decryptedData = CCAvenue.redirectResponseToJson(encResp);
        console.log("✌️Decrypted payment data:", decryptedData);

        setPaymentData(decryptedData);
        
        // Check payment status
        if (decryptedData.order_status === 'Success') {
          setStatus('Payment Successful! Redirecting...');
          
          // Store in localStorage
          localStorage.setItem('payduePaymentData', JSON.stringify(decryptedData));
          
          // Redirect to success page
          setTimeout(() => {
            router.push(`/chit/paydue1?data=${encodeURIComponent(JSON.stringify(decryptedData))}`);
          }, 2000);
          
        } else {
          setStatus(`Payment Failed: ${decryptedData.failure_message || 'Unknown error'}`);
          
          // Redirect to failure page
          setTimeout(() => {
            router.push('/payment-failed');
          }, 2000);
        }

      } catch (error) {
        console.error("Error processing payment:", error);
        setStatus(`Error: ${error.message}`);
        
        // Fallback: Check for basic success parameters
        const urlParams = new URLSearchParams(window.location.search);
        const orderNo = urlParams.get('orderNo');
        const referenceNo = urlParams.get('reference_no');
        
        if (orderNo && referenceNo) {
          setStatus('Payment appears successful but decryption failed');
          // You might want to verify payment status via CCAvenue API
        }
      }
    };

    handlePaymentResponse();
  }, [router]);

  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Payment Status</h1>
      <div style={{
        padding: '1rem',
        margin: '1rem 0',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px'
      }}>
        <p>{status}</p>
      </div>
      
      {paymentData && (
        <div style={{ 
          marginTop: '1rem', 
          textAlign: 'left',
          backgroundColor: '#fff',
          padding: '1rem',
          border: '1px solid #ddd',
          borderRadius: '4px'
        }}>
          <h3>Payment Details:</h3>
          <pre style={{ fontSize: '12px', overflow: 'auto' }}>
            {JSON.stringify(paymentData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}