'use client';

import { budget_list, main_messages, networks_list, political_party, target_audiences } from "@/config";
import { useApp } from "@/context/AppContext";
import { validateProfileSetup } from "@/helpers/validators/onboarding.validator";
import { useState } from "react";
import { toast } from "sonner";

export default function ProfileSetup () {

    const { nextOnboard, formOnboard, prevOnboard, updateOnboard } = useApp();

    const [ loading, setLoading ] = useState(false);

    const isDisabled =
        loading ||
        !formOnboard.candidate_name ||
        !formOnboard.political_party ||
        formOnboard.social_media === null ||
        formOnboard.target_audience.length === 0 ||
        formOnboard.main_message.length === 0 ||
        !formOnboard.budget ||
        (
            formOnboard.social_media === true &&
            (
                formOnboard.social_networks.length === 0 ||
                formOnboard.social_networks.some(
                    item => !item.network || !item.url
                )
            )
        );

    const addSocialNetwork = () => {
        updateOnboard(
            'social_networks',
            [
                ...formOnboard.social_networks,
                {
                    network: '',
                    url: ''
                }
            ]
        );
    }

    const updateSocialNetwork = (index, field, value) => {
        const updated = [...formOnboard.social_networks];
        updated[index][field] = value;
        updateOnboard('social_networks', updated);
    }

    const removeSocialNetwork = (index) => updateOnboard('social_networks', formOnboard.social_networks.filter((_, idx) => idx !== index));

    const toggleArrayValue = (field, value) => {
        const values = formOnboard[field];
        updateOnboard(field, values.includes(value) ? values.filter(item => item !== value) : [...values, value]);
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        const validation = validateProfileSetup(formOnboard);

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
                    <label className="label">Nombre del Candidato</label>
                    <input type="text" name="candidate_name" id="candidate_name" className="input" placeholder="Nombre del candidato" value={formOnboard.candidate_name} onChange={(e) => updateOnboard('candidate_name', e.target.value)} />
                </div>
                <div className="w-full flex flex-col gap-md">
                    <label className="label">Partido Político</label>
                    <select name="political_party" id="political_party" className="input" value={formOnboard.political_party} onChange={(e) => updateOnboard('political_party', e.target.value)}>
                        <option value={''}>Partido Político</option>
                        {political_party.map((political, idx) => (
                            <option key={idx} value={political}>{political}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full flex flex-col gap-md">
                    <label className="label">¿Ya manejas redes sociales?</label>
                    <div className="w-full flex gap-md">
                        <label className={`btn btn-block btn-lg ${formOnboard.social_media === true ? 'btn-primary' : 'btn-secondary'}`}>Si<input type="radio" name="social_media" id="social_media" checked={formOnboard.social_media === true} onChange={(e) => updateOnboard('social_media', true)} hidden/></label>
                        <label className={`btn btn-block btn-lg ${formOnboard.social_media === false ? 'btn-primary' : 'btn-secondary'}`}>No<input type="radio" name="social_media" id="social_media" checked={formOnboard.social_media === false} onChange={(e) => updateOnboard('social_media', false)} hidden/></label>
                    </div>
                </div>
                {formOnboard.social_media && (
                    <div className="w-full flex flex-col gap-md">
                        <div className="w-full flex justify-between items-center">
                            <label className="label">Redes Sociales</label>
                            <button type="button" className="btn btn-secondary btn-sm" onClick={addSocialNetwork}>Añadir Red</button>
                        </div>
                        {formOnboard.social_networks.map((social, idx) => (
                            <div key={idx} className="w-full flex gap-md">
                                <select className="input" value={social.network} onChange={(e) => updateSocialNetwork(idx, 'network', e.target.value)}>
                                    <option value={''}>Redes sociales</option>
                                    {networks_list.map((ntw) => (
                                        <option key={ntw.key} value={ntw.key}>{ntw.value}</option>
                                    ))}
                                </select>
                                <input type="url" className="input" placeholder="https://..." value={social.url} onChange={(e) => updateSocialNetwork(idx, 'url', e.target.value)} />
                                <button type="button" className="btn btn-destructive px-sm rounded" onClick={() => removeSocialNetwork(idx)}>Eliminar</button>
                            </div>
                        ))}
                    </div>
                )}
                <div className="w-full flex flex-col gap-md">
                    <label className="label">¿Cuál es tu público principal?</label>
                    <div className="w-full flex flex-col gap-md">
                        {target_audiences.map((aud) => (
                            <label key={aud.key} className="label flex items-center gap-sm"><input type="checkbox" className="checkbox" checked={formOnboard.target_audience.includes(aud.key)} onChange={() => toggleArrayValue('target_audience', aud.key)}/>{aud.value}</label>
                        ))}
                    </div>
                </div>
                <div className="w-full flex flex-col gap-md">
                    <label className="label">¿Cuál es tu principal mensaje?</label>
                    <div className="w-full flex flex-col gap-md">
                        {main_messages.map((msg) => (
                            <label key={msg.key} className="label flex items-center gap-sm"><input type="checkbox" className="checkbox" checked={formOnboard.main_message.includes(msg.key)} onChange={(e) => toggleArrayValue('main_message', msg.key)} /> {msg.value}</label>
                        ))}
                    </div>      
                </div>
                <div className="w-full flex flex-col gap-md">
                    <label className="label">Presupuesto mensual estimado</label>
                    <div className="w-full flex flex-col gap-md">
                        {budget_list.map((budget) => (
                            <label key={budget.key} className="label flex items-center gap-sm"><input type="radio" className="radio" name="budget" id="budget" value={budget.key} checked={formOnboard.budget === budget.key} onChange={(e) => updateOnboard('budget', e.target.value)} /> {budget.value}</label>
                        ))}
                    </div>
                </div>
                <div className="w-full flex justify-end gap-md">
                    <button type="button" className="btn btn-lg btn-secondary" onClick={prevOnboard}>Volver</button>
                    <button className="btn btn-lg btn-primary" disabled={isDisabled}>{loading ? 'Cargando...' : 'Continuar'}</button>
                </div>
            </form>
        </div>
    )
}