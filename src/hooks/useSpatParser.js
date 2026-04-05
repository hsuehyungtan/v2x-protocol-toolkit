import { useState } from "react";

export function useSpatParser() {
    const [jsonInput, setJsonInput] = useState("");
    const [parsedData, setParsedData] = useState(null);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const input = e.target.value;
        setJsonInput(input);

        if (!input.trim()) {
            setParsedData(null);
            setError("");
            return;
        }

        try {
            const parsed = JSON.parse(input);
            setParsedData(parsed);
            setError("");
        } catch (err) {
            setParsedData(null);
            setError("Invalid JSON format");
        }
    };

    // Helper to extract intersections
    const extractIntersections = (data) => {
        if (!data) return [];
        let root = data;

        // Handle common J2735 JSON wrappers
        if (root.MessageFrame && root.MessageFrame.value) root = root.MessageFrame.value;
        if (root.SPAT) root = root.SPAT;
        if (root.value && root.value.SPaTData) root = root.value.SPaTData;
        if (root.value && root.value.intersections) root = root.value;
        if (root.spat && root.spat.intersections) root = root.spat;

        if (root.intersections && Array.isArray(root.intersections)) {
            return root.intersections;
        }
        return [];
    };

    const intersections = extractIntersections(parsedData);

    return {
        jsonInput,
        parsedData,
        error,
        intersections,
        handleInputChange
    };
}
