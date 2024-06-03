import TankForm from './form';
import { cn } from './util';
import { useState } from 'react';

export type Tank = 'SLIP' | 'BUTT' | null;

function App() {
    const [tankType, setTankType] = useState<Tank>(null);

    const handleTankType = (event: React.MouseEvent<HTMLElement>) => {
        let targetId = '';
        const target = event.currentTarget;
        if (target != null) {
            targetId = target.id;
        }
        if (targetId !== 'SLIP' && targetId !== 'BUTT') {
            setTankType(null);
        }
        setTankType(targetId as Tank);
    };

    const reset = () => {
        setTankType(null);
    };

    return (
        <main className="flex h-screen flex-col bg-slate-800 pb-8 font-sans text-white">
            <nav className="bg-slate-900 p-2">
                <a href="#" onClick={reset} className="flex items-center">
                    {tankType !== null && (
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M20.3284 11.0001V13.0001L7.50011 13.0001L10.7426 16.2426L9.32842 17.6568L3.67157 12L9.32842 6.34314L10.7426 7.75735L7.49988 11.0001L20.3284 11.0001Z"
                                fill="currentColor"
                            />
                        </svg>
                    )}
                    {tankType === null && (
                        <div id="pad_right" className="min-w-6"></div>
                    )}
                    <h1 className="pl-4 font-sans text-3xl font-extrabold">
                        TankCalc
                    </h1>
                </a>
            </nav>
            {tankType === null && (
                <>
                    <section
                        className={cn(
                            'flex flex-1 flex-col items-center justify-evenly gap-4 p-4',
                        )}
                    >
                        <p className="flex-1">
                            Are you rolling the sheet for a{' '}
                            <strong>SLIP</strong> or a <strong>BUTT</strong>{' '}
                            weld?
                        </p>
                        <button
                            id="SLIP"
                            onClick={handleTankType}
                            className="max-h-32 w-full flex-1 rounded-2xl bg-red-800 px-8 py-3 text-2xl font-bold text-white active:bg-red-700"
                        >
                            Slip
                        </button>
                        <button
                            id="BUTT"
                            onClick={handleTankType}
                            className="max-h-32 w-full flex-1 rounded-2xl bg-red-800 px-8 py-3 text-2xl font-bold text-white active:bg-red-700"
                        >
                            Butt
                        </button>
                    </section>
                </>
            )}
            {tankType === 'SLIP' && <TankForm tankType={'SLIP'} />}
            {tankType === 'BUTT' && <TankForm tankType={'BUTT'} />}
        </main>
    );
}

export default App;
