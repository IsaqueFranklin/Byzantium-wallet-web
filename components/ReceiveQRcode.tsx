"use client"
import { useArkade } from "@/hooks/useArkade";
import { useQRCode } from "next-qrcode";


export default function ReceiveQRcode() {
    const { address } = useArkade();
    const { Image } = useQRCode()

    return (
        <Image
            text={address}
            options={{
                type: 'image/jpeg',
                quality: 0.3,
                errorCorrectionLevel: 'M',
                margin: 6,
                scale: 4,
                width: 300,
                color: {
                    dark: '#0a0a0a',
                    light: '#fff',
                },
            }}
        />
    );
};