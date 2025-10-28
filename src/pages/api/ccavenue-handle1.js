// pages/ccavenue-handle1.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function CCAvenueHandle1() {
  const router = useRouter();
  const [status, setStatus] = useState('Processing your payment...');
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handlePaymentResponse = async () => {
      try {
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

        // If no encrypted response, check for direct parameters
        if (!encResp) {
          if (orderNo && referenceNo) {
            // Direct success case
            const successData = {
              order_status: 'Success',
              order_id: orderNo,
              tracking_id: referenceNo,
              payment_mode: 'Direct',
              failure_message: null
            };
            
            setPaymentData(successData);
            setStatus('Payment Successful! Redirecting...');
            
            localStorage.setItem('payduePaymentData', JSON.stringify(successData));
            
            setTimeout(() => {
              router.push(`/chit/paydue1?data=${encodeURIComponent(JSON.stringify(successData))}`);
            }, 2000);
            return;
          } else {
            setStatus('No payment response received');
            setError('No encResp parameter found in URL');
            return;
          }
        }

        // Dynamic import with better error handling
        let CCAvenue;
        try {
          CCAvenue = (await import('@/utils/CCAvenue')).default;
        } catch (importError) {
          console.error('Failed to import CCAvenue:', importError);
          throw new Error('Payment processing library not available');
        }

        if (!CCAvenue.redirectResponseToJson) {
          throw new Error('CCAvenue decryption method not available');
        }

        const decryptedData = await CCAvenue.redirectResponseToJson(encResp);
        console.log("✌️Decrypted payment data:", decryptedData);

        setPaymentData(decryptedData);
        
        if (decryptedData.order_status === 'Success') {
          setStatus('Payment Successful! Redirecting...');
          localStorage.setItem('payduePaymentData', JSON.stringify(decryptedData));
          
          setTimeout(() => {
            router.push(`/chit/paydue1?data=${encodeURIComponent(JSON.stringify(decryptedData))}`);
          }, 2000);
          
        } else {
          const failureMessage = decryptedData.failure_message || 'Unknown error';
          setStatus(`Payment Failed: ${failureMessage}`);
          setError(failureMessage);
          
          setTimeout(() => {
            router.push(`/payment-failed?error=${encodeURIComponent(failureMessage)}`);
          }, 2000);
        }

      } catch (error) {
        console.error("Error processing payment:", error);
        setStatus('Payment Processing Error');
        setError(error.message);
        
        // Final fallback - check URL for success indicators
        const urlParams = new URLSearchParams(window.location.search);
        const orderNo = urlParams.get('orderNo');
        const referenceNo = urlParams.get('reference_no');
        
        if (orderNo && referenceNo) {
          setStatus('Payment appears successful but verification failed. Please contact support.');
        }
      }
    };

    handlePaymentResponse();
  }, [router]);

  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h1>Payment Status</h1>
      
      <div style={{
        padding: '1.5rem',
        margin: '1rem 0',
        backgroundColor: error ? '#ffe6e6' : '#f0f8ff',
        border: `1px solid ${error ? '#ffcccc' : '#cce5ff'}`,
        borderRadius: '8px'
      }}>
        <p style={{ 
          fontSize: '16px', 
          fontWeight: 'bold',
          color: error ? '#d63031' : '#2d3436'
        }}>
          {status}
        </p>
        
        {error && (
          <div style={{ 
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: '#fff',
            border: '1px solid #ffcccc',
            borderRadius: '4px'
          }}>
            <p style={{ color: '#d63031', margin: 0 }}>Error: {error}</p>
          </div>
        )}
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
          <pre style={{ 
            fontSize: '12px', 
            overflow: 'auto',
            backgroundColor: '#f8f9fa',
            padding: '1rem',
            borderRadius: '4px'
          }}>
            {JSON.stringify(paymentData, null, 2)}
          </pre>
        </div>
      )}
      
      <div style={{ marginTop: '2rem' }}>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Please wait while we process your payment...
        </p>
      </div>
    </div>
  );
}