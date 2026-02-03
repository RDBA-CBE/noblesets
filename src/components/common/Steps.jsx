import React from 'react';

const Steps = ({ current, items }) => {
  return (
    <div className="steps-container" style={{ margin: '30px 0' }}>
      <div className="steps-wrapper">
        {items?.map((item, index) => (
          <div key={index} className="step-item">
            <div className="step-content">
              <div 
                className={`step-circle ${index <= current ? 'active' : ''}`}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: index <= current ? '#7d4432' : '#e0e0e0',
                  color: index <= current ? 'white' : '#999',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {index + 1}
              </div>
              <div 
                className="step-title"
                style={{
                  marginTop: '8px',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: index <= current ? '#7d4432' : '#999',
                  textAlign: 'center',
                  textTransform: 'capitalize'
                }}
              >
                {item.title}
              </div>
            </div>
            {index < items.length - 1 && (
              <div 
                className="step-line"
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '50%',
                  width: 'calc(100% - 40px)',
                  height: '2px',
                  backgroundColor: index < current ? '#7d4432' : '#e0e0e0',
                  zIndex: 1,
                  transform: 'translateY(-50%)'
                }}
              />
            )}
          </div>
        ))}
      </div>
      
    
    </div>
  );
};

export default Steps;