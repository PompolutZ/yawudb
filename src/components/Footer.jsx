import React from "react";
import Link from "@material-ui/core/Link";
import { version } from "../../package.json";

function Footer() {
    return (
        <footer className="bg-gray-100 px-4 py-8">
            <p variant="body2" className="text-xs">
                <span className="font-bold">Ver. {version}. </span>
                The information presented on this site about Warhammer
                Underworlds, both literal and graphical, is copyrighted by Games
                Workshop. This website is not produced, endorsed, supported, or
                affiliated with Games Workshop and produced without commercial
                purpose in mind. This website is licensed under MIT license and
                its source code could be found{" "}
                <Link href="https://github.com/PompolutZ/yawudb">here</Link>.
            </p>
        </footer>
    );
}

export default Footer;
