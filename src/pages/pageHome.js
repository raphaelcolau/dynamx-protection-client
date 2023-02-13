import * as React from 'react';
import PageComponent from '../components/page/page';

export default function PageHome() {
    return (
        <PageComponent navigation pageNumber={0}>
            Home
        </PageComponent>
    );
}