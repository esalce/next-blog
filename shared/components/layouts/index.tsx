import React, {FunctionComponent, Fragment, ReactNode} from 'react';

type Props = {
    children: ReactNode;
}
const Layout: FunctionComponent<Props> = ({children}) => {

    return (
        <Fragment>
            <div className="layout">
                <main>
                    {children}
                </main>
            </div>
        </Fragment>
    );
};

export default Layout;