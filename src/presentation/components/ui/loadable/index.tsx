import { Suspense, type LazyExoticComponent, type PropsWithoutRef, type ComponentType } from 'react'

import Lottie from 'react-lottie';
import animationData from '../lotties/loading.json';
import Box from '@mui/material/Box';

const Loader = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Lottie options={{
                loop: true,
                autoplay: true,
                animationData: animationData,
                rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice"
                }
            }} height={200} width={200} />
        </Box>
    );
}

const Loadable = <P extends object>(
    child: LazyExoticComponent<ComponentType<P>>
) => (props: PropsWithoutRef<P>) => {
    const Component = child;
    return (
        <Suspense fallback={<Loader />}>
            <Component {...props} />
        </Suspense>
    );
}

export { Loadable, Loader };