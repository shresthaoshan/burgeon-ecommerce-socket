import HEAD from 'next/head'

export default function Head(props) {
    const { title, children } = props
    return (
        <HEAD>
            <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=7"/>
            <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
            
            <title>{ title && `${title} - ` }Burgeon eCommerce</title>

            <link href="https://fonts.googleapis.com/css2?family=David+Libre:wght@400;500;700&family=Peddana&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="/styles/basic.css"/>

            {
                children
            }
        </HEAD>
    )
}