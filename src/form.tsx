import { useState } from 'react';
import type { Tank } from './App';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';

export default function TankForm({ tankType }: { tankType: Tank }) {
    const [headCircumference, setHeadCircumference] = useState('');
    const [headThickness, setHeadThickness] = useState('');
    const [headDiameter, setHeadDiameter] = useState('');
    const [headInsideDiameter, setHeadInsideDiameter] = useState('');
    const [sheetThickness, setSheetThickness] = useState('');
    const [sheetDiameter, setSheetDiameter] = useState('');
    const [result, setResult] = useState('');

    const handleHeadCircumferenceInput = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setResult('');
        return setHeadCircumference(event.target.value);
    };

    const handleHeadThicknessInput = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setResult('');
        return setHeadThickness(event.target.value);
    };

    const handleSheetThicknessInput = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setResult('');
        return setSheetThickness(event.target.value);
    };

    const handleSlipResultClick = () => {
        if (headCircumference === '' || sheetThickness === '') return;
        const hc = Number(headCircumference);
        const st = Number(sheetThickness);
        if (isNaN(hc) || isNaN(Number(st))) {
            setResult(`Error getting result: ${hc} ${st}`);
        }
        const hd = hc / Math.PI;
        const sd = hd + st;
        const result = Math.ceil(sd * Math.PI + 1);
        setHeadDiameter(String(Math.round(hd)));
        setSheetDiameter(String(Math.round(sd)));
        setResult(String(result));
    };

    const handleButtResultClick = () => {
        if (
            headCircumference === '' ||
            sheetThickness === '' ||
            headThickness === ''
        )
            return;
        const hc = Number(headCircumference);
        const ht = Number(headThickness);
        const st = Number(sheetThickness);
        if (isNaN(hc) || isNaN(Number(st)) || isNaN(Number(ht))) {
            setResult(`Error getting result: ${hc} ${st}`);
        }
        const hd = hc / Math.PI;
        const id = hd - 2 * ht;
        const sd = id + st;
        const result = Math.ceil(sd * Math.PI + 1);
        setHeadDiameter(String(Math.round(hd)));
        setHeadInsideDiameter(String(Math.round(id)));
        setSheetDiameter(String(Math.round(sd)));
        setResult(String(result));
    };

    if (tankType === 'SLIP') {
        return (
            <section className="flex h-full w-full flex-1 justify-center">
                <form
                    className="grid place-content-evenly place-items-center p-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <p>
                        Tape around the head and enter the circumference below:
                    </p>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            className="h-12 rounded-xl bg-slate-700 pl-4 text-lg font-bold"
                            onChange={handleHeadCircumferenceInput}
                            value={headCircumference}
                            placeholder="Head Circumference"
                        />
                        <span className="flex-1 text-xl">mm</span>
                    </div>
                    <p className="text-center">
                        Enter the thickness of the{' '}
                        <strong>SHEET MATERIAL</strong>:
                    </p>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            className="h-12 rounded-xl bg-slate-700 pl-4 text-lg font-bold"
                            onChange={handleSheetThicknessInput}
                            value={sheetThickness}
                            placeholder="Sheet thickness"
                        />
                        <span className="flex-1 text-xl">mm</span>
                    </div>
                    <button
                        className="h-16 w-full rounded-xl bg-red-800 p-4 text-lg font-bold text-white"
                        onClick={handleSlipResultClick}
                    >
                        Calculate
                    </button>
                    {result !== '' && (
                        <div className="mathdisplay grid w-full text-sm transition-opacity">
                            <span
                                id="result"
                                className="h-16 text-center text-xl font-bold"
                            >
                                {`Sheet cut length = ${result}mm`}
                            </span>
                            <div className="flex">
                                <TeX
                                    math={`${headCircumference}\\div\\pi=${headDiameter}`}
                                    className="flex-1 text-right"
                                />
                                <span className="flex-1 pl-4">
                                    Head Diameter
                                </span>
                            </div>

                            <div className="flex">
                                <TeX
                                    math={`${headDiameter}+${sheetThickness}=${sheetDiameter}`}
                                    className="flex-1 text-right"
                                />
                                <span className="flex-1 pl-4">
                                    Sheet Diameter
                                </span>
                            </div>

                            <div className="flex">
                                <TeX
                                    math={`${sheetDiameter}\\times\\pi+1=${result}`}
                                    className="flex-1 text-right"
                                />
                                <span className="flex-1 pl-4">
                                    Result (1mm clearance)
                                </span>
                            </div>
                        </div>
                    )}
                </form>
            </section>
        );
    }

    return (
        <section className="flex h-full flex-col">
            <form
                className="grid flex-1 place-content-evenly place-items-center gap-4 p-4"
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <p>Tape around the head and enter the circumference below:</p>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        className="h-12 rounded-xl bg-slate-700 pl-4 text-lg font-bold"
                        onChange={handleHeadCircumferenceInput}
                        value={headCircumference}
                        placeholder="Head Circumference"
                    />
                    <span className="flex-1 text-xl">mm</span>
                </div>
                <p className="text-center">
                    Enter the thickness of the <strong>HEAD MATERIAL</strong>:
                </p>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        className="h-12 rounded-xl bg-slate-700 pl-4 text-lg font-bold"
                        onChange={handleHeadThicknessInput}
                        value={headThickness}
                        placeholder="Head material thickness"
                    />
                    <span className="flex-1 text-xl">mm</span>
                </div>
                <p className="text-center">
                    Enter the thickness of the <strong>SHEET MATERIAL</strong>:
                </p>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        className="h-12 rounded-xl bg-slate-700 pl-4 text-lg font-bold"
                        onChange={handleSheetThicknessInput}
                        value={sheetThickness}
                        placeholder="Sheet thickness"
                    />
                    <span className="flex-1 text-xl">mm</span>
                </div>
                <button
                    className="h-16 w-full rounded-xl bg-red-800 p-4 text-lg font-bold text-white"
                    onClick={handleButtResultClick}
                >
                    Calculate
                </button>
                {result !== '' && (
                    <div className="mathdisplay grid w-full text-sm transition-opacity">
                        <span
                            id="result"
                            className="h-16 text-center text-xl font-bold"
                        >
                            {`Sheet cut length = ${result}mm`}
                        </span>
                        <div className="flex">
                            <TeX
                                math={`${headCircumference}\\div\\pi=${headDiameter}`}
                                className="flex-1 text-right"
                            />
                            <span className="flex-1 pl-4">Head OD</span>
                        </div>

                        <div className="flex">
                            <TeX
                                math={`${headDiameter}-(2\\times${headThickness})=${headInsideDiameter}`}
                                className="flex-1 text-right"
                            />
                            <span className="flex-1 pl-4">Head ID</span>
                        </div>

                        <div className="flex">
                            <TeX
                                math={`${headInsideDiameter}+${sheetThickness}=${sheetDiameter}`}
                                className="flex-1 text-right"
                            />
                            <span className="flex-1 pl-4">Median</span>
                        </div>

                        <div className="flex">
                            <TeX
                                math={`${sheetDiameter}\\times\\pi+1=` + result}
                                className="flex-1 text-right"
                            />
                            <span className="flex-1 pl-4">
                                Result (1mm clearance)
                            </span>
                        </div>
                    </div>
                )}
            </form>
        </section>
    );
}
