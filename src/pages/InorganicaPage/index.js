import React from 'react'
import { PageLayout } from '../../components/PageLayout'
import { Form } from '../../components/Form'

export const InorganicaPage = ({ setDarkMode }) => {
    return (
        <PageLayout setDarkMode={setDarkMode}>
            <Form />
        </PageLayout>
    )
}
