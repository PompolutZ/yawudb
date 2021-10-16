import React from "react";
import ReactMarkdown from "react-markdown";
import { ReactComponent as GloryIcon } from "../svgs/wu-glory.svg";

window.process = { cwd: () => "" };

function CardRule({ rule, glory }) {
    return (
        <div className="py-4 rounded-2xl bg-purple-100 border-purple-500 border-2">
            <div className="p-2">
                {rule.split("\\n").map((paragraph, i) => (
                    <ReactMarkdown key={i}>{paragraph.trim()}</ReactMarkdown>
                ))}
                {glory && (
                    <div className="flex items-center justify-center space-x-2 mt-8">
                        {new Array(glory).fill(0).map((x, i) => (
                            <GloryIcon className="bg-objective-gold rounded-full w-8 h-8 fill-current" />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CardRule;
