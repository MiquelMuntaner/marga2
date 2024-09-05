// components/GoogleAnalytics.tsx
'use client';

import { useEffect, useState } from "react";


export const GoogleAnalytics = ({ GA_MEASUREMENT_ID }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Function to load Google Analytics script
        const loadScript = () => {
            const script = document.createElement('script');
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
            script.async = true;
            document.head.appendChild(script);

            script.onload = () => {
                // Initialize Google Analytics when the script is loaded
                window.dataLayer = window.dataLayer || [];
                function gtag() {
                    window.dataLayer.push(arguments);
                }
                gtag('js', new Date());

                // Consent can be configured here
                gtag('consent', 'default', {
                    'analytics_storage': 'denied', // Adjust this based on your needs
                });

                gtag('config', GA_MEASUREMENT_ID, {
                    page_path: window.location.pathname,
                });

                console.log("windowgtag32: ", window.gtag)

                setLoaded(true); // Update state when script is fully loaded
                console.warn("Google Analytics loaded");
            };
        };

        if (!window.gtag) {
            console.log("loading script")
            loadScript();
        }
    }, [GA_MEASUREMENT_ID]);

    return null; // No JSX needed to return since script is being injected directly
};

/*
export const GoogleAnalytics = ({ GA_MEASUREMENT_ID }) => {

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
        console.warn("loading analytics")
    }, [])
    return (
        <>
            {loaded && (
                <>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                        (function() {
                            var script = document.createElement('script');
                            script.src = "https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}";
                            script.async = true;
                            document.head.appendChild(script);
                        })();
                    `,
                        }}
                    />
                    <script id='google-analytics'
                        dangerouslySetInnerHTML={{
                            __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
    
                    gtag('consent', 'default', {
                        'analytics_storage': 'denied'
                    });
                    
                    gtag('config', '${GA_MEASUREMENT_ID}', {
                        page_path: window.location.pathname,
                    });
                    `,
                        }}
                    />
                </>
            )}
        </>
    )
}
    */