
"use client";

import { HumanBody } from "@/components/human-body";
import { useEffect, useState } from "react";

interface HumanBodyWrapperProps {
    onClick: (part: { slug: string; title: string; }) => void;
}

export function HumanBodyWrapper(props: HumanBodyWrapperProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div className="w-full h-full aspect-square" aria-hidden="true" />;
    }

    return <HumanBody {...props} />;
}

    

    