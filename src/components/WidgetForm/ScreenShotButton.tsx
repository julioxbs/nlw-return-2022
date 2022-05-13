import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "./Loading";

interface ScreenShotButtonProps {
    screenshot: string | null;
    onScreenshotPressed: (screenshot: string | null) => void;
}

export const ScreenShotButton = ({screenshot, onScreenshotPressed}: ScreenShotButtonProps) => {
    const [isScreenshotReady, setIsScreenshotReady] = useState(false);

    async function handleTakeScreenshot() {
        setIsScreenshotReady(true);

        const canvas = await html2canvas(document.querySelector('html')!);
        const base64image = canvas.toDataURL('image/png');

        onScreenshotPressed(base64image);
        setIsScreenshotReady(false);
    }

    if (screenshot) {
        return (
            <button
            onClick={() => onScreenshotPressed(null)}
            type="button"
            className="p-1 w-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors duration-500"
            style={{
                backgroundImage: `url(${screenshot})`,
                backgroundPosition: 'right bottom',
                backgroundSize: 180,
            }}
            >
                <Trash weight="fill" />
            </button>
        );
    }

    return (
        <div>
            <button
            onClick={handleTakeScreenshot}
                type="button"
                className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none
                focus:ring-2 focus:ring-offset-2
                focus:ring-offset-zinc-900
                focus:rind-brand-500 duration-500"
                >
                    { isScreenshotReady ? <Loading/> : <Camera className="w-6 h-6" />}
                </button>
        </div>
    );
}