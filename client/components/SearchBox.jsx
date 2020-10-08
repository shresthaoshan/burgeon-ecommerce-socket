import { useEffect, useState } from 'react'

import styles from '../styles/searchBox.module.css'

export default function SearchBox(props) {
    let [ searchText, searchTextUpdater ] = useState('')

    useEffect(() => {
        props.searchFor && searchTextUpdater(searchFor.toString().trim())
    }, [])

    const search = e => {
        e.preventDefault()

        window.location = `/search?q=${searchText}&ref=srch`
    }

    return <form onSubmit={search} className={styles.form}>
        <input type="text" autoComplete="on" placeholder="Search"
        value={searchText}
        onChange={e => searchTextUpdater(e.target.value)} />
    </form>
}