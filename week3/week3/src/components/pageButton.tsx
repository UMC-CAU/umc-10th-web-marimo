type PageButtonProps = {
    page: number;
    onPrev: () => void;
    onNext: () => void;
    isPrevDisabled?: boolean;
    isNextDisabled?: boolean;
};

const PageButton = ({
    page,
    onPrev,
    onNext,
    isPrevDisabled = false,
    isNextDisabled = false,
}: PageButtonProps) => {
    return (
        <section className="flex items-center justify-center gap-6 mt-8">
            <button
                onClick={onPrev}
                disabled={isPrevDisabled}
                className="w-12 h-10 flex items-center justify-center bg-gray-200 text-white font-bold rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-300"
            >
                &lt;
            </button>
            <span className="font-bold text-gray-700">{page} 페이지</span>
            <button
                onClick={onNext}
                disabled={isNextDisabled}
                className="w-12 h-10 flex items-center justify-center bg-fuchsia-300 text-white font-bold rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-fuchsia-400"
            >
                &gt;
            </button>
        </section>
    );
};

export default PageButton;