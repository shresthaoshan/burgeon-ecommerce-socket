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

            <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;1,200;1,300;1,400;1,600;1,700&display=swap&family=David+Libre:wght@400;500;700&family=Spartan:wght@100;200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="/styles/toast.css"/>
            <link rel="stylesheet" href="/styles/basic.css"/>

            {
                children
            }
        </HEAD>
    )
}