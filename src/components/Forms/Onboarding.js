'use client';

import { district_name } from "@/config";
import { useApp } from "@/context/AppContext";
import { validateOnboarding } from "@/helpers/validators/onboarding.validator";
import { useState } from "react";
import { toast } from "sonner";

export default function Onboarding () {

    const { nextOnboard, formOnboard, updateOnboard } = useApp();

    const [ loading, setLoading ] = useState(false);

    const isDisabled = loading || (formOnboard.town === '') || (formOnboard.town === 'district' && formOnboard.district === '');

    const handleSubmit = (e) => {
    
        e.preventDefault();

        const validation = validateOnboarding(formOnboard);

        if (!validation.success) return toast.error(validation.title, {description: validation.description});
        
        try {
            setLoading(true);
            nextOnboard();
        } catch (error) {
            console.error(error);
            toast.error('Error', {description: 'Hubo un error. Inténtelo nuevamente.'});
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <form className="w-full flex flex-col gap-md" onSubmit={handleSubmit}>
                <div className="w-full flex flex-col gap-md">
                    <label className="label font-semibold">¿A qué cargo postula?</label>
                    <div className="w-full flex gap-md">
                        <label className={`btn btn-block btn-lg ${formOnboard.town === 'province' ? 'btn-primary' : 'btn-secondary'}`}>Alcaldía Provincial <input type="radio" name="town" id="town" value={'province'} hidden onChange={(e) => updateOnboard('town', e.target.value)} disabled={loading}/> </label>
                        <label className={`btn btn-block btn-lg ${formOnboard.town === 'district' ? 'btn-primary' : 'btn-secondary'}`}>Alcaldía Distrital <input type="radio" name="town" id="town" value={'district'} hidden onChange={(e) => updateOnboard('town', e.target.value)} disabled={loading}/> </label>
                    </div>
                </div>
                {formOnboard.town === 'district' && (
                    <div className="w-full flex flex-col gap-md">
                        <label className="label font-semibold" htmlFor="district">Seleccione el distrito de tu preferencia</label>
                        <select className="input" name="district" id="district" value={formOnboard.district} aria-label="Seleccione el distrito de tu preferencia" onChange={(e) => updateOnboard('district', e.target.value)} disabled={loading}>
                            <option value={''}>Seleccione el distrito de tu preferencia</option>
                            {district_name.map((district, idx) => (
                                <option key={idx} value={district}>{district}</option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="w-full flex justify-end">
                    <button className={`btn btn-lg btn-primary`} disabled={isDisabled}>{loading ? 'Cargando...' : 'Continuar'}</button>
                </div>
            </form>
        </div>
    )
}