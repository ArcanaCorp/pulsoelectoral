export const validateOnboarding = (form) => {

    if (!form.town) {
        return {
            success: false,
            title: 'Campo requerido',
            description: 'Selecciona el cargo al que postula.'
        }
    }

    if (form.town === 'district' && !form.district) {
        return {
            success: false,
            title: 'Campo requerido',
            description: 'Seleccione el distrito al que postula.'
        }
    }

    return {
        success: true
    }

}

export const validateProfileSetup = (form) => {

    if (!form.candidate_name.trim()) {
        return {
            success: false,
            title: 'Campo requerido',
            description: 'Ingrese el nombre del candidato.'
        };
    }

    if (!form.political_party) {
        return {
            success: false,
            title: 'Campo requerido',
            description: 'Seleccione un partido político.'
        };
    }

    if (form.social_media === null) {
        return {
            success: false,
            title: 'Campo requerido',
            description: 'Indique si maneja redes sociales.'
        };
    }

    if (form.social_media && form.social_networks.length === 0) {
        return {
            success: false,
            title: 'Campo requerido',
            description: 'Añada al menos una red social.'
        };
    }

    if (form.social_media && form.social_networks.some(item => !item.network || !item.url)) {
        return {
            success: false,
            title: 'Campo requerido',
            description: 'Complete todas las redes sociales agregadas.'
        };
    }

    if (form.target_audience.length === 0) {
        return {
            success: false,
            title: 'Campo requerido',
            description: 'Seleccione al menos un público objetivo.'
        };
    }

    if (form.main_message.length === 0) {
        return {
            success: false,
            title: 'Campo requerido',
            description: 'Seleccione al menos un mensaje principal.'
        };
    }

    if (!form.budget) {
        return {
            success: false,
            title: 'Campo requerido',
            description: 'Seleccione un presupuesto estimado.'
        };
    }

    return {
        success: true
    };

};

export const validateCampaignGoals = (form) => {

    const missing = 3 - form.goals.length;

    if (missing > 0) {
        return {
            success: false,
            title: 'Faltan objetivos',
            description: `Seleccione ${missing} objetivo${missing > 1 ? 's' : ''} adicional${missing > 1 ? 'es' : ''} para continuar.`
        };
    }

    return {
        success: true
    };

};