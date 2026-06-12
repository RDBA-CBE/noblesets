import { getTrackBackground, Range } from "react-range";

const InputRange = ({ STEP, MIN, MAX, values, handleChanges }) => {
  const safeMax = MAX > 0 ? MAX : 1;
  const safeValues = values.map((v) => Math.min(Math.max(v, MIN), safeMax));

  return (
    <>
      <Range
        step={STEP}
        min={MIN}
        max={safeMax}
        values={safeValues}
        onChange={(vals) => handleChanges(vals)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '3px',
              width: '100%',
              background: getTrackBackground({
                values: safeValues,
                colors: ["#EDEDED", "#7d4432", "#EDEDED"],
                min: MIN,
                max: safeMax
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '17px',
              width: '5px',
              backgroundColor: '#7d4432',
              backgroundColor: isDragged ? "#7d4432" : "#7d4432"
            }}
          />
        )}
      />
    </>
  );
};


export default InputRange;
