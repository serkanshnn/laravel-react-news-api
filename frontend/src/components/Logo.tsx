
const Logo = () => {
    return (
        <a href="/" className="flex flex-shrink-0 items-center gap-2">
            <svg className={"fill-white"} height="36" viewBox="0 0 512 512" width="36" xmlns="http://www.w3.org/2000/svg"><title/><rect height="16" rx="16" ry="16" width="16" x="96" y="112"/><path d="M468,112H416V416a32,32,0,0,0,32,32h0a32,32,0,0,0,32-32V124A12,12,0,0,0,468,112Z"/><path d="M431.15,477.75A64.11,64.11,0,0,1,384,416V44a12,12,0,0,0-12-12H44A12,12,0,0,0,32,44V424a56,56,0,0,0,56,56H430.85a1.14,1.14,0,0,0,.3-2.25ZM96,208V112h96v96ZM320,400H96V368H320Zm0-64H96V304H320Zm0-64H96V240H320Zm0-64H224V176h96Zm0-64H224V112h96Z"/></svg>
            <span className={"text-white font-semibold"}>News</span>
        </a>
    )
}

export default Logo;
