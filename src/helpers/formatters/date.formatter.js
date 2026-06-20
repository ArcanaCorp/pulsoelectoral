// date.formatter.js

import moment from 'moment';
import 'moment/locale/es';

// Configurar idioma global
moment.locale('es');

const DateFormatter = {
    /**
     * Retorna "hace 5 minutos", "hace 2 días", etc.
     */
    fromNow(date) {
        return moment(date).fromNow();
    },

    /**
     * Formato largo:
     * 19 de junio de 2026
     */
    LL(date) {
        return moment(date).format('LL');
    },

    /**
     * Formato largo con hora:
     * 19 de junio de 2026 14:30
     */
    LLL(date) {
        return moment(date).format('LLL');
    },

    /**
     * Viernes, 19 de junio de 2026 14:30
     */
    LLLL(date) {
        return moment(date).format('LLLL');
    },

    /**
     * 19/06/2026
     */
    short(date) {
        return moment(date).format('L');
    },

    /**
     * 19/06/2026 14:30
     */
    shortDateTime(date) {
        return moment(date).format('L LT');
    },

    /**
     * 14:30
     */
    time(date) {
        return moment(date).format('LT');
    },

    /**
     * YYYY-MM-DD
     * Útil para APIs
     */
    api(date) {
        return moment(date).format('YYYY-MM-DD');
    },

    /**
     * YYYY-MM-DD HH:mm:ss
     */
    apiDateTime(date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    },

    /**
     * Retorna true si la fecha es hoy
     */
    isToday(date) {
        return moment(date).isSame(moment(), 'day');
    },

    /**
     * Retorna true si la fecha es ayer
     */
    isYesterday(date) {
        return moment(date).isSame(moment().subtract(1, 'day'), 'day');
    },

    /**
     * Ejemplo:
     * Hoy, Ayer o fecha formateada
     */
    smart(date) {
        const m = moment(date);

        if (m.isSame(moment(), 'day')) {
            return `Hoy ${m.format('LT')}`;
        }

        if (m.isSame(moment().subtract(1, 'day'), 'day')) {
            return `Ayer ${m.format('LT')}`;
        }

        return m.format('LL');
    },

    /**
     * Diferencia en días
     */
    diffInDays(startDate, endDate = new Date()) {
        return moment(endDate).diff(moment(startDate), 'days');
    }
};

export default DateFormatter;