'use client';

import { goals_list } from "@/config";
import { useApp } from "@/context/AppContext";
import { validateCampaignGoals } from "@/helpers/validators/onboarding.validator";
import { analyzeCampaign } from "@/services/analyzeCampaign.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CampaignObjetives () {

    const router = useRouter();
    const { formOnboard, prevOnboard, updateOnboard, saveAnalysis } = useApp();
    const [ loading, setLoading ] = useState(false);

    const toggleGoal = (goal) => {
        updateOnboard(
            'goals',
            formOnboard.goals.includes(goal)
                ? formOnboard.goals.filter(item => item !== goal)
                : [...formOnboard.goals, goal]
        );
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        const validation = validateCampaignGoals(formOnboard);
        if (!validation.success) return toast.error(validation.title, {description: validation.description});
        
        try {
            setLoading(true);

            const response = await analyzeCampaign(formOnboard);
            if (response.success) {
                saveAnalysis(response.data)
                router.push('/dashboard')
            }

        } catch (error) {
            console.error(error);
            toast.error('Error', { description: 'Hubo un error. Inténtalo más tarde.' })
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="card">
            <form className="w-full flex flex-col gap-md" onSubmit={handleSubmit}>
                <div className="w-full flex flex-col gap-md">
                    <label className="label">¿Qué deseas mejorar?</label>
                    <div className="w-full flex flex-col gap-md">
                        {goals_list.map((goals) => (
                            <label key={goals.key} className="label flex items-center gap-sm"><input type="checkbox" className="checkbox" name="goals" id="goals" checked={formOnboard.goals.includes(goals.key)} onChange={() => toggleGoal(goals.key)} /> {goals.value}</label>
                        ))}
                    </div>
                </div>
                <div className="w-full flex justify-end gap-md">
                    <button type="button" className="btn btn-lg btn-secondary" onClick={prevOnboard}>Volver</button>
                    <button className="btn btn-lg btn-primary">{loading ? 'Terminando...' : 'Finalizar'}</button>
                </div>
            </form>
        </div>
    )
}