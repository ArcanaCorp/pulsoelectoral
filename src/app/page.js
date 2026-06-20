'use client'

import CampaignObjetives from "@/components/Forms/CampaignObjetives";
import Onboarding from "@/components/Forms/Onboarding";
import ProfileSetup from "@/components/Forms/ProfileSetup";
import { TIME_YEAR } from "@/config";
import { useApp } from "@/context/AppContext";

export default function Page () {

    const { stepOnboard } = useApp();

    return (
        <div className="w-full h-screen center">
            <div className="w m-auto flex flex-col gap-md" style={{"--w": "40%"}}>
                <div className="text-center">
                    <h1>Bienvenido a <b>Pulso Electoral</b></h1>
                    <p className="text-muted">Configure su campaña en menos de 5 minutos.</p>
                </div>
                {stepOnboard === 1 && ( <Onboarding/> )}
                {stepOnboard === 2 && ( <ProfileSetup/> )}
                {stepOnboard === 3 && ( <CampaignObjetives/> )}
                <p className="text-center text-muted">© {TIME_YEAR} Pulso Electoral. Inteligencia Estratégica</p>
            </div>
        </div>
    )
}