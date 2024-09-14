import React, { useEffect, useState } from 'react'
import { PageLayout } from '../../components/PageLayout'
import { InfoContainer } from './styles'
import { getLocalStorage, setLocalStorage } from '../../tools/storageHelper'

const VERSIONS = [
    {
        "version": "0.0.3",
        "date": "14/09/2024",
        "info": ["Correccions d'errors menors.", "Millores de SEO.", "Noves funcionalitats afegides a la formulació orgànica (ara es pot canviar la grossor de la línia i la separació dels dobles enllaços)."]
    },
    {
        "version": "0.0.2",
        "date": "06/09/2024",
        "info": ["Hem implementat un sistema de recopilació d'analítiques i amb ell tot el necessari per a assegurar la privacitat de l'usuari final."]
    },
    {
        "version": "0.0.1",
        "date": "04/09/2024",
        "info": ["Després de quasi un any de desenvolupament primera beta pública de Nocions. El fet de no ser una versió estable implica que pot tenir una gran varietat d'errors que corregirem amb la màxima brevetat possible."]
    }
]

export const InformacioPage = ({ setDarkMode }) => {

    /*
    const [cookieConsentChecked, setCookieConsentChecked] = useState(false)

    useEffect(() => {
        const storedCookieConsent = getLocalStorage("cookie_consent_29321")

        console.log("stored", storedCookieConsent)
        setCookieConsentChecked(storedCookieConsent)
    }, [])


    const onCheckboxClicked = (e) => {
        setLocalStorage("cookie_consent_29321", e.target.value == "on" ? true : false)
        setCookieConsentChecked(e.target.value == "on" ? true : false)

    }
    */

    return (
        <PageLayout setDarkMode={setDarkMode}>
            <InfoContainer>
                <h2>Sobre el projecte</h2>
                <p>Nocions és una plataforma que neix amb l'objectiu d'agilitzar el procés d'aprenentatge de la formulació química dins el batxillerat. No es garanteix la precisió del resultat ni es recomana l'ús d'aquest programa dins un ambient universitari o professional. No conté intel·ligència artificial ni està proveït de cap base de dades que contingui tots els composts, sinó que dur a terme la formulació de forma algorítmica.</p>
                <p>Aquest projecte és un treball tècnic desenvolupat a l'IES Felanitx entre els cursos 23-24 i 24-25.</p>
                <p><b>Tutor del treball de recerca:</b> Toni Salvà Tomàs</p>
                <p><b>Autor:</b> Miquel Muntaner Barceló</p>
                <p><b>Correu electrònic de contacte:</b> 2mmuntanerb@iesfelanitx.cat</p>
                <br />
                <h2>Registre de versions</h2>
                {VERSIONS.map(function (content, i) {
                    return (
                        <>
                            <h3>{content.version} - {content.date}</h3>
                            <ul>{content.info.map(function (contentInfo, i) {
                                return <li>{contentInfo}</li>
                            })}</ul>
                            <hr />
                        </>
                    )
                })}
                <br />
                <h2 id='privacitat'>Política de privacitat i cookies</h2>
                <p>Nosaltres no recopilem cap tipus d'informació directament de l'usuari. No obstant això, utilitzem l'eina Google Analytics, que, sempre que sigui acceptada, fa ús de cookies per a la recollida de certa informació anònima sobre l'usuari. Aquesta informació es recopila exclusivament amb l'objectiu de comprendre l'impacte d'aquest projecte. A continuació es troba una política de privacitat detallada sobre Google Analytics per a complir amb la normativa RGPD de la Unió Europea.</p>

                {/*Politica de privacitat*/}
                <h3>Classes de Dades recollides</h3>
                <p>Entre les classes de Dades Personals que recull aquesta Aplicació, ja sigui directament o a través de tercers, es troben: Rastrejadors; Dades d'ús; quantitat d'Usuaris; estadístiques de sessió.</p>
                <p>La informació completa referent a cada categoria de Dades Personals que es recullen es proporciona a les seccions de la present política de privadesa dedicades amb aquesta finalitat o mitjançant textos explicatius específics que es mostren abans de la recollida d'aquestes Dades. Les Dades Personals podran ser proporcionades lliurement per l'Usuari o, en cas de les Dades d'Ús, seran recollides automàticament quan s'utilitzi aquesta Aplicació. Llevat que s'indiqui el contrari, totes les dades sol·licitades per aquesta Aplicació són obligatòries i la negativa a proporcionar-les podrà impossibilitar que aquesta Aplicació pugui procedir a la prestació dels seus serveis. En els casos en què aquesta Aplicació indiqui específicament que certes Dades no són obligatòries, els Usuaris seran lliures de no comunicar aquestes Dades sense que això tingui cap conseqüència sobre la disponibilitat o el funcionament del Servei.</p>
                <p>Els usuaris que tinguin dubtes sobre quines dades són obligatòries poden contactar amb el titular.</p>
                <p>L'ús de Cookies - o d'altres eines de seguiment - per part d'aquesta Aplicació o pels titulars de serveis de tercers utilitzats per aquesta Aplicació té com a finalitat la prestació del Servei sol·licitat per l'Usuari, a més de qualssevol altres finalitats que es descriguin a aquest document i a la Política de Cookies. L'Usuari assumeix la responsabilitat respecte de les dades personals de tercers que s'obtinguin, publiquin o comparteixin a través d'aquesta Aplicació.</p>
                <h3>Modalitat i lloc del tractament de les dades recollides</h3>
                <p><b>Modalitats de Tractament</b></p>
                <p>El Titular tractarà les Dades dels Usuaris de manera adequada i adoptarà les mesures de seguretat apropiades per impedir l'accés, la revelació, l'alteració o la destrucció no autoritzades de les Dades.</p>
                <p>El tractament de dades es realitzarà mitjançant ordinadors i/o eines informàtiques, seguint procediments i modalitats organitzatives estrictament relacionades amb les finalitats assenyalades. A més a més del Titular, en alguns casos podran accedir a les Dades certes categories de persones autoritzades, relacionades amb el funcionament d'aquesta Aplicació (administració, vendes, màrqueting, departament jurídic i d'administració de sistemes) o contractistes externs que prestin serveis al Titular (tals com a proveïdors externs de serveis tècnics, empreses de missatgeria, empreses de hosting, empreses d'informàtica, agències de comunicació) que seran nomenats pel Titular com a Encarregats del Tractament, si fos necessari. Es podrà sol·licitar al Titular en qualsevol moment una llista actualitzada de les persones esmentades.</p>
                <p><b>Lloc</b></p>
                <p>Les Dades es tracten a la oficina del Titular, així com en qualsevol altre lloc on estiguin situades les parts implicades en aquest procés de tractament. Depenent de la localització dels usuaris, les transferències de dades poden implicar la transferència de les dades dels usuaris a un altre país diferent del seu propi. Per a més informació sobre el lloc de tractament d'aquestes dades transferides, els usuaris podran consultar la secció que conté els detalls sobre el tractament de les dades personals.</p>
                <p><b>Període de conservació</b></p>
                <p>Llevat que s'indiqui el contrari al present document, les Dades Personals seran tractades i conservades durant el temps necessari i per a la finalitat per la qual han estat recollides i podran conservar-se durant més temps a causa d'una obligació legal pertinent o sobre la base del consentiment dels Usuaris.</p>
                <h3>Finalitat del Tractament de les Dades recollides</h3>
                <p>Les Dades relatives a l'Usuari són recollides per permetre al Titular prestar el Servei, complir les seves obligacions legals, respondre a sol·licituds d'execució, protegir els seus drets i interessos (o els dels Usuaris o tercers), detectar qualsevol activitat maliciosa o fraudulenta, així com per a estadístiques.</p>
                <p>Els Usuaris poden trobar informació específica les Dades personals utilitzades per a cada finalitat a la secció “Informació detallada del Tractament de les Dades Personals”.</p>
                <h3>Informació detallada del Tractament de les Dades Personals</h3>
                <p>Les Dades Personals es recullen per a les següents finalitats i utilitzant els serveis següents:</p>
                <p><b>Estadístiques de Google (Google Analytics):</b>Aquesta Aplicació utilitza Rastrejadors. Per obtenir més informació, els Usuaris poden consultar la <a href="/informacio#cookies">Política de Cookies</a>.</p>
                <h3>Més informació per als usuaris</h3>
                <p><b>Base jurídica del Tractament</b></p>
                <p>El Titular podrà tractar les Dades Personals de l'Usuari, si es compleix una de les condicions següents:</p>
                <ul>
                    <li>Quan els usuaris hagin donat el seu consentiment per a una o més finalitats específiques.</li>
                    <li>Quan l'obtenció de dades sigui necessària per al compliment d'un contracte amb l'usuari i/o qualsevol altra obligació precontractual d'aquest;</li>
                    <li>Quan el tractament sigui necessari per complir una obligació legal de compliment obligat per part de l'Usuari;</li>
                    <li>Quan el tractament estigui relacionat amb una tasca executada en interès públic o en l'exercici de competències oficials atorgades al Titular;</li>
                    <li>Quan el tractament sigui necessari per tal d'un interès legítim perseguit pel titular o un tercer.</li>
                </ul>
                <p>En qualsevol cas, el Titular està a la vostra disposició per definir les bases jurídiques específiques que s'apliquen al tractament i en particular, si l'obtenció de les dades personals és un requisit contractual o estatutari o un requisit necessari per formalitzar un contracte.</p>
                <h3>Més informació sobre el temps de retenció</h3>
                <p>Llevat que s'indiqui el contrari al present document, les Dades Personals seran tractades i conservades durant el temps necessari i per a la finalitat per la qual han estat recollides i podran conservar-se durant més temps a causa d'una obligació legal pertinent o sobre la base del consentiment dels Usuaris.</p>
                <p>Per tant:</p>
                <ul>
                    <li>Les dades personals recollides per a la formalització d'un contracte entre el titular i l'usuari s'han de conservar com a tals fins que aquest contracte s'hagi formalitzat completament.</li>
                    <li>Les dades personals recollides en legítim interès del titular s'han de conservar durant el temps necessari per complir aquesta finalitat. Els usuaris poden trobar informació específica relacionada amb l'interès legítim del titular consultant les seccions rellevants del present document o contactant amb el titular.</li>
                </ul>
                <p>El Titular podrà conservar les Dades Personals durant un període addicional quan l'Usuari presti el seu consentiment a aquest tractament, sempre que aquest consentiment segueixi vigent. A més, el titular pot estar obligat a conservar dades personals durant un període addicional sempre que sigui necessari per al compliment d'una obligació legal o per ordre que procedeixi de l'autoritat.</p>
                <p>Un cop acabat el període de conservació, les dades personals s'han d'eliminar. Per tant, els drets daccés, supressió, rectificació i de portabilitat de dades no podran exercir-se una vegada hagi expirat aquest període de conservació.</p>
                <h3>Els drets dels Usuaris basats en el Reglament General de Protecció de dades (RGPD)</h3>
                <p>Els usuaris podran exercir certs drets en relació amb les seves dades que siguin tractades pel titular.</p>
                <p>En particular, els Usuaris tenen dret a fer el següent, en la mesura que ho permeti la llei:</p>
                <ul>
                    <li>Retirar el seu consentiment en qualsevol moment. Els usuaris tenen dret a retirar el seu consentiment quan l'hagin atorgat amb anterioritat per al tractament de les seves dades personals.</li>
                    <li>Objecció al tractament de les vostres dades. Els usuaris tenen dret a oposar-se al tractament de les seves dades si aquest tractament es duu a terme d'acord amb una base jurídica diferent del consentiment.</li>
                    <li>Accés a les vostres dades. Els Usuaris tenen dret a saber si les Dades són tractades pel Titular, a obtenir informació sobre certs aspectes del tractament, així com a obtenir una còpia de les Dades objecte del tractament.</li>
                    <li>Verificar i sol·licitar la rectificació. Els Usuaris tenen dret a verificar l'exactitud de les seves Dades i sol·licitar que s'actualitzin o es corregeixin.</li>
                    <li>Limitar el tractament de les vostres dades. Els usuaris tenen dret a limitar el tractament de les seves dades. En aquest supòsit, el titular només tractarà les seves dades amb la finalitat d'emmagatzemar-les.</li>
                    <li>Esborrar o eliminar les Dades Personals. Els usuaris tenen dret a obtenir la supressió de les seves dades per part del titular.</li>
                    <li>Rebre les Dades i transferir-les a un altre responsable. Els Usuaris tenen dret a rebre les seves Dades en un format estructurat, d'ús comú i lectura mecànica i, si fos tècnicament possible, que es transmetin a un altre responsable sense cap impediment.</li>
                    <li>Presentar una reclamació. Els usuaris tenen dret a presentar una reclamació davant l'autoritat competent en matèria de protecció de dades personals.</li>
                </ul>
                <p>Els Usuaris també tindran dret a conèixer les bases legals de les transferències de Dades a l'estranger, inclòs qualsevol organització internacional que es regeixi pel Dret Internacional Públic o que estigui formada per dos o més països, com l'ONU, i a conèixer les mesures de seguretat preses pel titular per salvaguardar les seves dades.</p>

                <h3>Informació sobre el dret d'oposició al tractament</h3>
                <p><b>Quan el tractament de les dades personals es realitzi en interès públic, en l'exercici de poders públics conferits al titular o amb motiu d'un interès legítim perseguit pel titular, els usuaris podran oposar-se al tractament al·legant un motiu relacionat amb la seva situació particular per a justificar-ne l'oposició.</b></p>
                <p><b>Els Usuaris han de saber, però, que en cas que les seves Dades Personals siguin tractades amb fins de màrqueting directe, es poden oposar en qualsevol moment a tal tractament, de forma gratuïta i sense necessitat de justificació. Quan l'Usuari s'oposi al tractament per a fins de màrqueting directe, les Dades Personals no podran continuar sent tractades per a aquests fins. Per saber si les Dades Personals dels Usuaris estan sent tractades pel Titular per a fins de màrqueting directe, els Usuaris hauran de consultar les seccions rellevants del present document.</b></p>
                <h3>Com exercir aquests drets</h3>
                <p>Qualsevol sol·licitud d'exercici dels drets de l'usuari pot adreçar-se al propietari a través de les dades de contacte facilitades en aquest document. Aquestes sol·licituds són gratuïtes i el Titular hi respondrà tan aviat com li sigui possible i sempre dins del termini d'un mes, proporcionant als Usuaris la informació exigida per la llei. El titular comunicarà qualsevol rectificació o supressió de dades personals o limitació del tractament a cada destinatari, si s'escau, al qual se li hagin comunicat les dades personals, llevat que sigui impossible o exigeixi un esforç desproporcionat. A sol·licitud dels Usuaris, el Titular us informarà sobre aquests destinataris.</p>
                <h3>Informació addicional sobre la recollida de dades i el tractament</h3>
                <p><b>Defensa jurídica</b></p>
                <p>Les dades personals de l'usuari podran ser utilitzades per a la defensa jurídica del titular davant d'un tribunal o en les fases judicials prèvies a un possible plet derivat de l'ús inapropiat d'aquesta aplicació o dels serveis relacionats. L'Usuari declara conèixer que el Titular pot ser requerit per les autoritats públiques per tal de revelar Dades Personals.</p>
                <p><b>Informació addicional sobre les dades personals de l'usuari</b></p>
                <p>A més de les informacions contingudes en aquesta política de privadesa, aquesta Aplicació podrà proporcionar a l'Usuari informació addicional i contextual relativa a Serveis específics o la recollida i tractament de les Dades Personals.</p>
                <p><b>Log del sistema i manteniment</b></p>
                <p>Per motius relatius al funcionament i manteniment, aquesta Aplicació i qualsevol altre servei, proporcionat per tercers, que es faci servir, podrà recollir un registre del sistema; és a dir, fitxers que registren la interacció amb aquesta Aplicació i que puguin contenir Dades Personals, com ara l'adreça IP de l'Usuari.</p>
                <p><b>Informació no continguda en aquesta política de privadesa</b></p>
                <p>Es podrà sol·licitar en qualsevol moment informació addicional sobre la recollida i el tractament de les dades personals al titular. La informació de contacte s'indica al començament del present document.</p>
                <p><b>Modificació de la present política de privadesa</b></p>
                <p>El Titular es reserva el dret de modificar aquesta política de privadesa en qualsevol moment, notificant-ho als Usuaris a través d'aquesta pàgina i, si és possible, a través d'aquesta Aplicació i/o de ser tècnicament i legalment possible notificant directament als Usuaris, en cas que el Titular compti amb la informació de contacte necessària amb aquesta finalitat. Es recomana encaridament que revisin aquesta pàgina amb freqüència, prenent com a referència la data de la darrera actualització indicada al final de la pàgina.</p>
                <p>En cas que els canvis afectessin les activitats de tractament realitzades sobre la base del consentiment de l'Usuari, el Titular haurà d'obtenir, si cal, el nou consentiment de l'Usuari.</p>

                <br />
                <h2 id='cookies'>Política de Cookies</h2>
                <p>Utilitzem cookies pròpies i de tercers per millorar la teva experiència de navegació al nostre lloc web. En concret, utilitzem Google Analytics per analitzar l'ús del nostre lloc i obtenir estadístiques que ens ajuden a millorar els nostres serveis.</p>
                <p><b>Què són les cookies?</b></p>
                <p>Les cookies són petits arxius de text que es guarden al teu dispositiu quan visites un lloc web. Aquestes permeten que el lloc web reconegui el teu dispositiu i recordi informació sobre la teva visita, com les preferències de navegació.</p>
                <p><b>Tipus de cookies que utilitzem:</b></p>
                <p><b>Cookies de rendiment:</b> Recopilen informació sobre com utilitzes el lloc web, per exemple, quines pàgines visites i si experimentes errors. Aquestes dades s'utilitzen de manera agregada i anònima amb finalitats estadístiques.</p>
                <p><b>Cookies de tercers:</b> Utilitzem Google Analytics per recopilar informació de forma anònima i ajudar-nos a analitzar les visites al lloc web i millorar-ne el funcionament.</p>
                <h3>Com pots gestionar les cookies?</h3>
                <p>Pots gestionar o desactivar les cookies en qualsevol moment mitjançant la configuració del teu navegador. Tingues en compte que, si desactives les cookies, algunes funcionalitats del lloc poden no funcionar correctament.</p>
                <p>Per a més informació, consulta la nostra <a href="/informacio#privacitat">Política de Privacitat</a> sobre l'ús de cookies i la gestió de dades amb Google Analytics</p>
            </InfoContainer>

        </PageLayout>
    )
}
