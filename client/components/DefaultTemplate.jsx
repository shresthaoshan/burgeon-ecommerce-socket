import { Fragment } from 'react'

import Head from './Head'

import styles from '../styles/defaultTemplate.module.css'

export default function DefaultTemplate(props) {
    return <Fragment>
        <Head title={props.title}>
            <link rel="stylesheet" href="/styles/default.css"/>
        </Head>
        <main className={styles.container}>
            {
                props.children
            }
        </main>
        <script src="https://kit.fontawesome.com/25c1aa0c81.js" crossOrigin="anonymous" />
    </Fragment>
}