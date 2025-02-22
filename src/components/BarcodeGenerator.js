import JsBarcode from "jsbarcode";
import { useRef, useEffect } from "react";

const BarcodeGenerator = ({ value }) => {
    const barcodeRef = useRef(null);

    useEffect(() => {
        if (barcodeRef.current) {
            JsBarcode(barcodeRef.current, value);
        }
    }, [value]);

    return <svg ref={barcodeRef}></svg>;
};

export default BarcodeGenerator;