'use client';

import { useAnalyzed } from "@/hooks/useAnalyzed";
import { useOnboarding } from "@/hooks/useOnboarding";
import { createContext, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const onboarding = useOnboarding();
    const analyzed = useAnalyzed();

    const contextValue = {
        stepOnboard: onboarding.step,
        formOnboard: onboarding.form,
        nextOnboard: onboarding.nextStep,
        prevOnboard: onboarding.prevStep,
        updateOnboard: onboarding.updateField,
        toggleGoalOnboard: onboarding.toggleGoal,
        resetOnboard: onboarding.resetOnboarding,
        ...analyzed
    }

    return (
        <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    )

}

export const useApp = () => useContext(AppContext);