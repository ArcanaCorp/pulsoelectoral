'use client';

import { useEffect, useState } from "react";

const STORAGE_KEY = 'pulso-electoral-analysis';

export const useAnalyzed = () => {

    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        try {

            const stored = localStorage.getItem(STORAGE_KEY);

            if (stored) {
                setAnalysis(JSON.parse(stored));
            }

        } catch (error) {

            console.error('Error loading analysis:', error);

        } finally {

            setLoading(false);

        }

    }, []);

    const saveAnalysis = (data) => {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(data)
            );

            setAnalysis(data);

        } catch (error) {

            console.error('Error saving analysis:', error);

        }

    };

    const updateAnalysis = (field, value) => {

        const updated = {
            ...analysis,
            [field]: value
        };

        saveAnalysis(updated);

    };

    const clearAnalysis = () => {

        localStorage.removeItem(STORAGE_KEY);

        setAnalysis(null);

    };

    const hasAnalysis = !!analysis;

    return {
        analysis,
        loading,
        hasAnalysis,

        saveAnalysis,
        updateAnalysis,
        clearAnalysis
    };

};