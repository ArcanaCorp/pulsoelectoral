import { useState } from "react";

const INITIAL_STATE = {
    town: "",
    district: "",
    candidate_name: "",
    political_party: "",
    social_media: null,
    social_networks: [],
    target_audience: [],
    main_message: [],
    budget: "",
    goals: []
};

export const useOnboarding = () => {

    const [step, setStep] = useState(1);

    const [form, setForm] = useState(INITIAL_STATE);

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const updateField = (field, value) => {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const toggleGoal = (goal) => {
        setForm(prev => ({
            ...prev,
            goals: prev.goals.includes(goal)
                ? prev.goals.filter(item => item !== goal)
                : [...prev.goals, goal]
        }));
    };

    const resetOnboarding = () => {
        setStep(1);
        setForm(INITIAL_STATE);
    };

    return {
        step,
        form,
        nextStep,
        prevStep,
        updateField,
        toggleGoal,
        resetOnboarding
    };
};