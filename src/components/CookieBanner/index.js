import React, { useEffect, useState } from "react";
import { BannerContainer } from "./styles";
import { getLocalStorage, setLocalStorage } from "../../tools/storageHelper";

export const CookieBanner = () => {
    const [cookieConsent, setCookieConsent] = useState(false)

    useEffect(() => {
        const storedCookieConsent = getLocalStorage("cookie_consent_29321", null)

        setCookieConsent(storedCookieConsent)
    }, [setCookieConsent])

    useEffect(() => {
        const newValue = cookieConsent ? 'granted' : 'denied'

        console.log("windowgtag: ", window.gtag)
        if (typeof window.gtag !== 'undefined') {
            console.log("COOQUIE DCONSENT CHANGEDD")
            window.gtag("consent", 'update', {
                'analytics_storage': newValue
            });
        }

        if (typeof window.dataLayer !== 'undefined') {
            function gtag() {
                window.dataLayer.push(arguments);
            }

            gtag("consent", 'update', {
                'analytics_storage': newValue
            });
        }

        setLocalStorage("cookie_consent_29321", cookieConsent)

        console.log("Cookie Consent: ", cookieConsent)
    }, [cookieConsent])

    return <>{cookieConsent == null ? <BannerContainer>
        <p>Utilitzem cookies per optimitzar la teva experiència en aquest lloc web. Per això, et demanem que acceptis la nostra <a target="_blank" href="/informacio#privacitat">Política de Privacitat</a> i la nostra <a target="_blank" href="/informacio#cookies">Política de Cookies</a>.</p>
        <div>
            <button onClick={() => setCookieConsent(false)}>Denega</button>
            <button onClick={() => setCookieConsent(true)}>Accepta tot</button>
        </div>
    </BannerContainer> : <></>}</>
}